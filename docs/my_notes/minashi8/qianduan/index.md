# JavaScript面试八股文

## Js的数据类型有哪些？他们的区别是什么？

**基本数据类型**：Number String Boolean Null Undefined Symbol（ES6）
        （他们直接存储在内存中的，占用固定的内存空间。基本数据类型的赋值是通过将值直接复制给变量来完成的。）

**引用数据类型** :Object Array Date Function（）
        (它们存储的是对象在内存中的地址，而不是对象本身。引用数据类型的变量实际上存储的是对象在内存中的引用，通过引用可以访问和操作对象的属性和方法。引用数据类型的赋值是将对象的引用赋给变量。)

**区别：**

- 存储方式：基本数据类型直接存储数据值，而引用数据类型存储的是对象的引用、

- 内存占用：基本数据类型占用固定的内存空间，而引用数据类型的大小取决于对象的大小。

- 赋值方式：基本数据类型的赋值是通过将值直接复制给变量，而引用数据类型的赋值是将对象的引用赋给变量。

- 传递方式：基本数据类型作为参数传递时，传递的是值的副本，而引用数据类型作为参数传递时，传递的是引用的副本。

  
 ## 判断数据类型有几种方法？

 ​ typeof （缺点：typeof null的值为Object，无法分辨是null还是Object）        

 Object.prototype.toString.call（缺点：不能细分为谁谁的实例）

## 作用域和作用域链

作用域：规定变量和函数的可使用范围称作作用域。
        作用域链：每个函数都有一个作用域链，查找变量或者函数时，需要从局部作用域到全局作用域依次查找，这些作用域的集合称作作用域链。

## 原型和原型链

 原型：原型分为隐式原型和显式原型，每个对象都有一个隐式原型，它指向自己的构造函数的显式原型。
        原型链：当我们访问一个对象的属性时，如果这个对象内部不存在这个属性，那么他就会去prototype里找这个属性，这个prototype又会有自己的prototype，于是就这样一直找下去，也就是我们平时所说的原型链的概念。

## 什么是闭包？

闭包是什么：JS中内层函数可以访问外层函数的变量，使内部私有变量不受外界干扰，起到保护和保存的作用，我们把这个特性称作闭包。
       **好处：**隔离作用域，保护私有变量；有了闭包才有局部变量，要不然都是全局变量了。让我们可以使用回调，操作其他函数内部；变量长期驻扎在内存中，不会被内存回收机制回收，即延长变量的生命周期。
       **坏处：**内层函数引用外层函数变量，内层函数占用内存。如果不释放内存，过多时，易引起内存泄露。
       **引用场景：** for循环中的保留i的操作 / 防抖和节流 。

## 内存泄露、垃圾回收机制

**内存泄露：**
        是指不再用的内存没有被及时释放出来，导致该段内存无法被使用就是内存泄漏，内存泄漏指我们无法在通过js访问某个对象，而垃圾回收机制却认为该对象还在被引用，因此垃圾回收机制不会释放该对象，导致该块内存永远无法释放，积少成多，系统会越来越卡以至于崩溃。

**垃圾回收机制：**
        就是垃圾收集器按照固定的时间间隔，周期性地寻找那些不再使用的变量，然后将其清楚或释放内存。（标记清除/引用计数）

## Js获取dom

- getElementById：通过元素的ID属性获取DOM元素。
- getElementsByClassName：通过元素的class属性获取DOM元素
- getElementsByTagName：通过元素的标签名获取DOM元素
- querySelector：通过CSS选择器获取DOM元素
- querySelectorAll：通过CSS选择器获取DOM元素

## 浅拷贝与深拷贝

 **浅拷贝**：将原对象或原数组的引用直接赋给新对象，新数组，新对象只是对原对象的一个引用，而不复制对象本身，新旧对象还是共享同一块内存。(拓展运算符。。。)
        **深拷贝**：开辟一个新的栈，两个对象的属性完全相同，但是对应两个不同的地址，修改一个对象的属性，不会改变另一个对象的属性。（JSON.stringify和JSON.parse / 递归/Object.assgin ）

深浅拷贝的几种方法：

```javascript
 // 浅拷贝：浅拷贝之后，简单数据类型改变后，原数组不会变化，复杂数据类型改变后，原数组会改变
 // 第一种方法：slice
 let arr = [1, 2, 3, [1, 2, 3]]
 let copyArr = arr.slice()
 copyArr[1] = 100
 copyArr[3][1] = 'a'
 console.log("arr", arr) // [1, 2, 3, [1,'a',3]]
 console.log("copyArr", copyArr) // [1, 100, 3, [1,'a',3]]

 // 第二种方法：concat
 let arr1 = [1, 2, 3, [1, 2, 3]]
 let copyArr1 = [].concat(arr1)
 copyArr1[1] = 100
 copyArr1[3][1] = 'a'
 console.log("arr1", arr1) // [1, 2, 3, [1,'a',3]]
 console.log("copyArr1", copyArr1) // [1, 100, 3, [1,'a',3]]

 // 深拷贝：深拷贝之后，简单数据类型改变后，原数组不会变化，复杂数据类型改变后，原数组不会改变
 // 第一种方法：JSON.parse(JSON.stringify(arr))
 let arr2 = [1, 2, 3, [1, 2, 3]]
 let copyArr2 = JSON.parse(JSON.stringify(arr2))
 copyArr2[1] = 100
 copyArr2[3][1] = 'a'
 console.log("arr2", arr2)
 console.log("copyArr2", copyArr2)

 // 第二种方法：递归
 let arr3 = [1, 2, 3, [1, 2, 3]]
 // 创建一个递归函数，返回一个新数组
function DIGUI(arr){
     let newArr = []
     for (let i = 0; i < arr.length; i++) {
         if (typeof arr[i] === 'object') {
             newArr[i] = DIGUI(arr[i])
         } else {
             newArr[i] = arr[i]
         }
     }
     return newArr
 }
 let copyArr3 = DIGUI(arr3)
 copyArr3[1] = 100
 copyArr3[3][1] = 'a'
 console.log("arr3", arr3)
 console.log("copyArr3", copyArr3)
 console.log(typeof arr3[3]) // object
```

```shell
优点：方便，将字符串parse后创建新对象（新地址）。
缺点：如果被拷贝的对象中某个属性的值为undefined，则拷贝之后该属性会丢失，如果被拷贝的对象中有正则表达式，则拷贝之后的对象正则表达式会变成Object。
```

## route和router的区别详解

    route是用来获取路由信息的。 $route.path $route.params route.query等
    router是用来操作路由的

## 如何改变this指向（call、apply与bind区别）

call、bind、apply 都是 JavaScript 中用于改变函数执行上下文（即 this 指向）的方法。

```shell
传参 call、bind可以传递无数个参数，apply只有两个参数，第二个参数为数组
返回 call和apply方法是直接调用函数并改变函数上下文，而bind方法则是返回一个新函数，稍后调用时绑定指定的上下文。
```

## 箭头函数和普通函数的区别

- 箭头函数是普通函数的简写，但是它不具备很多普通函数的特性

- this指向问题，箭头函数的this指向它定义时所在的对象，而不是调用时所在的对象

- 没有arguments对象，不能使用arguments

- 不会进行函数提升

- 不能new

## 浏览器存储，他们的区别？

- localStorage：永久保存，以键值对保存，存储空间5M
-  sessionStorage：关闭页签/浏览器时清空
-   cookie：随着请求发送，通过设置过期时间删除
-   session：保存在服务端
  （localStorage/sessionStorage是window的属性，cookie是document的方法）

## 继承方式有哪些?

- 原型继承：不能传参
- 组合继承： 调用了两次父类的构造函数，不共享父类引用属性
- ES6的extend：子类只要继承父类，可以不写 constructor ，一旦写了，则在 constructor 中的第一句话必须是 super

## 常用的数组方法有哪些？

- 改变原数组：push、pop、shift、unshift、sort、splice、reverse

- 不改变原属组：concat、join、map、forEach、filter、slice

  ```
  slice切片的意思，根据传入的起始和终止下标，获取该范围数组。
  splice可根据传入参数个数不同实现删除、插入操作，直接操作原数组。第1个参数为起始下标，第2个为删除个数，第3个为要增加的数据。
  ```


# Vue

## Vue的生命周期

- beforeCreate:会在实例初始化完成、props 解析之后、data() 和 computed 等选项处理之前立即调用。此时不能获得DOM节点
- created:在这个阶段vue实例已经创建，以下内容已经设置完成：响应式数据、计算属性、方法和侦听器。然而，此时挂载阶段还未开始，因此 $el 属性仍不可用。仍然不能获取DOM元素。
- beforeMount:在组件内容被渲染到页面之前自动执行的函数，组件已经完成了其响应式状态的设置，但还没有创建 DOM 节点。
- mounted:在组件被渲染之后自动执行的函数。一般我们的异步请求都写在这里。在这个阶段，数据和DOM都已被渲染出来。
- beforeUpdate:数据变化的时候自动执行的函数，此时变化后的数据还未渲染到页面之上。.
- updated:数据变化之后自动执行的函数，此时变化后的数据已经渲染到页面之上
- beforeDestroy:当 Vue 应用被销毁时，自动执行的函数。
- destroyed当 Vue 应用被销毁后，且 dom 完全销毁之后，自动执行的函数。
  

## Vue双向绑定

`vue.js`是采用数据劫持结合发布者-订阅者模式的方式，通过`Object.defineProperty()`来劫持各个属性的setter,getter,在数据变动时发布消息给订阅者，触发相应的监听回调，

`v-model`是一个指令，双向绑定实际上是Vue 的编译器完成的，通过输出包含v-model模版的组件渲染函数，实际上还是value属性的绑定及input事件监听，事件回调函数中会做相应变量的更新操作。

```vue
v-bind:value = "message"
v-on:input = "message=event.target.value" 作用在组件上,本质是一个父子组件通信的语法糖，通过 prop 和 .emit 实现, 等同于:value = "message" @input = "$emit('input', $event.target.value)"
```



## keep-alive

在组件切换过程中将状态保留在内存中，防止重复渲染DOM，减少加载时间及性能消耗，提高用户体验性。

    生命周期（activated组件激活时调用/deactivated组件停用时调用）

## nextTick

在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM

## Vue的Key的作用？

key主要用在虚拟Dom算法中，每个虚拟节点VNode有一个唯一标识Key，通过对比新旧节点的key来判断节点是否改变，用key就可以大大提高渲染效率

## diff算法

diff算法是指对新旧虚拟节点进行对比，并返回一个patch对象，用来存储两个节点不同的地方，最后利用patch记录的消息局部更新DOM。

## 虚拟DOM的优缺点

缺点:首次渲染大量DOM时，由于多了一层虚拟DOM的计算，会比innerHTML插入慢。

优点：减少了dom操作，减少了回流与重绘。

## 回流和重绘

render树中一部分或全部元素需要改变尺寸、布局、或着需要隐藏而需要重新构建，这个过程叫做回流，回流必将引起重绘。

## Vue组件之间的通信方式

- 父传子：子组件设置props + 父组件设置v-bind

- 子传父：组件的$emit + 父组件设置 v-on

- ref/refs:在子组件上，它的用用就指向了子组件的实例，可以通过实例来访问组件的数据和方法

- eventBus事件总线:(不会用)

## Vue路由传参的方式

```vue
params传参：刷新后会丢失数据
//编程式
    this.$router.push({
    name: 'home', //注意使用 params 时一定不能使用 path
    params: { username: this.username },
    })

//声明式
<router-link :to="{ name: 'home', params: { username: username } }">


query传参：
//编程式
    this.$router.push({
    path: '/home',
    query: { username: this.username },
    })

//声明式
<router-link :to="{ path: '/home', query: { username: username } }">
```

## computed和watch的区别

**computed计算属性：依赖其他属性，当其他属性改变的时候下一次获取computed值时也会改变。**

- 它支持缓存，只有依赖的数据发生了变化，才会重新计算。例如模板中多次用到数据拼接可以用计算属性，只执行一次计算，除非数据发生变化。
- 不支持异步，如果有异步操作，无法监听数据的变化。
- 如果属性值是函数，默认使用get方法，函数的返回值就是属性的属性值。还有一个set方法，当数据变化时就会调用set方法。
- computed的值会默认走缓存，计算属性是基于它们的响应式依赖进行缓存的，也就是基于data声明过，或者父组件传递过来的props中的数据进行计算的。

   **watch侦听器：**

- 它不支持缓存，数据变化时，它就会触发相应的操作。

- 支持异步监听。

- 接受两个参数，第一个是最新的值，第二个是变化之前的值。

- 监听data或者props传来的数据，发生变化时会触发相应操作。有两个参（immediate/deep）

## map和forEach的区别?

都是循环遍历数组中的每一项 forEach和map方法里每次执行匿名函数都支持3个参数，map方法返回一个新的数组，数组中的元素为原始数组调用函数处理后的值。forEach方法没有返回值。

## v-if和v-show区别？

v-if控制是否创建Dom，v-show控制是否显示Dom。

## 为什么避免 v-if 和 v-for 用在一起?

当 Vue 处理指令时，v-for 比 v-if 具有更高的优先级，这意味着 v-if 将分别重复运行于每个 v-for 循环中，带来性能方面的浪费。

## 单页面应用是什么？优缺点？如何弥补缺点?

*单页面对一个入口DOM通过路由去更改内容，整个应用只有一个html页面。*

- SPA优点：用户体验好，没有页面切换就没有白屏情况；

- SPA缺点：首屏加载慢，不利于SEO

- SPA弥补：通过压缩、路由懒加载缓解首屏慢；通过SSR 服务器端渲染解决SEO问题；

## Vue首屏优化怎么做？

- 使用较轻量的组件，比如echart对应有vue-chart。

- vue-cli开启打包压缩 和后台配合 gzip访问。

- 路由懒加载，分包。

- 打包时配置删掉log日志。

- 资源过大可以使用cdn模式引入，不再打包到本地。

## 什么是Vue动态组件？

Vue 的动态组件是通过 `<component>` 元素结合 `:is` 特性实现的，它允许你根据当前的数据状态来决定渲染哪个组件。这为创建可切换或条件性的组件提供了极大的灵活性，非常适合用于构建标签页、路由视图或其他需要在不同组件之间切换的场景。

## 动态组件的基本用法

```vue
<template>
  <div>
    <!-- 使用 :is 绑定一个数据属性来决定渲染哪个组件 -->
    <component :is="currentComponent"></component>

    <!-- 按钮用于切换 currentComponent 的值 -->
    <button @click="currentComponent = 'ComponentA'">显示组件 A</button>
    <button @click="currentComponent = 'ComponentB'">显示组件 B</button>
  </div>
</template>

<script>
import ComponentA from './ComponentA.vue';
import ComponentB from './ComponentB.vue';

export default {
  components: {
    ComponentA,
    ComponentB
  },
  data() {
    return {
      currentComponent: 'ComponentA' // 初始渲染的组件
    };
  }
};
</script>
```

## vue2的缺陷是什么？如何解决vue2.0数组中某一项改变，页面不改变的情况？

```shell
缺陷：数据如果为对象直接新增属性，如果为数组通过下标操作数组项，页面无法触发更新。
对策：关于对象可以通过Vue.$set(obj,key,value)，组件中通过this.$set(obj,key,value)实现新增，修改属性vue可以相应更新视图。关于数组也可以通过Vue.$set(obj,key,value)，或者作者重写的那些方法来操作。
```

## Vue.use()是干什么的？

**1.安装全局组件**：你可以创建一个自定义组件并将其作为插件提供，然后使用 `Vue.use()` 将其注册为全局组件，这样你就可以在应用的任何地方使用这个组件而不需要每次都单独引入。

**2.添加全局方法或属性**：插件可以向 Vue 构造器添加实例方法或属性，通过 `Vue.use()` 安装后，这些方法或属性可以在所有的 Vue 实例中访问。

**3.添加全局资源**：比如指令（directives）、过滤器（filters）等，可以通过插件的形式添加，并通过 `Vue.use()` 注册。

**4.提供辅助函数或工具库**：有些插件提供了一系列的辅助函数或工具库，通过 `Vue.use()` 可以方便地在项目中使用这些工具。

**5.配置第三方库**：许多第三方库提供了针对 Vue 的包装插件，通过 `Vue.use()` 可以简化这些库的集成过程，例如 Vuex (状态管理)、Vue Router (路由管理) 等。

# Vuex

vuex是一个状态管理工具，集中式的管理所有组件的状态数据。统一的去管理组件，将组件的状态抽象为一个store文件，通过commit方法触发mutation里的函数来改变组件属性。

```vue
五个属性state（存储） getters（获取） mutations（同步操作 /this.$store.commit(“方法名”,数据)/mapMutations） actions（异步操作 /this.$store.dispatch(“方法名”,数据)/mapActions） modules（放多个vuex）
```

## vue2组件中data为什么必须是一个函数？

1. **避免状态共享**：当 `data` 是一个对象时，这个对象会在所有组件实例间共享。这意味着如果你修改了一个实例的数据，其他所有实例的数据也会被同步修改，这显然不是我们想要的行为。每个组件实例都应该拥有自己独立的状态。
2. **确保组件的独立性**：通过让 `data` 成为一个返回新对象的函数，Vue 可以确保每次创建新的组件实例时都会调用这个函数，并返回一个新的对象作为该实例的数据。这样，每个组件实例都有自己独立的一份数据副本，不会影响到其他实例。
3. **符合 JavaScript 的行为**：在 JavaScript 中，对象和数组是引用类型，这意味着当你把它们赋值给另一个变量或传递给函数时，实际上是复制了对同一个内存位置的引用。因此，如果 `data` 是一个对象，它会被所有组件实例所共享。而通过返回一个新的对象，我们可以避免这种共享引用的问题。
4. **简化组件复用**：当组件可以被多次复用时（例如在一个循环中渲染多个相同的组件），每个组件实例需要有自己的数据状态。如果 `data` 不是一个函数，那么这些复用的组件将会共享相同的数据，导致不可预测的行为。

# ES6

## ES6和ES7新增的几种语法

  **let 和 const 关键字:**

- let 用于声明块级作用域的变量。

- const 用于声明不可重新赋值的常量。

  **箭头函数:**

- 简化了函数表达式的语法，并且自动绑定 this 。

  **模板字符串:**
- 允许使用反引号（`）来创建多行字符串和内嵌表达式。
    **解构赋值:**
- 可以从数组或对象中提取数据并赋值给变量。
    **默认参数:**
- 函数参数可以有默认值，当调用时未提供这些参数时会使用默认值。
- 剩余参数（Rest Parameters）与扩展运算符（Spread Operator）:
- 剩余参数允许我们将不定数量的参数表示为一个数组。
- 扩展运算符可以在函数调用、数组构造等地方展开数组元素。
    **类（Classes）:**
- 提供了一种更清晰的面向对象编程方式，包括类的继承、静态方法等。
    **模块（Modules）:**
- 支持导入（import）和导出（export）语句，使代码组织更加模块化。
    **Promise:**

- 内置的异步操作处理机制，简化了回调地狱问题。
- 迭代器（Iterators）和生成器（Generators）:
- 提供了新的遍历集合的方式，以及暂停/恢复执行的能力。

  **Set 和 Map 数据结构:**
  
- Set 是不包含重复值的集合，Map 是键值对的集合，键可以是任何类型的值。
- Proxy 和 Reflect:
- Proxy 用于创建对象的代理，拦截并自定义基本操作。
- Reflect 提供了操纵对象的方法，通常与 Proxy 一起使用。

**ES7 (ECMAScript 2016) 特性**

 **Array.prototype.includes():**

- 判断数组是否包含某个值，返回布尔值。
**指数运算符（）**:**
- 简化了幂运算的书写方式，例如 2 ** 3 等同于 Math.pow(2, 3)。

## 什么是Promise？

Promise异步编程的一种解决方案。Promise是一个构造函数，接收一个函数作为参数，返回一个 Promise 实例。

```js
let p = new Promise(function(resolve, reject){
		//做一些异步操作
		setTimeout(function(){
			console.log('执行完成Promise');
			resolve('要返回的数据可以任何数据例如接口返回数据');
		}, 2000);
	});
```

- Promise对象有三种状态，他们分别是 pending（等待中） resolved（已完成）rejected（拒绝）。
- Promise.all哪怕一个请求失败了也能得到其余正确的请求结果的解决方案。
- promise 的then会返回一个新的 promise 对象，能保证 then 法可以进行链式调用。

## async、await

- Async 和 await 是一种同步的写法，但还是异步的操作，两个必须配合一起使用。
- 函数前面的async关键字，表明该函数内部有异步操作。调用该函数时，会立即返回一个Promise对象，await 是个运算符，用于组成表达式，await 表达式的运算结果取决于它等的东西，如果是promise则会等待promaise 返回结果，接普通函数直接进行链式调用。
- 如果await后面不是Promise对象, 就直接返回对应的值，只能在async函数中出现, 普通函数直接使用会报错，await语句后的Promise对象变成reject状态时，那么整个async函数会中断，后面的程序不会继续执行。

## 宏任务和微任务有哪些？执行顺序

- 宏任务：script，setTimeout，setInterval。
-  微任务：Promise，process.nextTick。
- 微任务会优先于宏任务执行。这意味着在当前任务执行结束后，所有微任务都会被立即执行，而宏任务只有在所有微任务执行完毕后才会执行。

## 箭头函数

箭头函数实现了一种更加简洁的书写方式。箭头函数内部没有arguments，也没有prototype属性，所以不能用new关键字调用箭头函数。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <script>
        const Test1 = ()=>{
            return "Hello World2"
        }

        function Test2(){
            return "Hello World2"
        }

        console.log(new Test1())// 箭头函数不能用new
        console.log(new Test2())// 可以使用new
    </script>
</body>
</html>
```

**箭头函数和普通函数最大的区别在于其内部this永远指向其父级对象的this。(重点)**

## var  let  const的区别?

- var声明的变量存在变量提升，即变量可以在声明之前调用，var允许重复声明变量var不存在块级作用域
- let和const不存在变量提升，即它们所声明的变量一定要在声明后使用，否则报错
- let和const存在块级作用域l
- let和const在同一作用域不允许重复声明变量

**ES6新特性:**
        模板字符串，箭头函数，拓展运输符，map和set，promise和proxy，数组方法Array.from()，map()、filter()，forEach()，some()、every()。

## 网络原理

### 网络状态码

1. **1xx - 信息性响应**

这些状态码表示请求已被接收，继续处理中。

- **100 Continue**：服务器已收到请求头，并且客户端应继续发送请求体。
- **101 Switching Protocols**：服务器已理解客户端的请求，并将通过升级协议进行响应（如从 HTTP 升级到 WebSocket）。
- **102 Processing (WebDAV)**：服务器已收到并正在处理请求，但处理尚未完成。

2. **2xx - 成功响应**

这些状态码表示请求已成功接收、理解和处理。

- **200 OK**：请求成功，服务器返回了所请求的资源。
- **201 Created**：请求成功，并且服务器创建了一个新的资源，通常用于 POST 请求。
- **202 Accepted**：请求已接受，但尚未处理完成。服务器承诺最终会处理该请求。
- **204 No Content**：请求成功，但服务器没有返回任何内容。通常用于 PUT 或 DELETE 请求。
- **206 Partial Content**：服务器成功处理了部分 GET 请求，通常用于分段下载。

3. **3xx - 重定向响应**

这些状态码表示客户端需要采取进一步的动作来完成请求，通常是重定向到另一个 URL。

- **300 Multiple Choices**：服务器有多个可用的响应，客户端可以选择其中一个。
- **301 Moved Permanently**：请求的资源已永久移动到新位置，客户端应使用新的 URL。
- **302 Found (临时重定向)**：请求的资源暂时移动到新位置，客户端应使用新的 URL，但后续请求仍应使用原始 URL。
- **303 See Other**：服务器建议客户端使用 GET 方法访问另一个 URL。
- **304 Not Modified**：资源未修改，客户端可以使用缓存版本。
- **307 Temporary Redirect**：请求的资源暂时移动到新位置，客户端应使用新的 URL，但方法和主体不应改变。
- **308 Permanent Redirect**：请求的资源已永久移动到新位置，客户端应使用新的 URL，类似于 301，但方法和主体不应改变。

4. **4xx - 客户端错误**

这些状态码表示请求中有错误，可能是由于客户端提供的信息不正确或无效。

- **400 Bad Request**：服务器无法理解请求，可能是由于语法错误。
- **401 Unauthorized**：请求需要身份验证，客户端应提供有效的认证信息。
- **403 Forbidden**：服务器理解请求，但拒绝执行，通常是因为权限不足。
- **404 Not Found**：服务器找不到请求的资源。
- **405 Method Not Allowed**：请求方法不被允许，服务器不允许使用该方法访问资源。
- **408 Request Timeout**：服务器等待客户端发送请求的时间过长。
- **409 Conflict**：请求冲突，通常是因为资源已被修改或存在版本冲突。
- **410 Gone**：请求的资源已永久删除，不再可用。
- **413 Payload Too Large**：请求实体太大，服务器拒绝处理。
- **414 URI Too Long**：请求的 URI 太长，服务器无法处理。
- **415 Unsupported Media Type**：请求的内容类型不受支持。
- **422 Unprocessable Entity**：请求格式正确，但服务器无法处理其中的指令（例如，提交的数据无效）。
- **429 Too Many Requests**：客户端发送的请求过多，触发了速率限制。

5. **5xx - 服务器错误**

这些状态码表示服务器在处理请求时发生了错误，通常是服务器端的问题。

- **500 Internal Server Error**：服务器遇到意外情况，无法完成请求。
- **501 Not Implemented**：服务器不支持请求的方法或功能。
- **502 Bad Gateway**：服务器作为网关或代理，从上游服务器收到了无效的响应。
- **503 Service Unavailable**：服务器暂时无法处理请求，可能是由于过载或维护。
- **504 Gateway Timeout**：服务器作为网关或代理，未能及时从上游服务器获得响应。
- **505 HTTP Version Not Supported**：服务器不支持请求中使用的 HTTP 版本。

其他常见状态码

- **451 Unavailable For Legal Reasons**：请求的资源因法律原因不可用，通常与版权或政府审查有关。

### **从浏览器输入url后都经历了什么？**

1. **解析URL**：浏览器解析 URL，确定协议、主机名、端口和路径。
2. **DNS 查询**：将主机名转换为 IP 地址（如果需要）。
3. **建立连接**：与服务器建立 TCP 连接。如果是 HTTPS，还会进行 TLS 握手以确保安全通信。
4. **发送请求**：通过 HTTP/HTTPS 向服务器发送 GET 请求。
5. **接收响应**：服务器处理请求并返回 HTML 内容及状态码。
6. **解析HTML**：浏览器解析 HTML，构建 DOM 树，并识别外部资源（如 CSS、JavaScript 和图片）。
7. **加载资源**：异步或同步加载页面中引用的外部资源。
8. **渲染页面**：根据 DOM 和 CSSOM 构建渲染树，计算布局并绘制页面到屏幕上。
9. **执行JavaScript**：运行页面中的 JavaScript 代码，可能修改 DOM 或发起进一步的请求。
10. **用户交互**：页面加载完成后，用户可以与页面进行交互，浏览器响应用户的操作。

### TCP协议和HTTP 协议

TCP协议在建立过程中会进行三次握手四次挥手，三次握手确保双方同步并避免无效连接，四次挥手则正常终止连接或异常终止连接。

```js
HTTP协议是超文本传输协议（Hyper Text Transfer Protocol），是用于从万维网服务器传输超文本到本地浏览器的传送协议。HTTP是一个基于TCP/IP通信协议来传递数据的。
```

### HTTP与HTTPS有什么区别？

HTTP协议传输的数据都是未加密的，也就是明文的，因此使用HTTP协议传输隐私信息非常不安全，为了保证这些隐私数据能加密传输，于是网景公司设计了SSL（Secure Sockets Layer）协议用于对HTTP协议传输的数据进行加密，从而就诞生了HTTPS。

### 如何解决前端跨域问题？

JSONP跨域，CORS，nginx代理跨域，nodejs中间件代理跨域，WebSocket协议跨域

###  WebSocket和webwork

WebSocket作用是即使通信双向通信，webwork是多进程的。

## 性能优化

- 异步组件：对于较大的组件，可以使用异步组件进行延迟加载，提高页面加载速度。

- 列表性能优化：对于大数据列表，使用虚拟滚动或分页加载来减少渲染的数据量。
- 图片优化：使用适当的图片压缩和懒加载，并提供多种分辨率的图片，以避免不必要的网络负载。
- 组件懒加载：将页面按需加载，只加载当前视图所需的组件，减少首次加载的体积和渲染时间。
- 减少重绘和回流：合理使用CSS样式，避免频繁的DOM操作，以减少页面的重绘和回流。
- 接口过慢：后端优化接口，分段式请求接口，对加载过慢的接口做过度动画提升用户体验。
- 使用浏览器缓存：在合适的情况下，使用浏览器缓存可以显著减少请求时间，提高页面加载速度。

## Webpack是什么？

- Webpack是一个模块打包工具，可以使用它管理项目中的模块依赖，并编译输出模块所需的静态文件。
- 它可以很好地管理、打包开发中所用到的HTML,CSS,JavaScript和静态文件（图片，字体）等，让开发更高效。
- 对于不同类型的依赖，Webpack有对应的模块加载器，而且会分析模块间的依赖关系，最后合并生成优化的静态资源。

## Webpack的基本功能？

- 代码转换：TypeScript 编译成 JavaScript、SCSS 编译成 CSS 等等

- 文件优化：压缩 JavaScript、CSS、HTML 代码，压缩合并图片等

- 代码分割：提取多个页面的公共代码、提取首屏不需要执行部分的代码让其异步加载

- 模块合并：在采用模块化的项目有很多模块和文件，需要构建功能把模块分类合并成一个文件

- 自动刷新：监听本地源代码的变化，自动构建，刷新浏览器

- 代码校验：在代码被提交到仓库前需要检测代码是否符合规范，以及单元测试是否通过

- 自动发布：更新完代码后，自动构建出线上发布代码并传输给发布系统。


## HTML&&CSS

###   盒模型和怪异盒模型

- 标准盒模型，总宽度 = width + border(左右) + padding（左右）+ margin（左右）；高度同理。

- 怪异盒模型（IE盒模型），总宽度 = width + margin（左右）；高度同理。

### 让一个元素水平/垂直居中

1. 水平居中 text-align: center;

2. 垂直居中 margin 实现自适应居中 通过位移 transform 实现 设置 line-height 等于 height align-items: center;

3. 对于宽度未知的块级元素 flex 布局 dispaly:flex;justify-content: center;align-item:center 绝对定位和 transform 实现， translateX 可以移动本身元素的50%

### flex:1 到底代表什么 

是一个简写方式，相当于同时设置了 `flex-grow: 1`、`flex-shrink: 1`、`flex-basis: 0` 这三个属性。满足项目的自适应需求。

## 算法题

### 回溯算法

**数组arr[1,2,3] 输出结果[1, 2, 3] [1, 3, 2] [2, 1, 3] [2, 3, 1] [3, 1, 2] [3, 2, 1]**

1. permute 函数: 这是主函数，接受一个数组 arr，生成其所有排列组合。

2. backtrack 函数: 用于递归生成排列。

- 当 remaining 数组为空时，表示生成了一个完整排列，将其添加到 result。

- 遍历 remaining 数组中的每个元素，将当前元素加入到路径 path 中，并递归调用 backtrack 生成剩余元素的排列。

- 回溯：递归返回后，将最后添加的元素移出 path，以便继续生成其他排列。

  ```javascript
  示例输出: console.log(permutations); 将会输出所有排列结果：
  
  function permute(arr) {
    const result = [];
  
    function backtrack(path, remaining) {
      if (remaining.length === 0) {
        result.push([...path]); // 生成一个排列并添加到结果中
        return;
      }
  
      for (let i = 0; i < remaining.length; i++) {
        path.push(remaining[i]);                                 // 选择一个元素
        backtrack(path, remaining.slice(0, i).concat(remaining.slice(i + 1))); // 递归处理剩余元素
        path.pop();                                              // 撤销选择，进行回溯
      }
  }
  
    backtrack([], arr);
    return result;
  }
  
  // 示例用法
  const arr = [1, 2, 3];
  const permutations = permute(arr);
  console.log(permutations);
  ```

