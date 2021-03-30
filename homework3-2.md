# 简单题

## 1.请简述 Vue 首次渲染的过程

(1) 首先进行vue的初始化，即初始化实例成员及静态成员.

(二)初始化结束以后，调用vue的构造函数new Vue()，在构造函数中调用this._init()方法

(三)this.init()相当于整个项目的入口，在这个方法中，最终调用vm.$mount()

(四)这个$mount()是src/platform/web/entry-runtime-with-compiler.js中定义的，核心作用是把模板编译为render函数，判断是否有render选项，如果没有，则会获取template选项，如果template也没有，会把el中的内容作为模板，通过compileToFunctions()方法将模板编译为render函数，编译好以后，将render存入到options.render中。

(五)调用src/platforms/web/runtime/index.js文件中的$mount方法,这个方法中会重新获取el，因为如果是运行时版本的话，是不会走entry-runtime-with-compiler.js这个入口中获取el，所以如果是运行时版本的话，我们会在runtime/index.js的$mount()中重新获取el。

(六)这个方法在src/core/instance/lifecycle.js中定义的,首先判断是否有render选项，如果没有但是传入了模板，并且当前是开发环境，则发出警告（运行时版本不支持编译器），触发beforeMount钩子函数（开始挂载之前），定义updateComponents函数但是并未调用，这个函数中调用render()和update()两个方法，render是生成虚拟dom，update是将虚拟dom转化为真实dom并挂载到页面上，
创建Watcher实例对象，创建时，传递函数updateComponents，然后调用get方法，创建完毕后，触发钩子函数mounted(),挂载结束，返回vue实例。

(七)创建完watcher，会调用一次get，在get方法中会调用updateComponent(),updateComponent会调用实例化时传入的render（）或者是编译模板以后生成的render（），返回vnode。然后调用vm._update（），调用vm.__patch__方法，将虚拟dom转化为真实dom并挂载到页面上，将生成的真实dom记录到vm.$el()中

## 2.请简述 Vue 响应式原理

1.Vue的响应式是从Vue的实例init()方法中开始的，在init()方法中先调用initState()初始化Vue实例的状态，在initState方法中调用了initData()， initData()是把data属性注入到Vue实例上，并且调用observe(data)将data对象转化成响应式的对象。

2.observe是响应式的入口, 在observe(value)中，首先判断传入的参数value是否是对象，如果不是对象直接返回。再判断value对象是否有__ob__这个属性，如果有说明做过了响应式处理，则直接返回，如果没有，创建observer对象，并且返回observer对象。

3.在创建observer对象时，给当前的value对象定义不可枚举的__ob__属性，记录当前的observer对象，然后再进行数组的响应式处理和对象的响应式处理，数组的响应式处理就是拦截数组的几个特殊的方法，push、pop、shift等，然后找到数组对象中的__ob__对象中的dep,调用dep的notify()方法，再遍历数组中每一个成员，对每个成员调用observer()，如果这个成员是对象的话，也会转换成响应式对象。对象的响应式处理，就是调用walk方法，walk方法就是遍历对象的每一个属性，对每个属性调用defineReactive方法

4.defineReactive会为每一个属性创建对应的dep对象，让dep去收集依赖，如果当前属性的值是对象，会调用observe。defineReactive中最核心的方法是getter 和 setter。getter 的作用是收集依赖，收集依赖时, 为每一个属性收集依赖，如果这个属性的值是对象，那也要为子对象收集依赖，最后返回属性的值。在setter 中，先保存新值，如果新值是对象，也要调用 observe ，把新设置的对象也转换成响应式的对象,然后派发更新（发送通知），调用dep.notify()

5.收集依赖时，在watcher对象的get方法中调用pushTarget,记录Dep.target属性，访问data中的成员的时候收集依赖，defineReactive的getter中收集依赖，把属性对应的 watcher 对象添加到dep的subs数组中，给childOb收集依赖，目的是子对象添加和删除成员时发送通知。

6.在数据发生变化的时候，会调用dep.notify()发送通知，dep.notify()会调用watcher对象的update()方法，update()中的调用的queueWatcher()会去判断watcher是否被处理，如果这个watcher对象没有的话添加到queue队列中，并调用flushScheduleQueue()，flushScheduleQueue()触发beforeUpdate钩子函数调用watcher.run()：run()-->get() --> getter() --> updateComponent()

## 3.请简述虚拟 DOM 中 Key 的作用和好处

1.Key 是用来优化 Diff 算法的。vue中Diff算法核心在于同层次节点比较，Key 就是用于在比较同层次新、旧节点时，判断其是否相同。

Key 一般用于生成一列同类型节点时使用，这种情况下，当修改这些同类型节点的某个内容、变更位置、删除、添加等时，此时界面需要更新视图，Vue 会调用 patch 方法通过对比新、旧节点的变化来更新视图。其从根节点开始若新、旧 VNode 相同，则调用 patchVnode

patchVnode 中若新节点没有文本，且新节点和旧节点都有有子节点，则需对子节点进行 Diff 操作，即调用 updateChildren，Key 就在 updateChildren 起了大作用

updateChildren 中会遍历对比上步中的新、旧节点的子节点，并按 Diff 算法通过 sameVnode 来判断要对比的节点是否相同

若这里的子节点未设置 Key，则此时的每个新、旧子节点在执行 sameVnode 时会判定相同，然后再次执行一次 patchVnode 来对比这些子节点的子节点
若设置了 Key，当执行 sameVnode
若 Key 不同 sameVnode 返回 false，然后执行后续判断；
若 Key 相同 sameVnode 返回 true，然后再执行 patchVnode 来对比这些子节点的子节点
即，使用了 Key 后，可以优化新、旧节点的对比判断，减少了遍历子节点的层次，少使用很多次 patchVnode

## 4.请简述 Vue 中模板编译的过程

1.编译的入口函数会从 compileToFunctions 开始，寻找缓存中的编译结果，若有缓存直接返回；没有则调用 compile()，将模板编译为对象将编译的字符串形式的js代码转为函数形式，然后缓存并返回。
2.在 compile 中合并选项，调用 baseCompile 编译，记录错误返回编译好的对象
3.baseCompile 作为核心内容：调用 parse() 将模板字符串转为抽象语法树（AST）；调用 optimize() 优化抽象语法树，标记静态节点& 静态根节点，使得 patch 中可跳过；调用 generate 把抽象语法树转为字符串形式的 js 代码
