import axios from 'axios';
import { default as UserStatus, getUserInfo } from './app/middleware/status';
import channel from './app/middleware/channel';
import { Toast } from 'vant';
import Vue from 'vue';
const SPARK_DEPLOY_CONFIGS = process.env.SPARK_DEPLOY_CONFIGS || {};

Vue.use(Toast);
export default async (app, plugin) => {
  const pluginConfig = plugin.$config;
  const store = app.$store;
  const options = {};

  // 用户状态检测中间件
  app.use(UserStatus);
  app.use(channel);
  // 默认语言包设置
  app.on('ServerWillCreate', async () => {
    const lang = SPARK_DEPLOY_CONFIGS.lang || 'Chinese';
    store.i18n.commit('lang', lang);
    if (window.NX.support) {
      await window.NX.invoke('changeLanguage',{ languageType: lang });
    }
  });

  // 端上唤起重载虚拟请求
  app.on('AppWakeUp', async () => await app.reload());

  // 设置token
  app.on('ServerWillCreate', async () => {
    const token = await app.$storage.user.get('knock_knock');
    if (token) {
      store.Meta.commit('knock_knock', token);
    }
  });

  // 封装请求模式
  if (window.location.protocol.indexOf('file') === 0) options.baseURL = SPARK_DEPLOY_CONFIGS.prefix || pluginConfig.prefix;
  let ajax = axios.create(options);
  ajax.interceptors.request.use(config => {
    const token = store.Meta.get('knock_knock');
    if (token) {
      config.headers.knock_knock = token;
    }
    return config;
  });
  ajax.interceptors.response.use(ajaxSuccess(app), ajaxFailed(app));
  app.$ajax = app.context.$ajax = ajax;

  // 设置token方法
  app.SetToken = token => app.$storage.user.set('knock_knock', token);

  app.on('ServerWillCreate', async () => {
    if (window.NX.support) {
      const device = await window.NX.invoke('GetDeviceInfo');
      store.Meta.commit('device', device);
    }
  });
}

function ajaxSuccess(app) {
  return response => {
    if (response.data.code === 1000) return response.data;
    if (response.data.code === 1005) return response.data;
    if (response.data.code === 1001 || response.data.code === 1002 || response.data.code === 1003 || response.data.code === 1004) {
      Toast(response.data.msg);
      return Promise.reject(emittedError(response.data.msg));
    }
    return Promise.reject(new Error('unknow error'));
  }
}

function ajaxFailed(app) {
  return error => {
    if (error.emitted) return Promise.reject(error);
    Toast(app.lang('service_error_40003'));
    return Promise.reject(error);
  }
}

function emittedError(str) {
  const err = new Error(str);
  err.emitted = true;
  return err;
}