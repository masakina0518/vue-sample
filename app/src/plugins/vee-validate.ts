import Vue from 'vue';
import {
  configure,
  localize,
  extend,
  ValidationObserver,
  ValidationProvider,
} from 'vee-validate';
import ja from 'vee-validate/dist/locale/ja';
import { required, max } from 'vee-validate/dist/rules';

// 設定
const config = {
    bails: false,
    mode: 'aggressive',
};
configure(config);
extend('required', required);
extend('max', max);


// 日本語ローカライズ
localize('ja', ja);

// バリデーションコンポーネントをグローバルコンポーネントとして登録
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);