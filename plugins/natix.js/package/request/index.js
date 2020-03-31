class Injector {
  constructor() {
    this.resolves = [];
    this.rejects = [];
  }

  use(resolve, reject) {
    if (resolve) this.resolves.push(resolve);
    if (reject) this.rejects.push(reject);
    return this;
  }

  async exec(name, obj) {
    const pool = this[name];
    let target = obj;
    for (let i = 0; i < pool.length; i++) {
      const stack = pool[i];
      target = await stack(target);
    }
    return target;
  }
}

export default class Ajax {
  constructor(options = {}) {
    this.options = options;
    this.interceptors = {
      request: new Injector(),
      response: new Injector()
    };
  }

  static create(options) { return new Ajax(options); }
  static get(url, headers) { return new Ajax().get(url, headers); }
  static post(url, data, headers) { return new Ajax().post(url, data, headers); }
  static put(url, data, headers) { return new Ajax().get(url, data, headers); }
  static delete(url, headers) { return new Ajax().delete(url, headers); }

  async request(options = {}) {
    if (!options.url) throw new Error('miss options.url');
    if (!/^http(s)?\:\/\//i.test(options.url)) {
      this.options.baseURL = this.options.baseURL || '';
      if (/^\//.test(options.url) && /\/$/.test(this.options.baseURL)) {
        options.url = this.options.baseURL.substring(0, this.options.baseURL.length - 1) + options.url;
      } else if (!/^\//.test(options.url) && !/\/$/.test(this.options.baseURL)) {
        options.url = this.options.baseURL + '/' + options.url;
      } else {
        options.url = this.options.baseURL + options.url;
      }
    }
    options.method = (options.method || 'GET').toUpperCase();
    if (!options.headers) options.headers = {};
    const _options = await this.interceptors.request.exec('resolves', options);
    if (_options.data && _options.data instanceof FormData) {
      _options.headers['native-content-type'] = 'native/formdata';
      const form = _options.data;
      const keys = form.keys();
      const binaryData = {};
      for (let key of keys) {
        const value = form.get(key);
        if (value instanceof Blob) {
          const base64 = await blobToDataURL(value);
          binaryData[key] = {
            type: 'base64',
            value: base64,
            key
          }
        } else if (typeof value === 'string') {
          binaryData[key] = {
            type: 'string',
            value: value,
            key
          }
        }
      }
      _options.data = binaryData;
    }
    return window.NX.invoke('Request', _options || options, _options.timeout || this.options.timeout)
      .then(response => {
        const result = {};
        result.data = response;
        result.status = 200;
        result.statusText = 'ok';
        result.config = _options;
        return this.interceptors.response.exec('resolves', result);
      })
      .catch(e => {
        e.response = {};
        e.response.data = e.message;
        e.config = _options;
        return this.interceptors.response.exec('rejects', e);
      });
  }

  get(url, configs = {}) {
    configs.url = url;
    configs.method = 'GET';
    return this.request(configs);
  }

  post(url, body = {}, configs = {}) {
    configs.url = url;
    configs.data = body;
    configs.method = 'POST';
    return this.request(configs);
  }

  put(url, body = {}, configs = {}) {
    configs.url = url;
    configs.data = body;
    configs.method = 'PUT';
    return this.request(configs);
  }

  delete(url, configs = {}) {
    configs.url = url;
    configs.method = 'DELETE';
    return this.request(configs);
  }
}

function blobToDataURL(blob) {
  return new Promise(resolve => {
    const fileReader = new FileReader();
    fileReader.onload = e => resolve(e.target.result);
    fileReader.readAsDataURL(blob);
  });
}