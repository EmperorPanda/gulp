<!--
 * @Author: your name
 * @Date: 2020-12-10 13:34:31
 * @LastEditTime: 2020-12-23 13:53:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \myGulpc:\Users\wing\Desktop\gulps\webpack.md
-->

#### 快捷支付

### webpack

1. 模块打包工具
2. 模块加载器 Loader 转换代码
3. 代码拆分，按需打包（可以将首页的加载的打包到一起， 解决初次加载文件太大的问题）
4. 资源模块，wbpack支持以模块的方式载入任意资源

#### webpack基础使用

1. webpack默认从src/index文件开始打包，生成dist/main.js文件
2. 要修改可在webpack.config.js中进行配置。

#### 加载器

1. 编译转换类，将文件编译成一个js的模块，例如css-loader, url-loader,
2. 文件操作类， file-loader
3. 代码检查类， esLink-loader

#### webpack 只是打包工具

处理es6代码需要加载器用来编译转换代码

#### webpack 模块加载方式

1. 遵循esModules 标准的import声明
2. commonJS标准的require
3. 遵循amd规范的define函数和require函数
4. 样式代码中的@import指令和url函数
5. HTML代码中图片标签的src属性

#### webpack sorcemap 使用

#### DefinePlugin 使用

1. 用于定义全局常量
2. 接收表达式，或者字符串

```javascript
const webpack = require('webpack');
plugin: [
    new webpack.DefinePlugin({
        orgin_url: '"https://www.baidu.com"' // 定义的全局的常量
    })
]
```

#### Tree Shaking

```javascript
    optimization: {
        usedExports: true, // 只导出外部使用的成员
    },
```
