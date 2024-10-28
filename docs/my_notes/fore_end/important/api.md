## 记录我遇到的问题



### 问题一

在我做自己的个人博客时遇到一个很奇怪的问题，正常的逻辑是登录页输入正确的用户名密码登录时，后端会返回一个token字符串，在登录页需要把这个token存到`localStorage`中，在跳转到首页后，一进入页面就会请求对应的首页数据，这里我把`axios`和获取token进行了二次封装（`http.ts`，`token.ts`），数据在请求时会先把存储到本地的token加到request请求头里面，后端的中间件会验证这个token是否正确，验证错误会返回一个401错误。

但是我在测试的时候，登录可以请求到正确的token，但是跳转到首页之后，加载数据的时候，数据请求不回来，原因是请求头里面没有token，`getToken`方法请求的token为null，我打开 Application 发现里面有token，在这里我就百思不得其解。

**最开始的代码：**

```ts
// 登录的请求方法我自定义的一个hooks
// 把Login方法导出去 返回值是一个Promise对象
async function Login(login: string, password: string) {
       return await HTTP.post('/web/users/login', {
            login,
            password
        })
    }

// 登录组件 在登录组件里面存储token

const onSubmit = async ()=>{
    ...
    const res = await Login(login,password)
    setToken(res.data.token)
}


// http.ts
const HTTP = axios.create({
    baseURL: 'http://localhost:3002',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        'token': getToken()
    }
})
```

**改良之后的代码：**

```ts
// 登录的请求方法我自定义的一个hooks
   async function Login(login: string, password: string) {
        const res = await HTTP.post('/web/users/login', {
            login,
            password
        })
        // 在hooks里面完成存储token的逻辑，我估计之前应该是由于异步，存储token的顺序落后于首页加载数据的顺序，导致token还没保存，首页就请求数据了。
        setToken(res.data.token)

        return res.status
    }

// 登录组件 在登录组件里面存储token

const onSubmit = async () => {
        try {
            if (!loginRef.current!.value || !passwordRef.current!.value) {
                message.error('账号或密码不能为空！')
                return
            }
           const res: number = await Login(loginRef.current!.value, passwordRef.current!.value)
          
            // 这里的res其实是boolean型，因为我后端定义的status是布尔型，axios定义的status是number型
            if (res){
                message.success('登录成功')
                navigate('/')
            }else{
                message.error('登录失败')
            }
            loginRef.current!.value = ''
            passwordRef.current!.value = ''
        } catch (error: any) {
            message.error(error)
        }


// http.ts
// 添加请求拦截器
// 请求发送之前 做拦截 插入一些逻辑
// 在这里我建议token通过拦截器添加到请求头里面，这样更规范，直接添加可能因为不知名原因加不上。
HTTP.interceptors.request.use(function (config) {
    const token = getToken()
    if (token) {
        config.headers.token = token
    }
    return config
}, function (error) {
    return Promise.reject(error)
})
```



### 问题二

在react项目中，当数据量比较大且需要传递分页参数时，如何使用自定义hooks在页面加载时就请求默认数据，点击分页按钮时，请求对应页面的数据。

我这个方法是个笨方法，暂时还没想到别的方法。以精选文章列表为例。

第一步：自定义一个hooks。

**逻辑**：导出两个方法，传入当前页码。

```ts
import {useState} from "react";
import {HTTP} from "@/api/http.ts";
import {Article_DataType} from "@/vite-env";
import {message} from "antd";

const useConcentrateData = () => {
    const [lifeData, setLifeData] = useState<Article_DataType[]>([])
    const [abilityData, setAbilityData] = useState<Article_DataType[]>([])

    /**
     * 获取生活随笔精选笔记
     * @param page 当前页码
     */
    const CurrentLifeArticle = (page: number) => {
        async function fetchData() {
            try {
                const res = await HTTP.post(`/web/articles/life?pageSize=${4}&currentPage=${page}`);
                if (!res.data.articles) {
                    message.error("暂无文章")
                    return;
                }
                setLifeData(res.data.articles);
            } catch (error) {
                console.error('Error fetching data:', error);
                // 可以在这里处理错误，例如展示错误提示
            }
        }

        fetchData();
    }

    /**
     * 获取技术随笔精选笔记
     * @param page 当前页码
     */
    const CurrentAbilityArticle = (page: number) => {
        async function fetchData() {
            try {
                const res = await HTTP.post(`/web/articles/ability?pageSize=${4}&currentPage=${page}`);
                if (!res.data.articles) {
                    throw new Error("暂无文章")
                }
                setAbilityData(res.data.articles);
            } catch (error) {
                console.error('Error fetching data:', error);
                // 可以在这里处理错误，例如展示错误提示
            }
        }

        fetchData();
    }

    return {
        lifeData,
        abilityData,
        CurrentLifeArticle,
        CurrentAbilityArticle
    }
}

export default useConcentrateData
```

第二步：在react组件里面调用这两个方法。

**逻辑**：根据`useEffect`的特性，先请求第一页数据。再通过点击事件传递page参数，请求下一页数据。

```tsx
let count_life: number = 1
let count_ability: number = 1
export default function Nav() {
    const navigate = useNavigate()
    const {
        lifeData,
        abilityData,
        CurrentLifeArticle,
        CurrentAbilityArticle
    } = useConcentrateData()

    useEffect(() => {
        CurrentLifeArticle(1)
        CurrentAbilityArticle(1)
    }, []);

    return <>
        {/*技术文章*/}
        <div>
            <div>
                <p>✨技术</p>
                <video src="/back.mp4" autoPlay width="500" loop height="300" muted></video>
            </div>
            <div>
                <div>
                    <p style={{height: '33px', lineHeight: '33px', color: '#ccc'}}>精选文章</p>
                    <p onClick={() => {
                            // 点击count_ability自增，通过参数请求数据
                        CurrentAbilityArticle(++count_ability)
                        console.log(count_ability)
                    }}>
                        <Link theme="primary" style={{float: 'right'}}>换一批 <span
                            style={{marginLeft: '5px'}}><RedoOutlined/></span></Link>
                    </p>
                </div>
                <List
                    itemLayout="horizontal"
                    dataSource={abilityData}
                    renderItem={(item: Article_DataType) => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar
                                    onClick={() => {
                                        navigate(`/blog/user/${item.user?.id}`)
                                    }}
                                    style={{cursor: 'pointer'}}
                                    src={item?.user?.avatar}/>}
                                style={{overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis'}}
                                title={<a onClick={() => {
                                    navigate(`/article/detail/${item.id}`)
                                }}>{item.title}</a>}
                                description={<div style={{width: '100%', margin: 0}}>
                                    <div>{Array.from(item.content || '').slice(0, 60).join('') + '...'}</div>
                                    <div>{item.createdAt}发布
                                    </div>
                                </div>}
                            />
                        </List.Item>
                    )}
                />
            </div>
        </div>

        {/* 生活文章 */}
        <div>
            <div>
                <div>
                    <p>精选文章</p>
                    <p onClick={() => {
                        CurrentLifeArticle(++count_life)
                        console.log(count_life)
                    }}>
                        <Link theme="primary" style={{float: 'right'}}>换一批<span><RedoOutlined/></span></Link>
                    </p>
                </div>
                <List
                    itemLayout="horizontal"
                    dataSource={lifeData}
                    renderItem={(item: Article_DataType) => (
                        <List.Item>
                            <List.Item.Meta
                                style={{overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis'}}
                                avatar={<Avatar
                                    onClick={() => {
                                        navigate(`/blog/user/${item.user?.id}`)
                                    }}
                                    src={item?.user?.avatar}/>}
                                title={<a onClick={() => {
                                    navigate(`/article/detail/${item.id}`)
                                }}>{item.title}</a>}
                                description={<div>
                                    <div>{Array.from(item.content || '').slice(0, 60).join('') + '...'}
                                    <div>{item.createdAt}发布
                                    </div>
                                </div>}
                            />
                        </List.Item>
                    )}
                />
            </div>
```

