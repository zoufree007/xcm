# Request

Natix基础库之 `Request` 请求代理。

## Usage

```javascript
import { Request } from '@html5/natix';
Request.get(url, headers);
Request.post(url, data, headers);
Request.put(url, data, headers);
Request.delete(url, headers);
```

## Create instance

```javascript
const request = Request.create({
  baseURL: 'http://npm.mzftech.cn',
  timeout: 2000
})
```

- **baseURL** `string` 可以设定基址。
- **timeout** `number` 超时时间

### request.request(options)

创建一个通用的请求。

```javascript
request.request({
  url: '/',
  method: 'PUT',
  body: {},
  timeout: 1000,
  headers: {}
})
```

- **url** `string` 请求路径
- **method** `string` 请求方法 必须大写
- **body** `json` 请求数据 仅 `POST` `PUT` 有效
- **timeout** `number` 超时时间
- **headers** `json` 头部信息

它返回一个`promise`对象。它也具有其他的封装方法：

- `request.get(url, headers)`
- `request.post(url, data, headers)`
- `request.put(url, data, headers)`
- `request.delete(url, headers)`

### Interceptors

可以拦截请求，并且作出反应。

- `request.interceptors.request.use(fn)`
- `request.interceptors.response.use(resolve, reject)`

比如，我们需要统一设置头部信息

```javascript
request.interceptors.request.use(config => {
  config.headers.token = 'daddadfsaf';
  return config;
});
```

比如做统一回调处理

```javascript
request.interceptors.response.use(
  data => data.body,
  error => Promise.reject(err.messsage)
)
```

