import Vue from 'vue';
import {
  configure,
  localize,
  extend,
  ValidationObserver,
  ValidationProvider,
} from 'vee-validate';
import ja from 'vee-validate/dist/locale/ja';
import { required, max, ext, size } from 'vee-validate/dist/rules';
import { customRules } from '@/validation/custom-rules';

// 設定
const config = {
  bails: false,
  mode: 'eager',
};
configure(config);
extend('required', required);
extend('max', max);
// カスタムバリデーション
for (const key in customRules) {
  extend(key, customRules[key]);
}

extend('ext', ext);
extend('size', size);

// 日本語ローカライズ
localize('ja', ja);

// バリデーションコンポーネントをグローバルコンポーネントとして登録
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);
