import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import '@/store/profile/profile';
import '@/plugins/composition-api';
import vuetify from '@/plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import '@/plugins/vee-validate';
import '@/plugins/axios';

// これはひとつずつ
// import { myExample } from '@/directives/my-example';
// Vue.directive('myExample', myExample);

// グローバルディレクティブ
import * as directives from '@/directives';
for (const [key, directive] of Object.entries(directives)) {
  Vue.directive(key, directive);
}

// グローバルコンポーネント
import * as components from '@/components';
for (const [key, component] of Object.entries(components)) {
  Vue.component(key, component);
}

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app');
