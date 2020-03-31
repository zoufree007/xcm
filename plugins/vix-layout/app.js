import 'vant/es/style/base.less';
import './style.less';
import 'amfe-flexible';
import Vue from 'vue';
import Flex from '../flex/index';
import '../natix.js/index';
import { Actionsheet } from 'vant';
import Header from './app/header';
import Footer from './app/footer';
import WebView from './app/webview';
Vue.use(Actionsheet);
Vue.use(Flex);
export default async app => {
  let currentContext;
  const store = app.$store;
  const header = new Header(store);
  const footer = new Footer(store);
  const webview = new WebView(store);
  app.on('ServerWillCreate', () => header.init());
  app.$header = app.context.$header = header;
  app.$footer = app.context.$footer = footer;
  app.$webview = app.context.$webview = webview;
  app.on('start', ctx => {
    if (!ctx.isapi) {
      currentContext = ctx;
      header.reset(); // header 头部初始化
      webview.reset(); // webview 初始化
    }
    
  });
  app.on('stop', ctx => {
    if (!ctx.isapi) {
      header.post(); // hybrid 交互 header
      webview.post(); // hybrid 交互 webview
    }
  });

  window.NX.on('AppWakeUp', () => {
    if (currentContext) {
      app.emit('AppWakeUp').then(() => currentContext.emit('AppWakeUp'));
    } else {
      app.emit('AppWakeUp');
    }
  });
}