import Vue from 'vue';
export default async app => {
  app.on('ServerWillCreate', () => {
    const i18n = app.$store.store.state.i18n;
    app.lang = app.context.lang = Vue.prototype.$lang = key => {
      if (!i18n.lang) throw new Error('please set language first');
      return i18n.language[key] ? i18n.language[key][i18n.lang] : null;
    }
    Vue.filter('lang', app.lang);
  })
}