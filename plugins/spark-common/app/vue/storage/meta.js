import { ChildVuex } from 'super-vuex';
const child = new ChildVuex('Meta');
export default child;

const state = {
  // brand: null, // 机型
  knock_knock: null, // token
  // systemVersion: null, // 系统版本,
  // uniqueId: null, // 唯一标识
  // macAddress: null, // mac 地址
  // appName: null, // 应用名称
  // bundleId: null,
  // version: null, // 版本号
  // buildNumber: null, // 构建号
  // longitude: null, // 经度
  // latitude: null, // 维度
  info: null,
  device: null,
  channel:null,
  device_id:null,
  defaultOptions:{
    preprocessor: null,
    audio: {
      timeout: 1000,
 // 在iOS 11上，音频上下文只能用于响应用户交互。我们要求用户在iOS 11上显式启用音频指纹https://stackoverflow.com/questions/46363048/onaudioprocess-not-called-on-ios11#46534088
      excludeIOS11: true
    },
    fonts: {
      swfContainerId: 'fingerprintjs2',
      swfPath: 'flash/compiled/FontList.swf',
      userDefinedFonts: [],
      extendedJsFonts: false
    },
    screen: {
       // 当用户旋转移动设备时确保指纹一致
      detectScreenOrientation: true
    },
    plugins: {
      sortPluginsFor: [/palemoon/i],
      excludeIE: false
    },
    extraComponents: [],
    excludes: {},
    NOT_AVAILABLE: 'not available',
    ERROR: 'error',
    EXCLUDED: 'excluded'
  }
}

child.setState(state);
