export default class Customheader {
  constructor(store) {
    this.store = store;
    this.support = window.NX.support;
    this._events = {};
  }

  init() {
    if (!this.support) {
      this.store.Vix.commit('header.show', true);
      this.store.Vix.commit('header.closeable', false);
    } else {
      this.store.Vix.commit('header.show', false);
      this.store.Vix.commit('header.rightTextBool', false);
      window.NX.on('WebViewExtraFields', () => this.store.Vix.commit('header.toolStatus', true));
    }
  }

  async reset() {
    this.goBack();
    if (this.support) {
      window.NX.removeAllListeners('WebViewHistoryGoBack');
      window.NX.removeAllListeners('WebViewClose');
    }
    this.store.Vix.commit('header.title', null);
    this.store.Vix.commit('header.backgroundColor', 'rgba(255,255,255,1)');
    this.store.Vix.commit('header.theme', 'light');
    this.store.Vix.commit('header.actions', []);
    this.store.Vix.commit('footer.show', false);
    this.store.Vix.commit('header.rightTextBool', false);
  }

  async post() {
    const options = {
      title: this.store.Vix.get('header.title'),
      theme: this.store.Vix.get('header.theme'),
      backable: this.store.Vix.get('header.backable') ? 'YES' : 'NO',
      sheetable: this.store.Vix.get('header:sheetable') ? 'YES' : 'NO',
      backgroundColor: this.store.Vix.get('header.backgroundColor')
    };
    if (this.support) {
      await window.NX.invoke('SetWebViewHeader', options);
    } else if (process.env.NODE_ENV !== 'production'){
      console.log('Native Script [SetWebViewHeader]:', options);
    }
  }

  set title(value) {
    this.setTitle(value);
  }

  setTitle(value) {
    this.store.Vix.commit('header.title', value || null);
  }

  set backgroundColor(value) {
    this.setBackgroundColor(value);
  }

  setBackgroundColor(rgba) {
    if (!/^rgba\([^,]+,[^,]+,[^,]+,[^\)]+\)$/.test(rgba)) throw new Error(`'${rgba}' is not a rgba value.`);
    this.store.Vix.commit('header.backgroundColor', rgba);
  }

  set theme(value) {
    this.setTheme(value);
  }

  setTheme(theme) {
    if (['light', 'dark'].indexOf(theme) === -1) throw new Error(`theme must be one of ['light', 'dark'].`);
    this.store.Vix.commit('header.theme', theme);
  }

  setAction(value = []) {
    if (!Array.isArray(value) || value.length === 0) throw new Error('ActionSheets must be an array.');
    this.store.Vix.commit('header.actions', value);
  }

  goBack(fn = true) {
    this.store.Vix.commit('header.backable', !!fn);
    if (this.support) {
      if (typeof fn === 'function') {
        window.NX.on('WebViewHistoryGoBack', fn);
      }
    } else {
      this.store.Vix.commit('header.backCallback', typeof fn === 'function' ? fn : () => window.history.go(-1));
    }
  }

  on(event, fn) {
    if (!this._events[event]) {
      this._events[event] = [];
    }
    this._events[event].push(fn);
    return this;
  }

  async emit(event, ...args) {
    const events = this._events[event];
    if (!events) return this;
    for (let i = 0; i < events.length; i++) {
      await events[i](...args);
    }
    return this;
  }

  getComputedEventListenerCount(event) {
    return this._events[event] ? this._events[event].length : 0;
  }

  removeEventListener(event) {
    if (event) {
      if (this._events[event]) {
        delete this._events[event];
      }
    } else {
      this._events = {};
    }
  }
}