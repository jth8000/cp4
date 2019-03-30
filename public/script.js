let app = new Vue({
  el: '#donate',
  data: {
    donateName: '',
    donateAmount: '',
    donated1: false,
progress: 0,

},
  /*watch: {
  }, */

  methods: {
    async donated() {
      try {
          this.donateName = this.donateName,
          this.donateAmount = this.donateAmount,
        //makeProgress();
        this.progress = parseInt(this.donateAmount) + parseInt(this.progress);
        this.donated1 = true;
      } catch (error) {
        console.log(error);
      }
    },

  /*  makeProgress() {
        this.progress += 5;
    },*/
  }

});
