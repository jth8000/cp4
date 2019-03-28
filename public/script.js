let app = new Vue({
  el: '#donate',
  data: {
    donateName: '',
    donateAmount: '',
    donated: false,
    items: [],
    addItem: null,
progress: 0,

},
  /*watch: {
  }, */

  methods: {
    async upload() {
      try {
        let r2 = await axios.post('/api/items', {
          donateName: this.donateName,
          donateAmount: this.donateAmount,
        });
        //makeProgress();
        this.progress = parseInt(this.donateAmount) + parseInt(this.progress);
        this.donated = true;
        this.addItem = r2.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getItems() {
  try {
    let response = await axios.get("/api/items");
    this.items = response.data;
    return true;
  } catch (error) {
    console.log(error);
  }
},

  /*  makeProgress() {
        this.progress += 5;
    },*/
  }

});
