# GraphQL



## 1. 介绍与hello

- GraphQL 是Facebook开发的一种查询语言，并于2015年公开发布，它是REST API的替代品。
- 官网：https://graphql.org/
- 中文网：http://graphql.cn/
- 特点：

1. 只请求你需要的数据。返回你需要的字段，自动筛选。
2. 获取多个资源，只用一个请求。
3. 描述所有可能类型的系统，便于维护，根据需求平滑演进，添加或隐藏字段。
   - restful风格接口只能返回一个资源，graphql一次可以获取多个资源。
   - restful用不同的URL来区分资源，graphql用类型来区分资源。

```
query{
	user(id:"1"){
        name
        gender
	employee(first:20){
		name
		email
	}
	father{
		telephone
	}
	son{
		school
	}
	}
}
```

## 2. 参数类型和传递

- **安装依赖**

```npm
npm install express
npm install express-graphql
npm install graphql
```

- **配置app.js**

```js
const express = require('express');
const { buildSchema } = require('graphql');
const graphqlHTTP = require('express-graphql');
require('dotenv').config();
// 定义query类型
const schema = buildSchema(`
    type User {
        name: String,
        age: Int,
        sex: String
    }

    type Film {
        id: Int,
        name: String,
        price: Float,
        image: String,
        type: String
    }

    type Query {
        hello: String,
        getName: String,
        age:Int,
        List: [String],
        Number:[Int],
        price:Float,
        user: User,
        getList:[Film],
        ListData(id:Int!): [Film],
    }
`);

let mock = [
    {
        id: 1,
        name: '大片1',
        price: 12.5,
        image: 'https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2510870877.webp',
        type: '动作片'
    },
    {
        id: 2,
        name: '大片2',
        price: 12.5,
        image: 'https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2510870877.webp',
    },
    {
        id: 3,
        name: '大片3',
        price: 12.5,
        image: 'https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2510870877.webp',
        type: '动作片'
    },
    {
        id: 4,
        name: '大片4',
        price: 12.5,
        image: 'https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2510870877.webp',
        type: '动作片'
    }

]
// 处理器，返回数据字段
const root = {
    hello: () => {
        return 'Hello world!';
    },
    getName: () => {
        return '折果';
    },
    age: () => {
        return 18;
    },
    List: () => {
        return ['折果', '折果', '折果'];
    },
    Number: () => {
        return [1, 2, 3];
    },
    price: () => {
        return 12.5;
    },
    user: () => {
        // 自定义类型
        return {
            name: '折果',
            age: 18,
            sex: '男'
        }
    },
    getList: () => {
        return mock;
    },
    ListData: (args) => {
        // args是参数对象
        return mock.filter(item => item.id === args.id)
    }
};
// 在app初始化之前定义完成
const app = express();
// 配置环境变量
const port = process.env.PORT

app.use('/home', (req, res) => {
    res.send('Hello World!');

});
// 注意不要在根路由上渲染数据，否则你会看不到graphiql调试器的
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true// 开启调试器
}));

app.listen(port, () => {
    console.log(`服务器已开启 网址==>>>> http://localhost:${port}`);
});
```

- 基本类型：String,Int,Float,Boolean和ID。可以在schema类型声明的时候使用。

- [类型]代表数组，例如：[Int]代表整型数组。

- 和js传递参数一样，小括号定义形参，但是要想ts一样标注参数类型。

- ！表示参数不能为空。

  ```js
  type Query{
      rollDice(numDice:Int!,numSides:Int):[Int]
  }
  ```

## 3. `mutation`

- 查询使用query,修改数据使用mutation
- 新增数据要使用input定义数据类型。

```js
const express = require('express');
const { buildSchema } = require('graphql');
const graphqlHTTP = require('express-graphql');
require('dotenv').config();
// 定义query类型
const schema = buildSchema(`
   
    type Film {
        id: Int,
        name: String,
        price: Float,
        image: String,
        type: String
    }

    input InputFilm {
        name: String,
        price: Float,
        image: String,
        type: String
    }

    type Query {
        getList:[Film],
        ListData(id:Int!): [Film],
    }

    type Mutation {
        add(input:InputFilm!):Film,
        update(id:Int,input:InputFilm!):Film,
        delete(id:Int):String
    }
`);

let mock = [
    {
        id: 1,
        name: '大片1',
        price: 12.5,
        image: 'https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2510870877.webp',
        type: '动作片'
    },
    {
        id: 2,
        name: '大片2',
        price: 12.5,
        image: 'https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2510870877.webp',
        type: '动作片'
    },
    {
        id: 3,
        name: '大片3',
        price: 12.5,
        image: 'https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2510870877.webp',
        type: '动作片'
    },
    {
        id: 4,
        name: '大片4',
        price: 12.5,
        image: 'https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2510870877.webp',
        type: '动作片'
    }

]
// 处理器，返回数据字段
const root = {

    getList: () => {
        return mock;
    },
    ListData: (args) => {
        // args是参数对象
        return mock.filter(item => item.id === args.id)
    },
    add: (args) => {
        // args是参数对象
        let newItem = args.input;
        newItem.id = mock.length + 1;
        mock.push(newItem);
        return newItem;
    },
    update: (args) => {
        // args是参数对象
        let newItem = args.input;
        let index = mock.findIndex(item => item.id === args.id);
        mock.splice(index, 1, {
            id: args.id,
            ...newItem
        });
        return newItem;
    },
    delete: (args) => {
        // args是参数对象
        let index = mock.findIndex(item => item.id === args.id);
        let item = mock.splice(index, 1);
        return '删除成功';
    }
};
// 在app初始化之前定义完成
const app = express();
// 配置环境变量
const port = process.env.PORT

app.use('/home', (req, res) => {
    res.send('Hello World!');

});
// 注意不要在根路由上渲染数据，否则你会看不到graphiql调试器的
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true// 开启调试器
}));

app.listen(port, () => {
    console.log(`服务器已开启 网址==>>>> http://localhost:${port}`);
});
```

## 4. 结合mongodb数据库

```js
const express = require('express');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');
const graphqlHTTP = require('express-graphql');
require('dotenv').config();

// 连接数据库服务
mongoose.connect("mongodb://127.0.0.1:27017/graphql", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// 创建模型 为了限制数据格式
const Film = mongoose.model('Film', {
    name: String,
    price: Number,
    image: String,
    type: String
});

// 定义query类型
const schema = buildSchema(`
   // 返回值类型
    type Film {
        id: String,
        name: String,
        price: Float,
        image: String,
        type: String
    }

  	// 返回值类型
    type Response {
        code: Int,
        msg: String
    }

    input InputFilm {
        name: String,
        price: Int,
        image: String,
        type: String
    }

    type Query {
        findAll:[Film],
    }

    type Mutation {
        add(input:InputFilm!):Film,
        update(id:String!,input:InputFilm):Response,
        delete(id:String!):Response
    }
`);

// 处理器，返回数据字段
const root = {
    findAll: async () => {
        /*
            查询数据库films集合所有数据
        */
        return await Film.find();
    },
    add: async ({ input }) => {
        /*
           创建模型
           插入数据
           返回Promise对象
        */
        const res = await Film.create({
            ...input
        })
        return res;

    },
    update: async ({ id, input }) => {
        const res = await Film.updateOne({
            _id: id
        }, {
            ...input
        }).then(() => {
            return {
                code: 200,
                msg: '更新成功'
            }
        }).catch(err => {
            return {
                code: 500,
                msg: '参数错误'
            }
        })
        return res;

    },
    delete: async ({ id }) => {
        const res = await Film.deleteOne({
            _id: id
        }).then(() => {
            return {
                code: 200,
                msg: '删除成功'
            }
        }).catch(err => {
            return {
                code: 500,
                msg: '参数错误'
            }
        })
        return res
    }
};
// 在app初始化之前定义完成
const app = express();
// 配置环境变量
const port = process.env.PORT

app.use('/home', (req, res) => {
    res.send('Hello World!');

});
// 注意不要在根路由上渲染数据，否则你会看不到graphiql调试器的
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true// 开启调试器
}));

app.listen(port, () => {
    console.log(`服务器已开启 网址==>>>> http://localhost:${port}`);
});
```

## 5. 结合客户端

- 使用bootstrap添加样式和布局
- 封装fet函数发送请求，貌似graphql无论是增删改查，请求方式都是POST，请求格式为application/json

```js
 	 method: 'POST',
     headers: {
         'Content-Type': 'application/json',
             'Accept': 'application/json'
     },
```



- 字段固定：查询是query，数据存在*variables*里面

```js
// 请求数据在请求体里面 
body: JSON.stringify({
         query: query,
         variables: variables
  })

// query是字符串，长这样
 `mutation($id:String!){
     delete(id:$id) {
         code
         msg
     }
 }`

或者这样
 `query{
      findAll{
          name,
          price,
          image,
          type
      }
  }`
```

```js
        const id = document.getElementById("id");
        const name = document.getElementById("name");
        const price = document.getElementById("price");
        const type = document.getElementById("type");
        const image = document.getElementById("image");


        const create = document.getElementById("create");
        const update = document.getElementById("update");
        const deleteBtn = document.getElementById("delete");
        const findAll = document.getElementById("findAll");


        function fet(query, variables) {
            fetch('/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    query: query,
                    variables: variables
                })
            }).then(res => res.json()).then(data => {
                console.log(data)
            })
        }


        create.onclick = function () {
            // 创建数据
            const option = `
                mutation($input:InputFilm){
                    add(input:$input){
                    name,
                    price,
                    image,
                    type
                    }
                }
        `
            fet(option,
                {
                    input: {
                        name: name.value,
                        price: Number(price.value),
                        type: type.value,
                        image: image.value
                    }
                }
            )
            name.value = ""
            price.value = ""
            type.value = ""
            image.value = ""
        }

        update.onclick = function () {
            // 更新数据
            const option = `
                mutation($id:String!,$input:InputFilm){
                   update(id:$id,input:$input) {
                                code
                                msg
                                }
                }
        `
            fet(option,
                {
                    id: id.value,
                    input: {
                        name: name.value,
                        price: Number(price.value),
                        type: type.value,
                        image: image.value
                    }
                })
            id.value = ""
            name.value = ""
            price.value = ""
            type.value = ""
            image.value = ""

        }

        deleteBtn.onclick = function () {
            // 删除数据
            const option = `
                mutation($id:String!){
                delete(id:$id) {
                        code
                        msg
                        }
                }
        `
            fet(option,
                {
                    id: id.value
                })
            id.value = ""

        }

        findAll.onclick = function () {
            // 查询数据
            const option = `
                query{
                findAll{
                name,
                price,
                image,
                type
                }
                }
        `
            fet(option)
        }
```

## 6. 结合React

- `npm install @apollo/client graphql graphql-tag` 安装相关依赖

```jsx
import {ApolloClient, InMemoryCache, ApolloProvider, HttpLink} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import {useQuery} from '@apollo/client';
import gql from 'graphql-tag';

// 创建HTTP链接
const httpLink = new HttpLink({
    uri: 'http://localhost:3000/graphql', // GraphQL服务器的URL
});

// 创建一个中间件，用于在请求中添加认证头
const authLink = setContext((_, {headers}) => {
    // 获取存储在本地的token
    const token = localStorage.getItem('token');
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    };
});

// 创建Apollo Client实例
const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

// 定义查询
const HELLO_QUERY = gql`
     query{
     findAll {
       id,
      name,
      image,
      price,
      type
     }
}`;

function HelloComponent() {
    // 使用useQuery执行查询
    const {loading, error, data} = useQuery(HELLO_QUERY);
    console.log(data)
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    // 渲染数据
    return (
        <div>
            <h1>Hello, world!</h1>
            <ul>
                {data.findAll.map(item => (
                    <li key={item.id}>
                        <p>{item.name}</p>
                        <p>{item.image}</p>
                        <p>{item.type}</p>
                        <p>{item.price}</p>
                    </li>
                ))}
            </ul>
        </div>
    )

}


// 将Apollo Client实例提供给React应用
function App() {
    return (
        <ApolloProvider client={client}>
            <div className="App">
                <HelloComponent></HelloComponent>
            </div>
        </ApolloProvider>
    );
}


export default App;
```

- 修改数据

```jsx
import {ApolloClient, InMemoryCache, ApolloProvider, HttpLink, useMutation, useQuery} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import {useRef} from "react";
import gql from 'graphql-tag';
import "./App.css"
// 创建HTTP链接
const httpLink = new HttpLink({
    uri: 'http://localhost:3000/graphql', // GraphQL服务器的URL
});

// 创建一个中间件，用于在请求中添加认证头
const authLink = setContext((_, {headers}) => {
    // 获取存储在本地的token
    const token = localStorage.getItem('token');
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    };
});

// 创建Apollo Client实例
const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

// 定义查询
const UPDATE_MUTATION = gql`
         mutation Update($id: String!, $input: InputFilm) {
           update(id: $id, input: $input) {
             code
             msg
           }
         }
   `;

const GET_DATA_QUERY = gql`
        query{
         findAll {
           id,
          name,
          image,
          price,
          type
         }
}`;

const DELETE_MUTATION = gql`
   mutation DeleteAt($id:String!){
    deleteAt(id:$id) {
      code
      msg
    }
}`;

const ADD_MUTATION = gql`
    mutation($input:InputFilm){
    add(input:$input){
    name,
    price,
    image,
    type
    }
}
`;


function HelloComponent() {
    const idRef = useRef();
    const nameRef = useRef();
    const typeRef = useRef();
    const imageRef = useRef();
    const priceRef = useRef();

    function clearInput() {
        // 清空输入框
        idRef.current.value = "";
        nameRef.current.value = "";
        typeRef.current.value = "";
        imageRef.current.value = "";
        priceRef.current.value = "";
    }

    const [events] = useMutation(ADD_MUTATION);
    const {loading,error, data}= useQuery(GET_DATA_QUERY);

    // 查询所有数据
    const handleFindAll = () => {
        console.log(data)
    };

    // 删除数据
    const handleDelete = () => {
        if (!idRef.current.value) {
            alert("请输入完整的数据");
            return;
        }
        // 调用方法，执行删除操作
        events({
            variables: {
                id: `${idRef.current.value}`,
            }
        }).then(r => {
            console.log(r.data)
        });
    };

    // 新增数据
    const handleCreate = () => {
        events({
            variables: {
                input: {
                    name: `${nameRef.current.value}`,
                    price: Number(`${priceRef.current.value}`),
                    image: `${imageRef.current.value}`,
                    type: `${typeRef.current.value}`
                }
            }
        }).then(r => {
            console.log(r.data)
        });
        // 清除输入框
        clearInput();
    }

    // 更新数据
    const handleUpdate = () => {
        if (!idRef.current.value || !nameRef.current.value || !typeRef.current.value || !imageRef.current.value || !priceRef.current.value) {
            alert("请输入完整的数据");
            return;
        }

        events({
            variables: {
                id: `${idRef.current.value}`,
                input: {
                    name: `${nameRef.current.value}`,
                    price: Number(`${priceRef.current.value}`),
                    image: `${imageRef.current.value}`,
                    type: `${typeRef.current.value}`
                }
            }
        }).then(r => {
            console.log(r.data)
        });
        // clearInput();
    };


    // 渲染数据
    return (
        <div>
            <h1>Hello, world!</h1>
            <div className={"label"}>
                <label>ID：</label>
                <input type={"text"} ref={idRef} placeholder={"请输入你要修改的id"}/>
            </div>
            <div className={"label"}>
                <label>电影名：</label>
                <input type={"text"} ref={nameRef} placeholder={"请输入你要修改的电影名"}/>
            </div>
            <div className={"label"}>
                <label>电影类型：</label>
                <input type={"text"} ref={typeRef} placeholder={"请输入你要修改的电影类型"}/>
            </div>
            <div className={"label"}>
                <label>电影图片：</label>
                <input type={"text"} ref={imageRef} placeholder={"请输入你要修改的电影图片"}/>
            </div>
            <div className={"label"}>
                <label>电影票价格：</label>
                <input type={"text"} ref={priceRef} placeholder={"请输入你要修改的电影票价格"}/>
            </div>
            <button onClick={handleFindAll}>查询数据</button>
            <button onClick={handleDelete}>删除数据</button>
            <button onClick={handleCreate}>新增数据</button>
            <button onClick={handleUpdate}>更新数据</button>
        </div>
    );
}


// 将Apollo Client实例提供给React应用
function App() {
    return (
        <ApolloProvider client={client}>
            <div className="App">
                <HelloComponent></HelloComponent>
            </div>
        </ApolloProvider>
    );
}


export default App;
```

## 7. todolist案例

APP.jsx

```jsx
import {ApolloClient, InMemoryCache, ApolloProvider, HttpLink, useMutation, useQuery} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import {useEffect, useRef, useState} from "react";
import Add from './components/add.jsx'
import Update from './components/update.jsx'
import gql from 'graphql-tag';
import "./App.css"
// 创建HTTP链接
const httpLink = new HttpLink({
    uri: 'http://localhost:3000/graphql', // GraphQL服务器的URL
});
// 创建Apollo Client实例
const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
});


const GET_DATA_QUERY = gql`
        query{
         findAll {
           id,
          name,
          image,
          price,
          type
         }
}`;

const DELETE_MUTATION = gql`
   mutation DeleteAt($id:String!){
    deleteAt(id:$id) {
      code
      msg
    }
}`;

function HelloComponent() {
    const idRef = useRef();
    const nameRef = useRef();
    const typeRef = useRef();
    const imageRef = useRef();
    const priceRef = useRef();

    const [datalist, setDataList] = useState([]);
    const [events] = useMutation(DELETE_MUTATION);
    const {loading, error, data, refetch} = useQuery(GET_DATA_QUERY);
    useEffect(() => {
        if (data) {
            setDataList(data.findAll)
        }
    }, [data])
    // 删除数据
    const handleDelete = (id) => {
        // 调用方法，执行删除操作
        events({
            variables: {
                id: `${id}`,
            }
        }).then(r => {
            console.log(r.data)
            refetch()
        });
    };

    // 渲染数据
    return (
        <div>
            <h1>Hello, world!</h1>
            <div className={"label"}>
                <label>ID：</label>
                <input type={"text"} ref={idRef} placeholder={"请输入你要修改的id"}/>
            </div>
            <div className={"label"}>
                <label>电影名：</label>
                <input type={"text"} ref={nameRef} placeholder={"请输入你要修改的电影名"}/>
            </div>
            <div className={"label"}>
                <label>电影类型：</label>
                <input type={"text"} ref={typeRef} placeholder={"请输入你要修改的电影类型"}/>
            </div>
            <div className={"label"}>
                <label>电影图片：</label>
                <input type={"text"} ref={imageRef} placeholder={"请输入你要修改的电影图片"}/>
            </div>
            <div className={"label"}>
                <label>电影票价格：</label>
                <input type={"text"} ref={priceRef} placeholder={"请输入你要修改的电影票价格"}/>
            </div>
            <Add obj={{
                nameRef,
                typeRef,
                imageRef,
                priceRef
            }}
                 refetch={refetch}
            />
            <Update obj={{
                idRef,
                nameRef,
                typeRef,
                imageRef,
                priceRef
            }}
            refetch={refetch}
            />

            <div>
                <ul>
                    {datalist.map(item=>{
                        return (
                            <div key={item.id}>
                                <li>{item.name}</li>
                                <button onClick={()=>handleDelete(item.id)}>删除</button>
                            </div>
                        )
                    })}
                </ul>

            </div>

        </div>
    );
}


// 将Apollo Client实例提供给React应用
function App() {
    return (
        <ApolloProvider client={client}>
            <div className="App">
                <HelloComponent></HelloComponent>
            </div>
        </ApolloProvider>
    );
}


export default App;
```

子组件Update和Add

```jsx
// 定义查询
import {useMutation} from "@apollo/client";
import gql from 'graphql-tag'
const UPDATE_MUTATION = gql`
         mutation Update($id: String!, $input: InputFilm) {
           update(id: $id, input: $input) {
             code
             msg
           }
         }
   `;

export default function Update(props) {
    const [events] = useMutation(UPDATE_MUTATION)

    // 更新数据
    const handleUpdate = () => {

        events({
            variables: {
                id: `${props.obj.idRef.current.value}`,
                input: {
                    name: `${props.obj.nameRef.current.value}`,
                    price: Number(`${props.obj.priceRef.current.value}`),
                    image: `${props.obj.imageRef.current.value}`,
                    type: `${props.obj.typeRef.current.value}`
                }
            }
        }).then(r => {
            console.log(r.data)
            props.refetch()
        });
    };


    return (
        <button onClick={handleUpdate}>更新数据</button>
    );
}
```

```jsx
import gql from "graphql-tag";
import {useMutation} from "@apollo/client";

const ADD_MUTATION = gql`
    mutation($input:InputFilm!){
    add(input:$input){
    name,
    price,
    image,
    type
    }
}
`;

export default function Add(props) {

    const [events] = useMutation(ADD_MUTATION);
    const handleCreate = () => {
        events({
            variables: {
                input: {
                    name: `${props.obj.nameRef.current.value}`,
                    price: Number(`${props.obj.priceRef.current.value}`),
                    image: `${props.obj.imageRef.current.value}`,
                    type: `${props.obj.typeRef.current.value}`
                }
            }
        }).then(r => {
            console.log(r.data)
            props.refetch()
        });
    }

    return (
        <button onClick={handleCreate}>新增数据</button>
    )

}
```

