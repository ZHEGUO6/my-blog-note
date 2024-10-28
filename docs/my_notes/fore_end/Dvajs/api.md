# Dva.js

> 1. Dva.js简介
>
>    Dva.js 是一个基于 Redux、React 和中间件（middleware）的前端应用框架。它简化了 Redux + React 应用程序的开发流程，提供了更简洁的数据流管理方式。除此之外，Dva还内置了react-router和fetch等API，Dva.js 是由阿里巴巴前端团队开发并维护的。
>
> 2. 主要特点
>    **简洁**: 使用装饰器和更少的样板代码来定义模型、视图和控制器。
>    **模块化**: 应用程序可以被拆分成多个小的、可重用的模块。
>    **易集成:** 能够轻松地与其他库或工具（如Redux中间件）集成。
>
> 3. 核心概念
>    **Model**: 定义状态、效果和视图更新逻辑的地方。
>    **View:** 使用React组件来构建UI。
>    **Effect**: 处理异步操作，如API调用。
>    **Reducer**: 更新状态的方法。
>
> 4. 适用场景
>    适合构建大型单页应用（**SPA**），特别是那些需要处理复杂状态管理和异步操作的应用。



## 快速上手

1. 全局安装，并确保版本是`0.9.1`以上

   `npm install dva-cli -g`

   `dva -v`

2. 创建项目

   `dva new [项目名称]`

3. 打开项目

​      `npm start`

## 路由

路径：`src/router.js`

```js
import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'dva/router';
// 哈希模式 {HashRouter as Router}
import App from './routes/App';
import Films from "./routes/component/Films";
import Cinema from './routes/component/Cinema'
import Center from './routes/component/Center'

function RouterConfig({history}) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" render={() => {
          return <App>
            {/*插槽 App组件内使用{this.props.children}*/}
            	// 一级路由    
            <Route path="/films" component={Films}/>
            <Route path="/cinema" component={Cinema}/>
            <Route path="/center" component={Center}/>
                // 重定向
            <Redirect from="/" to="/films"/>
          </App>
        }}/>
      </Switch>
    </Router>
  );
}

export default RouterConfig;

```

## 自定义组件

路径：`/src/components/Tabbar/index.js`

```js
import React, {Component} from 'react';
import {NavLink} from 'dva/router'
// 引入样式 使用时style.xxx
import style from './index.css'
class Index extends Component {
  render() {
    return (
      <footer>
        <ul>
          <li>
            <NavLink to="/films" activeClassName={style.active}>电影</NavLink>
          </li>
          <li>
            <NavLink to="/cinema" activeClassName={style.active}>影院</NavLink>
          </li>
          <li>
            <NavLink to="/center" activeClassName={style.active}>我的</NavLink>
          </li>
        </ul>
      </footer>
    );
  }
}

export default Index;
```

路由传参与接收参数

```js
// 第一步设置动态路由
<Route path="/detail/:id" component={Detail}/>
```

```js
// 第二步传递参数this.props.history.push(`xxx`)
 {
     this.state.datalist.map(item => (
         <div key={item.filmId} onClick={()=>{
         this.props.history.push(`/detail/${item.filmId}`)
     }}>
         <img src={item.poster} style={{width: '200px'}} alt=""/>
             <p>{item.name}</p>
    </div>
    ))
}
```

```js
// 第三步接收参数
这里是详情页{this.props.match.params.id}
```

## 路由守卫

使用三目运算，有token就跳转指定组件，否则重定向到登录页

```js
  <Route path="/center" render={() => localStorage.getItem("token") ? <Center/> : <Redirect to="/login"/>}/>
```

## 使用reducer



### 1. 注册model

```js
// 一定要引入，否则不会注册到store中
// 路径：src/index.js
app.model(require('./models/maizuo').default);
```

### 2. 创建状态管理文件

```js
// 路径：src/models/maizuo.js
export default {
	// 必须命名，以便于区分
  namespace: 'maizuo',

  state: {
    isShow: true,
  },
  // 同步更新状态的方法
  reducers: {
    hide(state, action) {
      return {...state, isShow: false};
    },
    show(state, action) {
      return {...state, isShow: true};
    },
  }
};
```

### 3. 使用高阶组件引入state数据

```js
import React, {Component} from 'react';
import TabBar from "../components/Tabbar";
import style from './IndexPage.css'
import {connect} from "dva";

class App extends Component {
  componentDidMount() {
    // 拿到 store中的isShow数据
    console.log(this.props.isShow)
  }

  render() {
    return (
      <div style={{width:'100%', height:'100%',position:'relative'}}>
        {this.props.isShow && <TabBar/>}
        <div className={style.app}>
          App
          {/*插槽*/}
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default connect((state)=>{
  return {
    // 导出isShow数据
    isShow:state.maizuo.isShow
  }
})(App);
```

### 4. 使用同步方法更新state数据

```js
import React, {Component} from 'react';
import {connect} from "dva";

class Detail extends Component {
  componentDidMount() {
    // console.log(this.props)

    // 进入组件时隐藏
    this.props.dispatch({
       // 调用对应命名文件的方法
      type: 'maizuo/hide'
    })
  }

  componentWillUnmount() {
    // 离开时候显示
    this.props.dispatch({
      type: 'maizuo/show'
    })
  }

  render() {
    return (
      <div>
        {/*接收路由参数*/}
        这里是详情页{this.props.match.params.id}
      </div>
    );
  }
}

export default connect()(Detail);
```

### 5. 使用异步方法请求数据

```js
//1. 组件内部生命周期钩子函数触发函数
componentDidMount() {
    if (!this.props.list.length){
      this.props.dispatch({
        type: 'maizuo/getCinemaList'
      })
    }else {
      console.log('已缓存')
    }
  }

//2. store 异步请求数据
// 异步 reducx-saga 的调用
  effects: {
    * getCinemaList(action, {call, put}) {  // eslint-disable-line
      const res = yield call(getCinemaListService);
      // console.log(res.data.data.cinemas)
      yield put({type: 'changeCinemaList', payload: res.data.data.cinemas});
    },
  },
      
 //3. 请求函数
 // 路径：/src/services/maizuo.js
import request from '../utils/request';

export function getCinemaListService() {
  return request('https://m.maizuo.com/gateway?cityId=310100&ticketFlag=1&k=3732719', {
    headers: {
      'x-client-info':
        '{"a":"3000","ch":"1002","v":"5.2.1","e":"172786906113459379533643777","bc":"310100"}',
      'x-host':
        'mall.film-ticket.cinema.list'
    }
  });
}
//4. reducers里面添加同步函数
changeCinemaList(state, action) {
    return {...state, list: action.payload};
}

//5. 组件里面请求渲染数据
<ul style={{listStyle: 'none',height: 'auto'}}>
    {this.props.list.map(item => (
     <li key={item.cinemaId}>{item.name}</li>
))}
</ul>
```

### 6. 配置反向代理

```json
// 解决跨域问题
{
    "proxy":{
        "/api":{
        "target":"https://i.maoyang.com",
        "changeOrigin":true
        }
    }
}
```

## mock服务

```js
// 路径：/mock/user.js
export default {
  'GET /users': [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    }
  ],
  'POST /login/account': (req, res) => {
    const { password, userName } = req.body;
    if (password === 'ant.design' && userName === 'admin') {
      res.send({
        status: 'ok',
        code: 0,
        type: 'account',
        currentAuthority: 'admin',
      });
    }else {
      res.send({
        status: 'error',
        code: 403,
        type: 'account',
        currentAuthority: 'guest',
      });
    }
  },
}

// 路径：/roadhogrc.mock.js
import users from './mock/user'

export default {
  ...users
};
```

