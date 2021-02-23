<!--
 * @Author: your name
 * @Date: 2020-11-30 19:47:56
 * @LastEditTime: 2020-12-10 11:12:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \myGulpc:\Users\wing\Desktop\gulps\esmodules.md
-->
### ES Modules基本特性
1. 自动采用严格模式，忽略'use strict'
2. 每个ESM模块都是单独的私有作用域
3. ESM是通过CORS去请求外部JS模块的
4. ESM的script标签会延迟执行脚本，相当于在script标签加了defer属性
### ES Modules语法
```javascript
 export { a,b } // 这并不是导出的一个对象，二是es modules 的固定写法 ， 要导出对象的时候，可以用 
 export default {name,age} ; // 导出的是引用。不是拷贝 导出成员是一个常量，不能在import之后修改
 import {a, b } from 'xxx.js' // 不是赋值结构，用来提取export的成员固定结构，
 // 二, 必须写全文件扩展名。 相对路劲的'./'不能省略，否则会被认为是加载node_modules下面的模块
 // 三，动态的加载模块使用的是import('xxx.js').then(callback);
 // 同时提取默认成员和其他成员
 import a, {b,c} from 'xx.js';
//  或者
 import {b,c, default as a} from 'xx.js';
 // 五, 导入模块能直接作为导出模块，直接导出。(非默认成员导出时)
export { b } from './b.js';
export { default as b } from './a.js' // 默认模块导出方式

```
#### 注意事项
1. 导出的是引用，而不是值；
2. 导出的是常量，不允许外部修改；
3. 导入导出并不是赋值结构，而是固定语法。

#### 在原生的es Modules
1. 引入js不能省略后缀名；
2. 不能省略相对路径；
3. 不能省略路径下的index
4. 当你只需要引用时可以直接 import 'xxx.js'
5. 动态加载模块
```javascript
    import('./xxxx.js').then();
```
6. 同时导出命名成员和默认成员
```javascript
    import {name, age, default as sex} from '/xxx.js';
    import sex, {name, age} from '/xxx.js';
    
```

#### 浏览器直接使用esModule （用于本地测试，动态解析，会影响执行效率）
问题： 
    - 1. 使用browser-es-module-loader 
      2. 有es6需要使用Babel， babel-browser-build
      3. promise 再ie上不支持，使用polyfull
    做法： 从unpkg上去找对应的js。的路径
    - 1. 直接加上script会导致正常执行的浏览器执行两遍
    做法： 在附加的插件js上加上nomodule属性。将会在不执行的浏览器上加载。
#### node环境使用esmodules 
一、 需要将后缀名修改.mjs (低版本的node) 
    (高版本的node 使用esmodules时使用只需要在package.json中配置type: module, 就可以默认使用esModules,如果同时需要使用commonJS,需要将commonJS的文件后缀名修改为cjs);
    
二、 启动时需要跟上 --experimental-modules
    eg: node --experimental-modules 运行文件
    1. ES Modules中可以导入CommonJS模块
    2. CommonJS中不能导入ES Modules模块
    3. CommonJS始终只会导出一个默认成员s
        modules.exports 等同于exports.aa
    4. ES Modules中可以导入CommonJS模块
#### es Modules 中没有commonjs中的模块全局成员
```javascript
    import { fileURLToPath } from 'url';
    import { dirname } from 'path';
    // 获取文件绝对路径
    const _filename = fileURLToPath(import.meta.url)
    // 获取文件夹名
    const _dirname = dirname(_filename)
```
