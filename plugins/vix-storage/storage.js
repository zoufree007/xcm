import store from '../natix.js/package/storage/index';
export default class Storage {
  constructor(namespace, type) {
    this.namespace = namespace;
    this.support = window.NX.support;
    this.type = type;
    this.store = new store(namespace);
  }

  get target() {
    switch (this.type) {
      case 'local': return window.localStorage;
      case 'session': return window.sessionStorage;
      default: return window.localStorage;
    }
  }

  _key(key) {
    return this.namespace + '_' + key;
  }

  set(key, value) {
    if (this.support) return this.store.set(key, value);
    this.target.setItem(this._key(key), value);
    return Promise.resolve(value);
  }

  get(key) {
    if (this.support) return this.store.get(key);
    return Promise.resolve(this.target.getItem(this._key(key)));
  }

  delete(key) {
    if (this.support) return this.store.delete(key);
    const _key = this._key(key);
    if (this.target.getItem(_key)) {
      this.target.removeItem(_key);
      return Promise.resolve(1);
    }
    return Promise.reject(0);
  }

  has(key) {
    if (this.support) return this.store.has(key);
    return Promise.resolve(Number(!!this.target.getItem(this._key(key))));
  }

  scan(key) {
    if (this.support) return this.store.scan(key);
    let i = this.target.length, result = {};
    while (i--) {
      const _key = this.target.key(i);
      if (_key.indexOf(this.namespace) === 0) {
        const remind = _key.substr(this.namespace.length + 1);
        if (remind.indexOf(key) > -1) {
          result[_key] = this.target.getItem(_key);
        }
      }
    }
    return Promise.resolve(result);
  }
}
