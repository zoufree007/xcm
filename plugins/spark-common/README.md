# @html5/spark-common
为基于wox开发的移动端项目提供一个用于处理网络请求的聚合层模块，
它是基于 [axios](https://www.npmjs.com/package/axios)、[@wox/vuex]、[vix-layout] 组合封装而成。
它的主要功能有：
1. 通过wox的插件配置文件向项目的所有http请求注入请求头。
2. 当app在运行过程中出现特定的网络错误时，向用户提供对应的引导消息。

## Install

```bash
cli wox:setup @html5/spark-common -r cpm
```

## Configuration (输入)

配置文件：

```javascript
{
  "knock_knock": // 存放 token
}
```

## Ajax Client (输出)
此插件会向 `Wox的实例` 和 `虚拟请求的环境对象` 注入一个名为`$ajax`的axios实例。

```javascript
app.$ajax; // app 代指 Wox的实例。
app.context.$ajax;
ctx.$ajax; // ctx 代指 虚拟请求的环境对象
```

### $ajax.service

它是本插件规定的通用型的http请求方法，参数如下：`ajax.service(service_id, post_data = {}, configs = {})`

- **service_id** `string` 服务ID
- **post_data** `json` 请求数据，包括需要写入`paramMap` 或者 `items`
- **configs** `json` 额外配置，可以配置`headers`等，具体看`axios`的配置

#### 示例代码
```javascript
this.ctx.$ajax.service.info('service_id', {params}, {
  headers: {
    tenantId: 6,
    clientType: 4,
    alias: 'shunfengdai'
  }
})
.then((data) => console.log(1, data)).catch(err => console.log(2, err))
```

### Error level

错误级别

- `OK` 正常 - 0
- `INFO` 提示 - 1
- `WARN` 警告 - 2
- `ERROR` 错误 - 3
- `FATAL` 致命 - 4

根据以上错误级别，我们具有以下的方法支持：

- `ajax.service.info(service_id, post_data = {}, configs = {})` 提示型请求
- `ajax.service.warn(service_id, post_data = {}, configs = {})` 警告型请求
- `ajax.service.error(service_id, post_data = {}, configs = {})` 错误型请求
- `ajax.service.fatal(service_id, post_data = {}, configs = {})` 致命型请求

## 事件钩子 (输出)
本插件会向 app (Wox的实例) 注入一些事件钩子，下文将列出每个钩子的具体名称及用法。

### INVALID_TOKEN

在token有误 (比如token过期后) 时被调用。

```javascript
app.on('INVALID_TOKEN', () => {
  console.log('INVALID_TOKEN');
  // do something else...
})
```


## 元数据注入
元数据注入的流程如下：

1. 本插件会从以下三个位置获取ajax客户端所需的请求头元数据：
  1. `@wox/vuex` 的实例（即`$store.Meta`）： 通过访问`store.state.Meta`来获取。 
  2. wox插件配置文件： 通过读取插件的配置文件来获取，从这一步获取到的元数据会覆盖掉由上一步获取而来的同名的元数据。
  3. process.env.META_DATA： 通过读取`process.env.META_DATA`来获取，从这一步获取到的元数据会覆盖掉由上一步获取而来的同名的元数据。
2. 将获取到的元数据注入`$store.Meta`。
