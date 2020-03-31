import Vue from 'vue';
import { Toast } from 'vant';
Vue.use(Toast);
export default (app) => {
  app.on('error', e => {
    if (e.message !== 'Url redirected' && e.status !== 404) {
      Toast(e.message);
    }
  });
}