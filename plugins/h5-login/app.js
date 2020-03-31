import Vue from 'vue';
import './style.less';
import { Switch, Toast, Dialog, Cell, CellGroup, Button, Picker, Popup, Loading, Field, Slider, Actionsheet } from 'vant';
Vue.use(Switch).use(Toast).use(Dialog).use(Cell).use(CellGroup).use(Button).use(Picker).use(Popup).use(Loading).use(Field).use(Slider).use(Actionsheet);

export default async (app) => {
  app.on('error',(e)=>{
    console.log(e);
  })
  app.on('ServerWillCreate', () => {
    // const store = app.$store;
    // const name = 'appName';
    // app.$saveAppname = data => window.localStorage.setItem(name, JSON.stringify(data));
    // //保存推广页手机号、姓名
    // app.$saveBaseInfo = data => window.localStorage.setItem('generalizeBaseInfo', JSON.stringify(data));
    // app.$deleteBaseInfo = data => window.localStorage.removeItem('generalizeBaseInfo');
    // app.$getBaseInfo = () => {
    //   const data = window.localStorage.getItem('generalizeBaseInfo');
    //   if(data) {
    //     return JSON.parse(data);
    //   }
    //   return {};
    // }
    // const storeData = app.$getBaseInfo();
    // for( const i in  storeData) {
    //   store.login.commit(i, storeData[i]);
    // }
  });
  //保存推广页选择配置项
  // app.$saveBaseConf = data => window.localStorage.setItem('baseConf', JSON.stringify(data));
  // app.$deleteBaseConf = data => window.localStorage.removeItem('baseConf');
  // app.$getBaseConf = () => {
  //   const data = window.localStorage.getItem('baseConf');
  //   if(data) {
  //     return JSON.parse(data);
  //   }
  //   return {};
  // }
  // //保存新客
  // app.$saveNewCustom = data => window.localStorage.setItem('NewCustom', JSON.stringify(data));
  // app.$deleteNewCustom = data => window.localStorage.removeItem('NewCustom');
  // app.$getNewCustom = () => {
  //   const data = window.localStorage.getItem('NewCustom');
  //   if(data) {
  //     return JSON.parse(data);
  //   }
  //   return {};
  // }
}