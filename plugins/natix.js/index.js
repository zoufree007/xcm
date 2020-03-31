import { EventEmitter } from 'events';
const ua = window.navigator.userAgent.toLowerCase();
class Natix extends EventEmitter {
  constructor() {
    super();
    this.env = Natix.env();
    this._callbackId = 0;
    this._callbacks = {};
    this._callbackTimers = {};
    this._time = Date.now();

    const exec = /_natix_(.+)$/.exec(window.navigator.userAgent);
    this.support = !!exec;
    if (exec) {
      this.AliasName = exec[1];
    }
  }

  static env() {
    if (/iphone|ipad|ipod/.test(ua)) {
      return 'IOS';
    } else if (/android/.test(ua)) {
      return 'ANDROID';
    }
  }

  static error(err, code) {
    const error = new Error(err);
    error.status = error.code = code || 900;
    return error;
  }

  receiveMessage({ callbackId, status, data }) {
    const callback = this._callbacks[callbackId];
    this.emit('receive', { callbackId, status, data });
    if (typeof callback == 'function') {
      delete this._callbackTimers[callbackId];
      delete this._callbacks[callbackId];
      clearTimeout(this._callbackTimers[callbackId]);
      let error;
      switch (status) {
        case 804: error = Natix.error('non-exists method in natix script: ' + data, 804); break;
        case 800: break;
        default: error = Natix.error(data, status);
      } 
      if (error) {
        this.emit('error', error);
        return callback(error);
      };
      return callback(null, data);
    }
  }

  /**
   * post message to native
   * @param {*} options 参数
   * @param   - method 方法名
   * @param   - timeout 超时
   * @param   - callback 回调
   * @param   - data 数据
   */
  postMessage(options = {}) {
    if (!window.NX.support) {
      throw Natix.error(`Not support natix env on this platform.`, 999);
    }
    const timeout = options.timeout || 2000;
    const id = this._time + '_' + (this._callbackId++);
    this._callbacks[id] = options.callback;
    this._callbackTimers[id] = setTimeout(() => {
      const callback = this._callbacks[id];
      if (callback) {
        delete this._callbackTimers[id];
        delete this._callbacks[id];
        callback(Natix.error(`主人，稍稍休息会！`, 808));
      }
    }, timeout);

    const data = {
      callbackId: id,
      method: options.method,
      data: options.data
    }
    this.emit('send', data);
    switch (this.env) {
      case 'IOS': window.webkit.messageHandlers.native.postMessage(data); break;
      case 'ANDROID': window.native.postMessage(JSON.stringify(data)); break;
      default: this.emit('error', Natix.error('UnSupported platform', 801));
    }
  }
}

export default window.NX = new Natix();

window.NX.invoke = function(name, data, timeout) {
  return new Promise((resolve, reject) => {
    window.NX.postMessage({
      data,
      timeout: timeout || 60000,
      method: name,
      callback(err, response) {
        if (err) return reject(err);
        resolve(response);
      }
    })
  })
}

const ErrorCodeMap = {
  '800': '交互成功',
  '801': '不支持的平台 仅限IOS和ANDROID',
  '804': '交互方法不存在',
  '808': '交互超时',
  '950': '相机权限不允许',
}

window.NX.errorMessage = function(error) {
  let msg;
  if (error instanceof Error || Object.prototype.toString.call(error) === '[object Error]') {
    if (error.status && ErrorCodeMap[error.status]) {
      msg = ErrorCodeMap[error.status];
    } else {
      msg = error.message;
    }
  } else if (!isNaN(error)) {
    msg = ErrorCodeMap[error];
  }
  return msg || '未知错误';
}

window.NX.addErrorMessage = function(code, msg) {
  ErrorCodeMap[code] = msg;
}