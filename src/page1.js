const Vue = require('vue');

Vue.component('page1', {
  template: require('./page1.html'),
  data() {
    return {
      selected: 0,
      templates: [
        {
          id: 'cool',
          label: 'Cool',
          image: 'static/tmp-assets/cool-thumbnail.png',
          options: [
            {
              id: 'moji',
              label: 'Moji',
              type: 'color',
              value: null,
            },
          ],
        }, {
          id: 'cute',
          label: 'Cute',
          image: 'static/tmp-assets/cute-thumbnail.png',
          options: [
            {
              id: 'moji',
              label: 'Moji2',
              type: 'string',
              value: null,
            },
          ],
        },
      ],
    };
  },
});
