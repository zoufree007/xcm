# @html5/bury-point

通用埋点插件

## Install

```bash
cpm i @html5/bury-point
```

## Usage

```javascript
import Logger from '@html5/bury-point';
const logger = new Logger('/logger'); // logger接收地址
logger.send({
  a: 1,
  b: 2
});
```

## Use in wox.js

安装插件

```bash
wox install @html5/bury-point
```

我们通过以下的方式调用：

```javascript
app.logger.send(data);
ctx.logger.send(data);
```

## Evnets

```javascript
app.logger.on('request', data => {
  data.c = 3;
});
```