const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static('public'));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/museum', {
  useNewUrlParser: true
});

const multer = require('multer')
const upload = multer({
  dest: './public/images/',
  limits: {
    fileSize: 10000000
  }
});

// Create a scheme for items in the museum: a title and a path to an image.
const itemSchema = new mongoose.Schema({
  title: String,
  description: String,
  owner: String,
  phone: String,
  price: String,
  path: String,
});

// Create a model for items in the museum.
const Item = mongoose.model('Item', itemSchema);

// Upload a photo. Uses the multer middleware for the upload and then returns
// the path where the photo is stored in the file system.
app.post('/api/photos', upload.single('photo'), async (req, res) => {
  // Just a safety check
  if (!req.file) {
    return res.sendStatus(400);
  }
  res.send({
    path: "/images/" + req.file.filename
  });
});

app.post('/api/items', async (req, res) => {
  const item = new Item({
    title: req.body.title,
    path: req.body.path,
    description: req.body.description,
    owner: req.body.owner,
    price: req.body.price,
    phone: req.body.phone,
  });
  try {
    await item.save();
    res.send(item);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/items', async (req, res) => {
  try {
    let items = await Item.find();
    res.send(items);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/items/:id', async (req, res) => {
  try {
     await Item.deleteOne({
       _id: req.params.id
     });
     res.sendStatus(200);
   } catch (error) {
     console.log(error);
     res.sendStatus(500);
   }
});

app.put('/api/items/:id', async (req, res) => {
     let item = await Item.findOne({
       _id: req.params.id,
     });
     item.title = req.body.title;
     item.description = req.body.description;
     item.phone = req.body.phone;
     item.price = req.body.price;
     item.owner = req.body.owner;
  try {
      item.save();
     res.send(item);
   } catch (error) {
     console.log(error);
     res.sendStatus(500);
   }
});

app.listen(3000, () => console.log('Server listening on port 3000!'));