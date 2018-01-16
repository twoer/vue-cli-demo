# Vue cli demo

> 基于 Vue-cli 2.92 版本的一个 demo

### 特别之处

1. 外部 SASS 、 Vue 文件 SASS 全局 px 2 rem（font size dpr 转换） 配合 [flexible.js](https://github.com/amfe/lib-flexible/tree/master) 使用
2. 支持全局 SASS Mixin，不用单独 import 
3. 配置修改简单轻量

### 主要修改内容
1. build/utils.js 中 cssLoaders 方法
2. 增加 getPx2remConfig、getSassResources 两个方法

   [修改对比图](https://github.com/twoer/vue-cli-demo/tree/master/update-screenshot)


#### getPx2remConfig 配置
[px2rem-dpr-loader](https://github.com/twoer/px2rem-dpr-loader) 是我个人基于 [px2rem-dpr](https://www.npmjs.com/package/px2rem-dpr) 写的一个 webpack loader


#### getSassResources 配置
简单而言 就是以 `String` 或者 `Array` 配置好需要全局加载的 sass 文件
[sass-resources-loader](https://github.com/shakacode/sass-resources-loader)

### 注意事项

1. 直接编写 `css` 肯定比通过 `js` 操作样式 要来的高效，可以操作 `index.html` 直接在页面提前写好 `media` 适配
2. 为防止 `flexible` 加载后重新渲染 root `font-size`，可以修改 `flexible`中的逻辑，如果 `flexible` 计算的 `font-size` 和 `media` 一致就不再重复设置 
3. 遇到不想编译的 `px` 可以使用 `50.00px`，    
   原理：

```
shouldIgnoreRule: function(rule) {
      if( /\.00px$/.test(rule.value) )
      {
        rule.value = rule.value.replace(/\.00px$/, 'px');
        return true;
      }
```


### Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
