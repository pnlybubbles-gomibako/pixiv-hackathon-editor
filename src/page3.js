const Vue = require('vue');

Vue.component('page3', {
  template: require('./page3.html'),
  data() {
    return {
      title: '',
      description: '',
    };
  },
});
