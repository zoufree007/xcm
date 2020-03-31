# Header

Natix组件之header设计。

## Usage

```javascript
import { Header } from '@html5/natix';
```

### instance

```javascript
const header = new Header();
```

### set data

交互数据。(默认)

```javascript
header.title = 'Untitled';
header.background = '#ffffff';
header.color = '#333333';
header.back = true;
header.border = '#eeeeee';
header.hide = false;
```

### In wox.js

bootstrap.js

```javascript
import '@html5/natix/index';
import { Header } from '@html5/natix';
const header = new Header();
export default async app => {
  app.$header = app.context.$header = header;
  Vue.prototype.$header = header;
  app.on('ThreadBegin', () => {
    console.log(`[${new Date()}] ThreadBegin`);
    header.reset();
  });

  app.on('ThreadEnd', () => {
    console.log(`[${new Date()}] ThreadEnd`);
  });
}
```

## events

```javascript
window.NX.on('WebViewHistoryGoBack', (index, length) => {
  alert(index + ',' + length);
  window.history.go(-1);
});
window.NX.on('WebViewClose', () => {
  alert('即将关闭webview');
  Webview.close();
});
window.NX.on('WebViewExtraFields', () => {
  alert('点击了工具按钮');
});
```

### event:WebViewHistoryGoBack

窗口的回退事件，它返回2个参数

- `index` 当前URL在窗口历史堆栈中的索引
- `length` 当前webview的历史堆栈的长度

### event:WebViewClose

关闭窗口事件

### event:WebViewExtraFields

窗口工具条点击后触发的事件