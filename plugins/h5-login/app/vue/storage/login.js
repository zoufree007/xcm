import { ChildVuex } from 'super-vuex';
export default app => {
  const child = new ChildVuex('login');
  child.setState({
    role:null,
    appName:null,
    baseInfo:null,
    saveAction:false,
  });
  return child;
}
