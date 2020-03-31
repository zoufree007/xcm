# @html5/vix-layout

米发信用前端通用布局插件。让我们的开发更加插件化和结偶化。

## Installer

```shell
cli wox:setup @html5/vix-layout -r cpm
```

## Inject template

注入模板，很简单，只要将主项目的`app.vue`内容替换以下：

```html
<template>
  <VixMain></VixMain>
</template>
<script>
  export default {
    name: 'Application'
  }
</script>
```

理论上只要引用`<VixMain></VixMain>`标签即可加载。完成这步后，什么都不需要做，直接开始我们的代码逻辑即可。

## Package information

此插件需要引入2个子依赖：`vant` `vue`。所以在主项目下需要安装这2个依赖。

```shell
cpm i babel-plugin-import postcss-pxtorem -D
```

在`.babelrc`文件中的`plugins:`下需要添加以下代码：

```javascript
["import", {
  "libraryName": "vant",
  "libraryDirectory": "es",
  "style": name => `${name}/style/less`
}]
```

## Webpack configs

如果我们需要将px转化为rem，那么我们就需要用到配置项`postcss.config.js`文件。

```javascript
// # postcss.config.js
module.exports = {
  plugins: {
    'autoprefixer': {
      browsers: ['Android >= 4.0', 'iOS >= 7']
    },
    'postcss-pxtorem': {
      rootValue: 37.5,
      propList: ['*']
    }
  }
}
```

同时需要在模板(html)中添加代码：

```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
```

## Color mode

统一颜色模式我们都使用`rgba`，只要是hybrid交互的都使用rgba颜色表达模式。


## Header 

在项目启动前，我们都会在`app`和`app.context`上注入一个头部变量叫`AppHeader`，即`app.AppHeader`或者`ctx.AppHeader`。用来对头部进行操作。

**1. 改变头部文案**

通常有2中模式：

```javascript
ctx.$header.title = '测试页面';
ctx.$header.setTitle('测试页面');
```

**2. 设置头部主题**

主题控制文案和图标的颜色，只有2中模式，亮色系和暗色系，分别对应`light`和`dark`。所以我们的主题必须为其中之一。

```javascript
ctx.$header.theme = 'light';
ctx.$header.setTheme('dark');
```

**3. 设置头部背景色**

背景色统一使用`rgba`模式

```javascript
ctx.$header.backgroundColor = 'rgba(33,150,243,1)';
ctx.$header.setBackgroundColor('rgba(33,150,243,1)');
```

**4. 接管或者监听返回按钮**

我们使用`goBack`方法对返回进行拦截。默认情况下，永远显示返回按钮，这与原声兼容，保障H5页面在出错未加载情况下能够退出。`goBack`方法接受一个参数，根据参数类型的不同，有不同的功能：

- 当参数为布尔类型，那么表示是否显示返回按钮，一般我们使用`ctx.AppHeader.goBack(false)`来禁用返回按钮，如果为`true`表示显示返回按钮，同时使用原生返回处理模式。
- 当参数为函数类型，那么表示我们将接管这个按钮的操作行为，可以理解为点击按钮事件为原生时间，执行js代码，达到hybrid交互拦截。

我们来看个例子：

*1. 使用原生的交互*

```javascript
ctx.$header.goBack(false); // 不显示返回按钮
ctx.$header.goBack(true); // 显示返回按钮
ctx.$header.goBack(); // 显示返回按钮 等价 ctx.AppHeader.goBack(true);
```

*2. 拦截交互*

```javascript
ctx.$header.goBack(index => {
  // index 表示当前页面在历史堆栈中的索引
  if (i > 0) return window.history.go(-1);
  return webview.close();
});
```

意思是说我们需要自己处理返回逻辑，通过另一个hybrid交互来关闭或者返回页面。这在页面自定义上处理极好。

**5. 接管工具栏事件**

我们统一设计工具栏功能，为了不发版即可解决功能新增的痛点。默认的，工具栏部设定是部显示的。

```javascript
ctx.$header.setAction([
  {
    name: '选项1',
    event: 'a'
  },
  {
    name: '选项2',
    subname: '描述信息',
    event: 'b'
  },
  {
    name: '禁用选项',
    disabled: true,
    event: 'c'
  }
]);
```

这个组件可以参考 [https://youzan.github.io/vant/#/zh-CN/actionsheet](https://youzan.github.io/vant/#/zh-CN/actionsheet) 的配置，不过不同的是，我们需要在每项中写入一个`event`事件名，用来点击时候调用。

如上代码，如果我们点击了`选项1`，需要触发一个时间`a`。那么我们需要优先定义好这些事件：

我们需要在即将进入的webview的`enter`事件上定义如下：

```javascript
{
  enter(ctx) {
    ctx.on('a', async () => {
      await new Promise(resolve => {
        setTimeout(resolve, 3000);
      });
    })
  }
}
```

或者你可以通过传统的方式来调用

```javascript
{
  enter(ctx) {
    ctx.on('a', next => {
      setTimeout(() => {
        next();
      }, 3000);
    })
  }
}
```

## Footer

在项目启动前，我们都会在`app`和`app.context`上注入一个头部变量叫`AppFooter`，即`app.AppFooter`或者`ctx.AppFooter`。用来对底部进行操作。

底部tabs栏设定，由于考虑到不同app需要不同的样式，那么我们约定，底部的tab，必须为自定义的组件，所以，我们只要只要组件名即可。

**1. 打开和关闭底部tabs**

```javascript
ctx.$footer.show = true;
```

**2. 添加底部tabs内容**

注意，这个设定必须在项目启动时候完成，只能做一次。

*app.js | bootstrap.js*

```javascript
app.$footer.addField('TmpUse', 'TmpAbc');
```

我们只需要传入组件名即可。

**3. 事件**

底部tabs存在各种时间如下：

- `mount` 表示在页面*刚加载完毕*时候，我们可以自处理逻辑，让这个组件是否状态标记为选中。
- `select` 表示我们点击底部的tabs子项的时候，我们需要做的*选中*操作，比如选中等。
- `unselect` 表示我们点击底部tabs子项的时候，我们需要做的*非选中*操作，比如选中等。

在组件中我们可以尝试这样写，查看效果：

```html
<template>
  <div>Untitled Component</div>
</template>
<script>
  export default {
    name: "TmpAbc",
    created() {
      this.$on('mount', () => console.log('abc mount'));
      this.$on('select', () => console.log('abc select'));
      this.$on('unselect', () => console.log('abc unselect'))
    }
  }
</script>
```

## Webview

在项目启动前，我们都会在`app`和`app.context`上注入一个头部变量叫`AppWebView`，即`app.AppWebView`或者`ctx.AppWebView`。用来对webview进行操作。

**1. 打开一个页面**

```javascript
ctx.$webview.open('http://shenyunjie.mzftech.cn:8081/#/test');
```

**2. 关闭一个页面**

```javascript
ctx.$webview.close();
```

**3. 设定背景颜色**

```javascript
ctx.$webview.backgroundColor = 'rgba(65,31,49,1)';
ctx.$webview.setBackgroundColor('rgba(65,31,49,1)');
```

**4. 拦截Android物理返回键行为**

```javascript
ctx.$webview.pressAndroidBackKey(function() { ... });
```

## AppWakeUp Event

用于监听app唤起时候触发事件来提供刷新服务。

我们可以在Webview的生命周期中如下书写：

```javascript
enter(ctx) {
  ctx.on('AppWakeUp', () => {
    // ...
  })
}
```

同时我们可以监听真个项目的`AppWakeUp`事件

```javascript
app.on('AppWakeUp', () => {
  // ...
});
```

## Header Rate


```vue
<VixMain :header-rate="3"></VixMain>
```