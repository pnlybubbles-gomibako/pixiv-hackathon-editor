const Vue = require('vue');

Vue.component('page2', {
  template: require('./page2.html'),
  data() {
    return {
      selected: [],
      works: {},
    };
  },
  methods: {
    selectImage(id) {
      const index = this.selected.indexOf(id);
      if (~index) {
        this.selected.splice(index, 1);
      } else {
        this.selected.push(id);
      }
    },
  },
});
