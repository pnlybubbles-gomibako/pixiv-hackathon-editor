const Vue = require('vue');

Vue.component('select-img', {
  template: require('./select-img.html'),
  props: ['items', 'selected'],
  methods: {
    select(index) {
      this.selected = index;
    },
  },
});
