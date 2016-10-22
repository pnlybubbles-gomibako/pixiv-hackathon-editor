const Vue = require('vue');
const ColorPicker = require('simple-color-picker');

Vue.component('option-item', {
  template: require('./option-item.html'),
  props: ['type', 'value'],
  data() {
    return {
      cp: null,
    }
  },
  ready() {
    this.$watch('type', () => {
      if (this.type === 'color') {
        this.cp = new ColorPicker({
          color: '#FF0000',
          el: this.$els.cp,
          width: 200,
          height: 200,
        });
        this.cp.onChange(() => {
          this.value = this.cp.getHexString();
        });
      } else {
        if (this.cp) {
          this.cp.remove();
          this.co = null;
        }
      }
    }, {
      immediate: true,
    });
  },
});
