# `Vue2`

- `Vuex` 中管理公共状态，分散在各个组件内的状态，统一管理

**注意！！！**

1. `vuex` 默认是管理在内存，一刷新页面，公共状态就丢失
2. `vuex` 持久化-`todo`

### `vuex` 项目应用

1. 非父子通信
2. 后端数据的缓存快照，减少重复数据请求，减轻服务器压力，提高用户体验。

```javascript
// vue2 选项式写法中引入vuex
// 不需要导入js文件，直接用$引用
this.$store.state// 拿到vuex state中的状态数据
this.$store.commit(-mutations内方法名-,-传参-)// mutations 提交参数修改state状态
this.$store.dispatch('getCinemaData',this.$store.state.cityId)//分发 触发getCinemaData函数
export default new Vuex.Store({
    state:{
		cityId:"???",
        cityName:'??',
        cinemaList:[]
    },
    // 统一管理。被 devtools 记录状态的修改
    // mutations 只能支持同步
    mutations:{
        changeCityName(state,cityName){
            state.cityName = cityName
        },
        changeCityId(state,cityId){
            state.cityId = cityId
        },
        changeCienmaData(state,data){
            state.cinemaList = data
        }
    }，
    // 支持异步和同步请求 axios fetch ajax
    actions:{
    getCinemaData(store,cityId){
    	// axios fetch ajax 发请求
       return axios.get(`?????cityId=${cityId}`).then(res=>{
         // cityId 通过id 筛选影院数据 让mutations 修改 state 数据 
	store.commit('changeCienmaData',res.data.data.cinemas)
        })
     }
  }
})


// 防止 mounted生命周期 一刷新就重复发请求的解决方法
 if(this.$store.state.cinemaList === 0){
     this.$store.dispatch('getCinemaData',
                          this.$store.state.cityId).then(res=>{
			console.log("数据请求完毕")
         // 这里可以写一些 只有数据请求回来之后才能渲染页面的函数(异步函数)
     })
 }

```



### 搜索影院组件

```javascript
// 表单模糊查询

computed:{
    computedList(){
        // 根据用户输入 渲染 name address 对应的数据
        return this.$store.state.cinameList.filter(item=>item.name.toUpperCase().includes(this.value.toUpperCase()) || item.address.toUpperCase().includes(this.value.toUpper))
    }
}

this.$router.back()// 返回上一个窗口
```



### `vuex` 新语法

```javascript
// 使用 mapState(['cinemaList']) 新语法 在组件中调用状态数据
import { mapState,mapActions,mapMutations } from 'vuex'
computed:{
    // 切割State中单独的状态
    ...mapState(['cinemaList']) // === {cinemaList:function}
    ...mapState(['cinemaList','cityId'])
    // 这里的 function 返回一个数组
    /* mapState(['cinemaList']) 就相当于给一个定义一个 key名为 cinemaList 键值为 返回cinemaList数组的回调函数
    	computed:{
    		cinemaList:function(){
    		    return this.$store.state.cinemaList
    		}
    	}
    */
},
    methods:{
       // 在这里使用 Store 里面的数据 可以简写 		  this.$store.state.cinemaList => this.cinemaList
    }

```



### 混入对象 `mixins`

```javascript
// mixins 混入对象
// 可以单独存放在一个 js 文件内，需要的时候导入组件内即可
var obj = {
    created(){
        this.$store.commit('hide')// 进入页面隐藏底部菜单
    },
    destroyed(){
        this.$store.commit('show')// 退出页面显示底部菜单
    }，
    methods:{
    	a(){
            console.log("aaaaa")
     }// 使用mixins不会被覆盖，使用...展开运算符会被覆盖掉
}
}

export default{
    mixins:[obj],// 混入对象，相当于在外部定义生命周期或者方法，引入到组件内部使用，跟定义在内部没啥区别
    data(){
        return{
            
        }
    },
    .....
}

//mixins的特点：混入对象时比较智能，如果key值相同，那么会查找对象里面的方法，如果方法相同，保留其中一个，方法不同，都会保留下来，不会被覆盖掉。
// mixins更适合vue开发时混入生命周期和方法（methods），计算属性等函数对象。

//...展开运算符的特点：在展开对象时，如果key值相同，后面的会覆盖掉前面的，不管对象里面的方法是否相同，只会保留后面对象的方法。

```



### `Vuex` 持久化

```JavaScript
// vuex-persistedstate插件

// 使用 下载 cnpm i --save vuex-persistedstate
// store/index.js

// 在vue3中使用
    import { createStore } from "vuex";
    import createPersistedState from "vuex-persistedstate";

    const store = createStore({
      // ...
      plugins: [createPersistedState()],
    });

// 在vue2中使用
    import Vuex from "vuex";
    import createPersistedState from "vuex-persistedstate";

    const store = new Vuex.Store({
      // ...
      storage:window.sessionStorage,// 默认是Localstorage
      plugins: [createPersistedState()],
        // 默认是存储全部状态数据，可以使用reducer方法指定存储状态
        reducer:(state)=>{
            return {
                cityId:state.cityId,
                cityName:state.cityName
            }
        }
    });
```



# **git 工具**



## git 工具引用

```javascript
// svn 是集中式代码管理工具
// git 是分布式代码管理工具
```



## git 本地仓库

1. `git init`  **初始化本地仓库**
2. `git add hello.html`  **把代码添加到暂存区**
3. `git add .`  **把文件夹内所有文件添加到暂存区**
4. `git status`  **查看git此时提交状态**。
5. `git commit -m`  *注释* `'第一次提交代码'`   **提交到本地仓库**
6. `git log`  **查看提交记录**
7. `git reset --hard HEAD^`  **回退一个版本** `HEAD~1，HEAD~2`
8. `git reflog`  **记录操作记录**
9. `git reset --hard 六位版本号`  **撤回回退操作**
10.  `git pull --rebase origin master`  **如果远程仓库内有md文件与本地造成冲突，可使用。**

```git
// git remote add origin https://gitee.com/li-guozhe/test2024.git  创建远程仓库源
// git push -u origin "master" 把数据推到 远程仓库源 master 分支
```

1. `git clone https://gitee.com/li-guozhe/test2024.git`  **克隆代码到本地。**
2. `git pull` **拉取修改之后的代码**
    - 最好每次上传代码之前拉一下，防止别人修改完远程仓库之后，你的本地仓库没有对应的内容，push失败。

3. `git remote rm origin`  **删除远程仓库**
4. `git remote add origin https://gitee.com/li-guozhe/test2024.git`  **创建远程仓库**
5. `git push -u origin "master"` **把数据传送到远程仓库**

注意：`git pull` 之前一定要保存代码到本地仓库。防止代码被覆盖掉。



## 多人协作方式

###       git分支

1. ###### `git checkout -b devzheguo`  创建`devzheguo`分支，并切换

2. ###### `git branch -a`    查询分支

3. ###### `git checkout master`  切换 **master** 分支

// 分支与分支之间相互独立，修改文件不会显示在另一条分支内。

4. ###### `git push origin :devzheguo`  删除远程分支

5. ###### `git branch -d devzheguo`  删除本地分支



## 开发流程和云服务器

##### - nginx服务器

```javascript
// 配置文件  /conf 文件夹 /nginx.conf文件
server {
    listen       80;
    server_name  localhost;
    
    
    location / {
        root   dist;
        index  index.html index.htm;
    }
    
    error_page  404           /404.html
    
    .....
}

// .\nginx.exe  -c .\conf\kerwin.conf

// nginx: [emerg] bind() to 0.0.0.0:80 failed (10013: An attempt was made to access a socket in a way forbidden by its access permissions)
// 这个错误说明80端口号被占用，换别的端口号就可以了。
```



# `Vue3`

##     项目创建

```javascript

//vue2
	// 创建main.js 文件
        import Vue from 'vue'
        import App from 'App.vue'
        import router from './router'
        import store from './store'

        Vue.config.productionTip = false
        new Vue({
            router,
            store,
            render:h=> h(App)
        }).$mount('#app')

	//创建 /router/index.js
        import Vue from 'vue'
        import VueRouter from 'vue-router'
        import Home from '../view/Home.vue'
        Vue.use(VueRouter)
        const routes = [{
                path:"/",
                name:'Home',
                component:Home 
            }]
        export default new VueRouter({
            routes
        })

// Vue3
	// 创建main.js 文件
        import {createApp} from 'vue'
        import App from 'App.vue'
        import router from './router'
        import store from './store'

        createApp(App)
        .use(router)// 注册路由插件
        .use(store) // 注册vuex插件
        .mount('#app')

	// 创建 /router/index.js
        import {createRouter,createWebHashHistory}from 'vue-router'
        import Home from '../view/Home.vue'

        const routes = [
            // 给组件添加路径
            {
                path:"/",
                name:'Home',
                component:Home ,
                name:'Home',// 命名路由
                children:{
                    {
                    path:'Home/one',
                    component:One
               		},
                    {
					......
                    }
                         }
            },
            {	// 匹配重定向
                path:'/',
                redirect:{
                    name:'Home'
                }
            }
        ]
        const store = createRouter({
            history:createWebHashHistory(),//# hash模式
            history:createWebHistory(),// ‘/’ history模式
            routes
        })
        export default store
```



## 引用 `Vuex`

```javascript
// vue2
	import Vue from 'vuex'
    import Vuex from 'vuex'
    Vue.use(Vuex)
    export default new Vuex.Store({
        state:{},
        multations:{},
        actions:{},
        modules:{}
    })

//vue3
	import {createStore}from 'vuex'
    export default createStore({
            state:{},
            multations:{},
            actions:{},
            modules:{}
        })
```



## reactive 详解

```javascript
// react
 1. 类写法
 2. 函数写法 (不支持状态，生命周期，支持属性)
	react hooks 勾住含函数写法的状态
    
    import {reactive} from 'vue'
    export default{
        // vue3老写法 代替了vue2中的 beforeCreate和Created生命周期
        setup(){
            console.log("在组件创建之前和创建时执行")
            // 定义状态 复杂数据类型(数组 集合之类 字符串，整数不可以定义)
            const obj = reactive({ // reactive可以定义多次
                name:"折果",
                age:20,
                location:"河北",
                datalist:[],
                mytext:'' // v-model 双向绑定
            })
            
            // 声明方法
            const handleClick=()=>{
                obj.name = 'xiaoming'
            }
            
            // 返回出去 组件内部才能使用该状态
            return{
                obj,
                handleClick 
            }
        }
    }
// 注意类写法 和 函数写法状态不能共用
// vue3 <template></template>支持多个根节点
```



## **ref** 详解

```JavaScript
// ref 支持复杂数据类型和简单数据类型

// 在vue2中 ref命令，既可以绑定dom节点，也可以绑定组件
<input type="text" ref="mytext" />
 // 在方法或者生命周期里面可以通过 this.$refs.mytext.value 拿到表单元素的value值
// 绑定组件的话
    <child ref="mychild"/>
        // child 组件里面的data数据
        data(){
            return{
                mytext:"111",
                datalist:[]
            }
    }
// 在父组件 拿到或者改变 子组件里面的状态数据
// this.$refs.mychild.mytext === 111


// 在vue3中 使用 ref 既可以绑定dom节点，也可以绑定组件
// 除此之外 在hooks写法中 ref 还有声明状态的作用
<input type="text" ref="mytext" />
    
import {ref} from 'vue'

setup(){
    // 初始化+绑定表单元素
    const mytext = ref()
    console.log(mytext.value) // 拿到表单元素节点
    console.log(mytext.value.value) // 拿到表单value值
    
    return {
        mytext
    }
}
------------------------------------------------------------
// 声明状态
setup(){
     const myname = ref("kerwin")  // {value:"kerwin"} 本质是一个集合
     // ref 的响应式原理是 拦截ref对象的 .value属性
    const datalist = ref(["aaa","ccc"])
    
    const handleAdd = () =>{
        datalist.value.push(myname.value)
    }
    return {
        myname,
        datalist,
        handleAdd
    }
}
```



## toRef 和 toRefs

```javascript
// reactive 和 ref 的相互转化
import {reactive,ref,toRef,toRefs} from 'vue'
setup(){
        const myname = ref("kerwin")  

        const datalist = ref(["aaa","ccc"])

        const handleAdd = () =>{
            datalist.value.push(myname.value)
        }

        const obj = reactive({ // reactive可以定义多次
                    name:"折果",
                    age:20,
                    location:"河北",
                    datalist:[],
                    mytext:'' // v-model 双向绑定
                })

        return {
            myname,
            datalist,
            handleAdd,
            ...toRefs(obj) // reactive对象 转化为 ref对象 在组件内直接使用
        }
}
```



## props&emit

```JavaScript
// 组件通信
// 父传子 props
// father.vue
<template>
    <div>
    	<child :myname="name" :myid="id" @event="change"/>
            // 子组件控制显示和隐藏
            <ul v-show="isShow">
            	<li>111111111</li>
			</ul>
    </div>
</template>
       
export default {
    // 注册组件
    components:{
        child
    },
    setup(){
        const name = ref("折果")
        const id = ref(10)
        const isShow = ref(true)
        const change = () =>{
            isShow.value = !isShow.value
        }
        return{
            name
        }
    }
}

// ---------------------------------------------------------
// 子组件 child.vue
<template>
    <div>
    	<button>left</button>
			{{myname}}
		<button>right</button>
		<button @click="handleShow">显示</button>
    </div>
</template>
       
export default {
    props:["myname","myid"],
    // 传参
    setup(props,{emit}){ // emit对象解构 赋值重名属性
        const name = ref("折果")
        console.log(props.myname,props.myid)
        const handleShow = () =>{
			emit("event",data) // 把点击事件传给上一层event事件  data是要传的数据
        }
        
        return{
            name
        }
    }
}
```



## 生命周期

```javascript
// vue2 选项式语法
	beforeCreate()
    created()
    beforeMount()
    mounted()
    beforeUpdate()
    updated()
    beforeDestroy()
    destroyed()
// vue3 选项式语法
	beforeCreate()
    created()
    beforeMount()
    mounted()
    beforeUpdate()
    updated()
    beforeUnmount()
    unmonted()
// vue3 组合式语法
	setup
    setup
    onBeforeMount()
    onMounted()
    onBeforeUpdate()
    onUpdated()
    onBeforeUnmount()
    onUnmounted()
```

```javascript
import axios from 'axios'
import {onMounted,onBeforeMount,ref} from 'vue'

setup(){
        const datalist = ref([])
        onMounted(()=>{
            // dom上树 axios 事件监听
            axios.get("//////").then(res=>{
                datalist.value = res.data.data
            })
            // 数据请求回来了
        })
    	
        onBeforeMount(()=>{
            // 页面渲染之前
            consloe.log("onBeforeMount")
        })
    
    return {
        datalist
    }
}
```



## 计算属性

```JavaScript
import {computed,ref,reactive} from 'vue'
setup(){
    // 模糊查询 函数式也行 testdatalist()
    const data = ref(["aaa","sss","adc","wds"])
    const computedList = computed(()=>{
		return data.value.filter(item = >item.includes(mytext.value))
    })
    
    // 计算属性占用缓存 相较于函数调用，性能优化
    return {
		computedList
    }
}
```



## watch 监听

```JavaScript
import {watch,reactive} from 'vue'
setup(){
    const obj = reactive({
        mytext:"",
        datalist:["aaa","sss","adc","wds"],
        oldlist:["aaa","sss","adc","wds"]
    })
    // 使用watch监听 实现模糊查询
    watch(()=>obj.mytext,()=>{
       obj.datalist =       obj.oldlist.filter(item=>item.includes(obj.mytext))
    })
    
    return{
        
    }
}
```



## 自定义hooks

```javascript
// 函数式编程 提高代码的复用性
// 复杂的请求逻辑放在外面单独的文件里面 组件内部只管显示就行
// 视图逻辑和业务逻辑分开

// vue组件
import {getData} from '...'
setup(){
    const obj1 = getData()
    
    return {
        obj1
    }
}

// js文件
function getData(){
	const obj1 = reactiv({
        list:[]
    })
    onMountend(()=>{
     	axios.get("  ").then(res =>{
            obj1.list = res.data.list
        })
    })
    
    return obj1
}

export {getData}
```



## `Vue3` 杀青

```javascript
// 路由
import {useRouter,useRoute} from 'vue-router'
import {store} from 'vuex'
setup(){
    const route = useRoute() // == this.$route
    const router = useRouter() // == this.$router
    const store = useStore() // == this.$store
    
    onMounted(()=>{
        store.commit("hide")
        console.log(route.params.id)
    })
    
    onUnmounted(()=>{
        store.commit("show")
    })
}
```

```javascript
// provide inject 依赖注入功能
// 组件通信 跨多级通信
import {provide,inject} from 'vue'

// 根组件
setup(){
    const isShow = ref(true)
    // 依赖注入
    provide("zzz",isShow)
    return{
        isShow
    }
}

// 下级组件
setup(){
    // 依赖接收
    const isShow = inject("zzz")
   
    onMounted(()=>{
        isShow.value = false
    })
} 
```
