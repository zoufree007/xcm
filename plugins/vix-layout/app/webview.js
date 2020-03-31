export default class CustomWebView {
  constructor(store) {
    this.store = store;
    this.support = window.NX.support;
  }

  async open(url) {
    if (this.support) return await window.NX.invoke('OpenWebView', {
      url
    });
    window.open(url);
  }

  async close() {
    if (this.support) return await window.NX.invoke('CloseWebView');
    window.close();
  }

  set backgroundColor(value) {
    this.setBackgroundColor(value);
  }

  async setBackgroundColor(rgba) {
    if (!/^rgba\([^,]+,[^,]+,[^,]+,[^\)]+\)$/.test(rgba)) throw new Error(`'${rgba}' is not a rgba value.`);
    this.store.Vix.commit('backgroundColor', rgba);
    if (this.support) return await window.NX.invoke('SetWebViewBackground', {
      color: rgba
    });
  }

  pressAndroidBackKey(fn) {
    if (typeof fn !== 'function') return;
    window.NX.on('PressAndroidBackKey', fn);
  }

  async reset() {
    if (this.support) {
      window.NX.removeAllListeners('PressAndroidBackKey');
    }
    this.store.Vix.commit('backgroundColor', 'rgba(255,255,255,1)');
  }

  async post() {
    await this.setBackgroundColor(this.store.Vix.get('backgroundColor'));
  }
}