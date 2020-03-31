export default class Storage {
  constructor(namespace) {
    this.namespace = namespace;
  }

  _key(key) {
    return this.namespace + '_' + key;
  }

  set(key, value) {
    return window.NX.invoke('SetStorageByKeyValue', {
      key: this._key(key), value
    });
  }

  get(key) {
    return window.NX.invoke('GetStorageByKey', {
      key: this._key(key)
    });
  }

  delete(key) {
    return window.NX.invoke('DeleteStorageByKey', {
      key: this._key(key)
    });
  }

  has(key) {
    return window.NX.invoke('HasStorageByKey', {
      key: this._key(key)
    });
  }

  scan(key) {
    return window.NX.invoke('ScanStorageByKeyWord', {
      keyword: key, namespace: this.namespace
    });
  }
}