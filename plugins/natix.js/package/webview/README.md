# WebView

Natix组件之webview。

## Usage

```javascript
import { Webview } from '@html5/natix';
```

所有webview的操作都将返回一个promise.

## Webview.open(url, options)

打开一个新的窗口

```javascript
Webview.open('http://baidu.com', {
  background: '#734ae2', // webview背景色
  direction: 'bottom', // webview进入方向
  header: {
    color: '#ffffff', // 状态栏文本颜色
    title: 'Application', // 标题
    background: '#742eab', // 状态栏背景色
    back: 'YES', // 是否显示返回键
    border: '#ffffff'
  }
})
```

## Webview.close()

关闭当前的窗口

```javascript
Webview.close()
```

## Webview.background(color)

设置webview的背景色

```javascript
Webview.background('#ff0000');
```