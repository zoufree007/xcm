# Extra

额外功能

## CanIUse

是否支持某个方法

```javascript
window.NX.invoke('CanIUse', {
  method: 'TextMethod'
}).then(() => alert('可用')).catch(e => alert('不可用'));
```

## GetSystemInfomation

获取信息信息

```javascript
window.NX.invoke('GetSystemInfomation').then(console.log).catch(console.error);
```

## GetNetworkType

获取网络类型

```javascript
window.NX.invoke('GetNetworkType').then(console.log).catch(console.error);
```

## ScanCode

扫码

```javascript
window.NX.invoke('ScanCode').then(console.log).catch(console.error);
```

# Events

## event:NetWorkChange

```javascript
window.NX.on('NetWorkChange', status => {
  console.log(status);
})
```