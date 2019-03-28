let app = new Vue({
  el: '#app',
  data: {
    listings: [{
      addedName: '',
      addedPrice: '',
      addedListing: '',
      addedAnimal: '',
      addedNumber: '',
      addedGender: '',
      addedNewsletter: '',
    }],
progress: 0,

},
  /*watch: {
  }, */

  methods: {
    addListing() {
       Vue.set(app.listings,new Array);
      this.listings.push({
      //  date: moment().format('MMMM Do YYYY, h:mm:ss a'),
        name: "Name: " + this.addedName,
        phone: "Phone Number: " + this.addedNumber,

      });
      this.addedNumber = '';
    },

    makeProgress() {
      if(this.progress < 100) {
        this.progress += 5;
      }
    },
  }

});
