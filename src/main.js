const Vue = require('vue');

new Vue({
  el: '#main',
  data: {
    idd: null,
    step: 0,
    buttons: {
      left: {
        label: 'BACK',
      },
      right: {
        label: 'NEXT',
      },
    },
  },
  ready() {
    Promise.all([
      new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://mmapi.grimoire.gl/api/editInfo');
        xhr.addEventListener('load', () => {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.responseText));
          } else {
            reject(xhr.statusText);
          }
        });
        xhr.addEventListener('timeout', reject);
        xhr.send();
        // resolve(require('./mock.json'))
      })
    ,
      new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://mmapi.grimoire.gl/api/museum');
        xhr.addEventListener('load', () => {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.responseText));
          } else {
            reject(xhr.statusText);
          }
        });
        xhr.addEventListener('timeout', reject);
        xhr.send();
      })
    ]).then((res) => {
      console.log(res);
      this.$refs.page1.templates = res[0].templateConfig.templates;
      this.$refs.page2.works = res[0].works;
      this.id = res[1].id;
      this.$els.iframe.src = `https://mmapi.grimoire.gl/api/museum/${res[1].id}`;
      // this.$els.iframe.contentDocument.location.replace(`https://mmapi.grimoire.gl/api/museum/${res[1].id}`);
    }).catch((e) => {
      console.error(e);
    });
  },
  methods: {
    clickLeft() {
      if (this.step !== 0) {
        this.step -= 1;
      }
    },
    clickRight() {
      if (this.step !== 2) {
        this.step += 1;
      } else {
        this.finalize();
      }
    },
    finalize() {
      const targetTemplate = this.$refs.page1.templates[this.$refs.page1.selected];
      const json = {
        template: targetTemplate.id,
        options: targetTemplate.options.reduce((obj, v) => { obj[v.id] = v.value; return obj; }, {}),
        illustrations: this.$refs.page2.selected,
        title: this.$refs.page3.title,
        description: this.$refs.page3.description,
      };
      console.log(json);
      new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', `https://mmapi.grimoire.gl/api/museum/${this.id}`);
        xhr.addEventListener('load', () => {
          if (xhr.status === 200) {
            resolve(xhr.responseText);
          } else {
            reject(xhr.statusText);
          }
        });
        xhr.addEventListener('timeout', reject);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(EncodeHTMLForm({
          template: json.template,
          params: JSON.stringify(json),
        }));
      }).then((res) => {
        this.$els.iframe.src = this.$els.iframe.src;
      });
    },
  }
});

function EncodeHTMLForm(data) {
  const params = [];
  for(let name in data) {
    let value = data[ name ];
    let param = encodeURIComponent(name) + '=' + encodeURIComponent(value);
    params.push(param);
  }
  return params.join('&').replace(/%20/g, '+');
}
