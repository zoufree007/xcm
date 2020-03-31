# Natix

米发科技原生壳交互SDK之基础功能交互。

## Install

```bash
cpm install @html5/natix
```

## Usage

支持babel的import方式调用。

```bash
npm i babel-plugin-import -D
```

在`.babelrc`文件中写入

```json
{
  plugins: [
    ["import", {
      "libraryName": "@html5/natix",
      "libraryDirectory": "package",
    }]
  ]
}
```

调用方式

```javascript
import { webview, request } from '@html5/natix';
```

## Inject

我们需要将主文件加载，所以我们可以在项目的`bo0otstrap.js`中这样写：

```javascript
import '@html5/natix/index';
export default app => {};
```

它会自动在`window`上挂载`NX`对象。即：`window.NX`。

## Check Support

检测是否支持我们的壳环境

```javascript
window.NX.support; // {boolean} 如果为true表示支持
window.NX.AliasName; // {string} 表示我们app的马甲名
```

## postMessage

该方法用于与原声端交互，主要有以下几个参数

```javascript
window.NX.postMessage({
  method, data, timeout, callback
})
```

它不会返回一个`promise`对象，而且传统的回调方式。比如

```javascript
window.NX.postMessage({
  method: 'OpenWebView',
  data: { a: 1 }
  timeout: 120000,
  callback(err, result) {
    if (err) return console.error(err);
    console.info(result);
  }
})
```

参数解析：

- **method** `string` 与原生交互的方法名
- **data** `*` 与原生交互时候传递的数据，可以为任何类型。
- **timeout** `number` 超时时间 默认 60000ms 即一分钟。
- **callback** `function` 回调函数
  - **err** `error` 错误
  - **result** `*` 返回结果

## invoke

与`window.NX.postMessage`相对应的`promise`型函数，它将返回一个`promise`对象。

```javascript
window.NX.invoke(method, data, timeout);
```

参数就不解释了，同上。eg:

```javascript
window.NX.invoke('OpenWebView', {a: 1}, 120000)
  .then(console.info)
  .catch(console.error);
```

## receiveMessage

这个方法主要是端与H5的通信，一般在前端无需使用。

```javascript
window.NX.receiveMessage({ callbackId, status, data });
```

它必须返回3个参数：

- **callbackId** `number` 之前通过`postMessage`传递过来的`callbackId`，需要原样返回。
- **status** `number` 我们约定，我们的status状态码都是从800开始，800表示成功，其他都是失败。对于特殊的HTTP请求，将返回`HTTP statuscode`
- **data** `*` 返回的数据

比如

```javascript
window.NX.receiveMessage({ 
  callbackId: 24, 
  status: 800, 
  data: {
    a: 1
  }
});
```

> 如果我们检测到调用方法不存在，那么我们需要返回`statu:804`，表示方法不存在

## Natix.error

返回一个带code的错误

```javascript
import Natix from '@html5/natix';
throw Natix.error('我是一个错误', 809);
```

# Events

natix同时支持事件流。

## event:error

全局错误捕获。

```javascript
window.NX.on('error', err => console.warn(`[Natix Error] %s`, err.message));
```

## event:send

交互`request`拦截

```javascript
window.NX.on('send', data => console.log('[Natix send] ' + new Date(), data));
```

## event:receive

交互`response`拦截

```javascript
window.NX.on('receive', data => console.log('[Natix receive] ' + new Date(), data));
```

## event:NetWorkChange

监听网络状态改变

```javascript
window.NX.on('NetWorkChange', data => console.log('[Natix status] ' + new Date(), data));
```

> 注意：`none`表示无网络

# Error code

错误码对应查询

```javascript
const ErrorCodeMap = {
  '800': '交互成功',
  '801': '不支持的平台 仅限IOS和ANDROID',
  '804': '交互方法不存在',
  '808': '交互超时',
  '950': '相机权限不允许',
}
```

我们可以通过这样的方式获取到code

```javascript
window.NX.invoke('OpenSomeThing').catch(e => {
  alert(window.NX.errorMessage(e));
  // e.status || e.code
})
```

插件也可以自行添加错误

```javascript
window.NX.addErrorMessage(923, 'xxxx错误');
```

# Future trends

当我们的浏览器支持原生的`Proxy`的时候，我们可以更加简化我们的写法：

```javascript
window.Native = new Proxy(window.NX, {
  get(target, property) {
    return (data, timeout) => {
      return target.invoke(property, data, timout);
    }
  }
})
```

我们就可以通过以下方式调用

```javascript
window.Native.OpenWebView({ a: 1 }, 120000)
  .then(console.info)
  .catch(console.error);
```

# License

[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2018-present, evio shen.