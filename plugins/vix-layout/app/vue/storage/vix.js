import { ChildVuex } from 'super-vuex';
const child = new ChildVuex('Vix');
export default child;

child.setState({
  header: {
    show: false,
    theme: 'light', // theme: `light` or `dark`
    title: null,
    backgroundColor: 'rgba(255,255,255,1)',
    closeable: true,
    backable: true,
    backCallback: null,
    toolStatus: false,
    actions: [], // https://youzan.github.io/vant/#/zh-CN/actionsheet
    leftTextBool:false,
    rightTextBool:false,
    leftText:null,
    rightText:null
  },
  footer: {
    show: false,
    fields: []
  },
  backgroundColor: 'rgba(255,255,255,1)'
});

child.setGetter('header:text-color', state => {
  if ('dark' === state.header.theme) return 'rgba(255,255,255,1)';
  return 'rgba(0,0,0,1)';
});

child.setGetter('header:border-color', state => {
  if ('dark' === state.header.theme) return 'rgba(255,255,255,0.1)';
  return 'rgba(0,0,0,0.1)';
});

child.setGetter('header:sheetable', state => !!state.header.actions.length);