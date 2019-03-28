var app = new Vue({
  el: '#app',
  data: {
    items: [],
  },

  created() {
  this.getItems();
  },
  selectItem(item) {
    this.findTitle = "";
    this.findItem = item;
  },
  methods: {
    async getItems() {
      try {
        let response = await axios.get("/api/items");
        this.items = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteItem(item) {
      try {
        let response = axios.delete("/api/items/" + item.id);
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async editItem(item) {
          try {
            let response = await axios.put("/api/items/" + item.id, {
              title: this.findItem.title,
            });
            this.findItem = null;
            this.getItems();
            return true;
          } catch (error) {
            console.log(error);
          }
        },
  },

});
