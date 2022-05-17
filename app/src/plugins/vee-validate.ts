import Vue from 'vue';
import {
  configure,
  localize,
  ValidationObserver,
  ValidationProvider,
} from 'vee-validate';

import ja from 'vee-validate/dist/locale/ja';

// 設定
const config = {
    bails: false,
    mode: 'aggressive',
};
configure(config);

// 日本語ローカライズ
localize('ja', ja);

// バリデーションコンポーネントをグローバルコンポーネントとして登録
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);