import '../natix.js/index';
import Storage from './storage';
import Vue from 'vue';
export default (app, plugin) => {
  let configs = plugin.$config || {};
  const store = {};
  for (const namespace in configs) {
    store[namespace] = new Storage(namespace, configs[namespace]);
  }
  Vue.prototype.$storage = app.$storage = app.context.$storage = store;
}