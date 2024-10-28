# 什么是socket.io？
Socket.IO 是一个用于实现实时双向通信的库，它主要基于 WebSocket 协议，同时也提供了更高的抽象级别和更好的兼容性支持。

**核心功能：**
1. 实时通信：`Socket.IO `允许服务器和客户端之间进行实时数据交换。
2. 跨平台支持：它不仅支持浏览器环境，还可以用于 `Node.js` 服务器端和其他支持 WebSocket 的环境。
3. 自动重连：当连接断开时，`Socket.IO` 会尝试重新建立连接。
4. 事件驱动：通信基于事件，允许发送和监听特定事件。

**协议支持：**
WebSocket：这是 `Socket.IO` 的首选协议，因为它提供了最高效的双向通信。
Fallback 机制：在不支持 `WebSocket` 的环境中，`Socket.IO` 会自动退回到其他可行的方案，如 AJAX 长轮询、`Flash` `Sockets` 等，以保证兼容性。

**实现原理：**
- `engine.io`：Socket.IO 底层使用了一个叫做 engine.io 的库，这个库负责建立和管理连接，处理数据传输。
- 二进制数据支持：Socket.IO 支持发送二进制数据，这对于传输图像或视频等多媒体内容非常有用。

**应用场景：**
- 实时聊天应用：如在线聊天室、即时通讯软件。
- 在线协作工具：如共享文档编辑器。
- 游戏开发：实时多人在线游戏。
- 实时数据展示：如股票市场数据更新、物联网设备监控。

**开发便捷性：**
- 统一接口：Socket.IO 提供了一个统一的 API 接口，使得开发者可以在客户端和服务端使用相同的模式进行通信。
- 社区支持：由于 Socket.IO 的流行，有大量的社区资源和插件可供使用。

## websocket和socket.io 的区别
websocket和socket.io 都是客户端和服务端建立TCP双向通信的技术。
他们两个的区别在于前者技术更早，一些方法如广播需要自己进行封装。而后者是已经进行封装过的成熟技术。开发者可以直接使用文档中的各种api。

## 聊天室

### Web端（Vue3）
web端引入 socket.io-client库，只是socket.io 专门为客户端适配的JS库，

```vue
<script setup>
import io from 'socket.io-client'
import {reactive, ref, onMounted} from "vue";
import {useRouter} from "vue-router";
import {ElMessage} from "element-plus";
import {
  ChatRound
} from '@element-plus/icons-vue'
import userStore from "../../store/user.js";

const router = useRouter()
const user = userStore()
const socket = io('ws://localhost:3001')
const emojis = ref(['😂', '🙏', '😄', '😏', '😇', '😅', '😌', '😘', '😍', '🤓', '😜', '😎', '😊', '😳', '🙄', '😱', '😒', '😔', '😷', '👿', '🤗', '😩', '😤', '😣', '😰', '😴', '😬', '😭', '👻', '👍', '✌️', '👉', '👀', '🐶', '🐷', '😹', '⚡️', '🔥', '🌈', '🍏', '⚽️', '❤️', '🇨🇳'])
const input = ref('')
const chatContainer = ref(null);
const form = JSON.parse(sessionStorage.getItem('userInfo'))

// 滚动到底部的函数
function scrollToBottom() {
}

// 获取用户列表
const userList = ref([])
socket.on('userList', function (data) {
  userList.value = data
})

// --------------------------------------------------------------------------
// 公共列表数据
const AllMsg = ref([])

// 本人数据
const msgArray = ref([])
socket.on('send', function (msg) {
  // 收集服务端传来的本人的消息数据
  msgArray.value.push(msg)
  AllMsg.value.push(msg)
})

// 其他人数据
const otherArray = ref([])
socket.on('other', function (msg) {
  if (msg.username === form.username) {
    return
  }
  AllMsg.value.push(msg)
  otherArray.value.push(msg)
})

// 进入群数据
const newUser = ref([])
socket.on('new-user', function (msg) {
  newUser.value.push(msg)
  AllMsg.value.push(msg)
})

// ------------------------------------------------------------------------------
// 点击发送按钮
const handleSend = () => {
  if (!form || !user.userInfo) {
    ElMessage({
      message: '请求超时，请重新登录！',
      type: 'error'
    })
    router.push('/login')
    return
  }
  if (!input.value) {
    ElMessage({
      message: '请输入内容',
      type: 'error'
    })
    return
  }
  // 把数据传给服务端
  socket.emit('my_message', {
    ...form,
    content: input.value,
    time: new Date().toLocaleString()
  })
  input.value = ''
  scrollToBottom()
}

// 添加表情包
const handleEmoji = (e) => {
  input.value += e.target.innerText
}
</script>

```

### Server端（node.js）
后端使用的依赖是 socket.io .
socket.io 的使用方法是先创建io实例。然后建立‘connection’事件，在第二个参数 回调函数里面双向传输数据
1. socket.on(事件,回调函数)  注册自定义事件，主要用于接收数据。
2. socket.emit(事件，【数组，集合，字符串。。。】)  触发自定义事件，主要用于传输数据。
3. io.emit(事件，【数组，集合，字符串。。。】)  触发自定义事件，所有用户都可以凭借socket.on()接收数据。

```javascript
const {createServer} = require("http");
const {Server} = require("socket.io");
const httpServer = createServer((req, res) => {
res.end("hello world")
});
// 存储所有用户信息
const userList = [];

// 解决同源跨域问题
const io = new Server(httpServer, {
cors: {
origin: "*",
methods: ["GET", "POST"]
}
});

// 监听客户端连接事件
// 1. socket表示连接到客户端的socket对象
// 2. io表示整个Web服务
// 3. socket.on 表示注册某个事件
// 4. socket.emit 表示触发事件
io.on('connection', socket => {

    //  监听客户端发送的消息
    /*
    * params1：事件名任意
    * params2：接收到的数据
    * */
    socket.on('my_message', data => {
        socket.emit('send', data); // 浏览器注册send事件 触发send事件
        io.emit('other', data)
    })

    // 注册登录事件
    socket.on('login', data => {
//         判断用户是否已经登录
const isLogin = userList.find(item => item.username === data.username);
if (isLogin) {
socket.emit('res_login', {
code: 1,
msg: '用户名已存在'
})
} else {
userList.push(data)
socket.emit('res_login', {
code: 0,
msg: '登录成功'
})
io.emit('new-user', {
message: `${data.username} 加入群聊`
})
}
console.log(userList)
})

    // 给所有用户广播用户列表数据
    io.emit('userList', userList)
    
    // 监听用户断开连接
    socket.on('disconnect', () => {
    // 把当前用户从用户表删除
    // 告诉所有人该用户退出群聊
    // 更新用户列表
    const index = userList.findIndex(item => item.username === socket.username)
    userList.splice(index, 1)
    io.emit('userList', userList)
    io.emit('new-user', {
        message: `${socket.username} 退出群聊`
    })
})
});


httpServer.listen(3001, () => console.log('服务器启动成功'));
```
## socket.io实现一对一聊天

### server端
```javascript
const express = require('express')
const app = express()
const { Server } = require('socket.io')

// 创建io 实例
const io = new Server(3000, {
cors: {
// 允许跨域
// origin: 'http://localhost:8080' 允许8080端口访问
origin: '*'
},
})

// 存储用户信息
/*
格式:[
{username:'xxx',id:'xxx'},
{username:'xxx',id:'xxx'}
]
*/
const userList = []

// 连接事件
io.on('connection', (socket) => {
// web端传递query参数，server端获取并保存
const username = socket.handshake.query.username
if (!username) return

    const userInfo = userList.find(item => item.username === username)
    if (userInfo) {
        // 由于socket.id是动态的，所以需要更新
        userInfo.id = socket.id
    } else {
        // 添加新用户
        userList.push({
            username,
            id: socket.id
        })
    }

    // console.log(userList)
    // 广播在线用户列表
    io.emit("online", {
        userList
    })

    // 注册消息列表事件
    socket.on('sendMsg', ({ fromUsername, targetId, msg }) => {
        /*
            fromUsername:发送消息的用户名
            targetId:接收消息的用户id
            msg:消息内容
        */
        // console.log('sendMsg', fromUsername, targetId, msg)
        const targetSocket = io.sockets.sockets.get(targetId)
        // targetSocket 是一对一聊天的目标实例

        const toUsername = userList.find(item => item.id === targetId)
        // 找到目标用户名称

        targetSocket?.emit('receiveMsg', {
            fromUsername: fromUsername,
            toUsername: toUsername.username,
            time: new Date().getTime(),
            content: msg
        })
        // 发送消息给目标用户
    })
})

app.listen(8000, () => {
console.log('服务器启动成功');
})
```

### web端

```vue
<template>
  <div>
    <ul>
      <template v-for="item in state.userList" :key="item.id">
        <li v-if="item.username === state.username">{{ item.username }}</li>
        <li v-else><a
            href="javascript:;"
            @click="handleSelect(item)"
        >{{ item.username }}</a></li>
      </template>
    </ul>
    <div v-if="state.targetUser">
      <h3>{{ state.targetUser.username }}</h3>
      <div>
        <input
            type="text"
            v-model="state.myText"
            placeholder="写点什么吧">
        <button
            @click="SendMsg"
        >send
        </button>
      </div>
    </div>

    <div>
      <div v-for="(item,index) in messageList" :key="index">
        <div v-if="item.fromUsername === state.username">
          <span style="background: red">{{ item.fromUsername }}</span>
          <br>
          <span style="background: red">{{ item.content }}</span>
        </div>
        <div v-else>
          <span style="background: green">{{ item.fromUsername }}</span>
          <br>
          <span style="background: green">{{ item.content }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import {io} from "socket.io-client"
import {useRouter} from "vue-router";
import {reactive,computed} from "vue";

const router = useRouter()
const state = reactive({
// 当前用户名
username: router.currentRoute.value.query.username,
// 用户列表 包含username,id
userList: [],
// 选中的当前聊天对象 {username,id}
targetUser: null,
// 输入框内容
myText: '',
// 消息列表 {username:[{fromUsername,toUsername,time,content}]}
messageBox: {}
})
console.log(state.username)
const socket = io("http://localhost:3000", {
query: {
// 向server端发送当前用户名
username: state.username
}
})

socket.on('online', (data) => {
// 更新用户列表
state.userList = data.userList
// console.log(data)
})

const handleSelect = (item) => {
// 更新当前聊天对象
state.targetUser = item
// console.log(item)
}

// 发送消息
const SendMsg = () => {
if (state.myText.length === 0) return

appendMessage({
fromUsername: state.username,
toUsername: state.targetUser.username,
time: new Date().getTime(),
content: state.myText
})

socket.emit('sendMsg', {
fromUsername: state.username,
targetId: state.targetUser.id,
msg: state.myText
})
state.myText = ''
}

// 接收消息
socket.on('receiveMsg', (data) => {
appendMessage(data)
})

// 过滤掉第三方发送的消息
const messageList = computed(() => {
// 只有当聊天对象存在，和消息盒子里面有消息时才显示消息
return (state.messageBox[state.username] && state.targetUser) ?
state.messageBox[state.username].filter(item => {
// 只保留当前聊天对象双方的消息
return item.fromUsername === state.targetUser.username || item.toUsername === state.targetUser.username
}) : [];
})

// 封装高度复用的方法
function appendMessage(data) {
// 初始化消息盒子 避免undefined
!state.messageBox[state.username] && (state.messageBox[state.username] = []);
// 向消息队列push 消息集合
state.messageBox[state.username].push(data)
}

socket.on('err', (err) => {
console.error(err)
})

</script>
```
