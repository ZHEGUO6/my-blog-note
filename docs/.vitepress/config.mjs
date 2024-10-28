import {defineConfig} from 'vitepress'
import {set_sidebar} from "./utils/auto_sidebar.js";
// 1. 导入 defineConfigWithTheme 函数
import { defineConfigWithTheme } from 'vitepress'
// 2. 导入需要继承的配置对象
import escookConfig from '@escook/vitepress-theme/config'
// https://vitepress.dev/reference/site-config
export default defineConfigWithTheme({
    // 通过 extends 指定要继承的配置
    extends:escookConfig,
    head: [["link", {rel: "icon", href: "/themeIcon.png"}]],
    title: "折果的个人知识库",
    description: "A VitePress Site",
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        logo: '/themeIcon.png',
        outlineTitle: "目录",
        outline: [2, 6],
        // 4. 通过此配置项，启用背景音乐的小组件
        musicBall: {
           list:[
               {
                   name: '知我 -国风棠（哦屚）',
                   src: '/audio/knowme.mp3'
               },
               {
                   name: 'See you again -查理·普斯 ',
                   src: '/audio/Seeyouagain.mp3'
               },
               {
                   name: '普通朋友 -陶喆',
                   src: '/audio/friend.mp3'
               }
           ]
        },
        nav: [
            {
                text: '拓展',
                link: '/notes/'
            },
            {
                text: '我的笔记',
                link: '/my_notes/'
            },
            {
                text: '我的项目', items: [
                    {text: '开心聊天室', link: 'http://47.97.85.85:81'}
                ]
            }
        ],
        sidebar: {
            "/notes/": [
                {
                    text: "Python基础",
                    collapsed: false,
                    items: [
                        {text: "01python数据模型", link: "/notes/Python基础/01python数据模型"},
                        {text: "02序列构成的数组", link: "/notes/Python基础/02序列构成的数组"},
                        {text: "03字典与集合", link: "/notes/Python基础/03字典与集合"},
                        {text: "04文本与字节序列", link: "/notes/Python基础/04文本与字节序列"},
                        {text: "05一等函数", link: "/notes/Python基础/05一等函数"},
                        {text: "06使用一等函数实现设计模式", link: "/notes/Python基础/06使用一等函数实现设计模式"},
                        {text: "07函数装饰器与闭包", link: "/notes/Python基础/07函数装饰器与闭包"},
                        {text: "08对象引用、可变性和垃圾回收", link: "/notes/Python基础/08对象引用、可变性和垃圾回收"},
                        {text: "09符合python风格的对象", link: "/notes/Python基础/09符合python风格的对象"},
                        {text: "10序列的修改、散列和切片", link: "/notes/Python基础/10序列的修改、散列和切片"},
                        {text: "11接口：从协议到抽象基类", link: "/notes/Python基础/11接口：从协议到抽象基类"},
                        {text: "12继承的优缺点", link: "/notes/Python基础/12继承的优缺点"},
                        {text: "13正确重载运算符", link: "/notes/Python基础/13正确重载运算符"},
                        {
                            text: "14可迭代的对象、迭代器和生成器",
                            link: "/notes/Python基础/14可迭代的对象、迭代器和生成器"
                        },
                        {text: "15上下文管理和else块", link: "/notes/Python基础/15上下文管理和else块"},
                        {text: "16协程", link: "/notes/Python基础/16协程"},
                        {text: "17使用future处理并发", link: "/notes/Python基础/17使用future处理并发"},
                        {text: "18使用asyncio包处理并发", link: "/notes/Python基础/18使用asyncio包处理并发"},
                        {text: "19元编程", link: "/notes/Python基础/19元编程"},
                    ],
                },
                {
                    text: "threejs入门",
                    collapsed: false,
                    items: [
                        {text: "01起步", link: "/notes/threejs入门/01起步"},
                        {text: "02一个基本的threejs应用", link: "/notes/threejs入门/02一个基本的threejs应用"},
                        {text: "03基于物理的渲染和照明", link: "/notes/threejs入门/03基于物理的渲染和照明"},
                        {text: "04变换、坐标系和场景图", link: "/notes/threejs入门/04变换、坐标系和场景图"},
                        {text: "05动画循环", link: "/notes/threejs入门/05动画循环"},
                        {text: "06纹理映射", link: "/notes/threejs入门/06纹理映射"},
                        {text: "07插件", link: "/notes/threejs入门/07插件"},
                        {text: "08环境光", link: "/notes/threejs入门/08环境光"},
                        {text: "09组织你的场景", link: "/notes/threejs入门/09组织你的场景"},
                        {text: "10内置几何体", link: "/notes/threejs入门/10内置几何体"},
                        {text: "11以gLTF格式加载3D模型", link: "/notes/threejs入门/11以gLTF格式加载3D模型"},
                        {text: "12threejs动画系统", link: "/notes/threejs入门/12threejs动画系统"},
                    ],
                },
                {
                    text: "Rust基础学习",
                    collapsed: false,
                    items: [
                        {text: "01认识Cargo", link: "/notes/Rust基础学习/01认识Cargo"},
                        {text: "02变量绑定与解构", link: "/notes/Rust基础学习/02变量绑定与解构"},
                        {text: "03基本类型", link: "/notes/Rust基础学习/03基本类型"},
                        {text: "04所有权与借用", link: "/notes/Rust基础学习/04所有权与借用"},
                        {text: "05复合类型", link: "/notes/Rust基础学习/05复合类型"},
                        {text: "06流程控制", link: "/notes/Rust基础学习/06流程控制"},
                        {text: "07模式匹配", link: "/notes/Rust基础学习/07模式匹配"},
                        {text: "08方法Method", link: "/notes/Rust基础学习/08方法Method"},
                        {text: "09泛型", link: "/notes/Rust基础学习/09泛型"},
                        {text: "10特征", link: "/notes/Rust基础学习/10特征"},
                        {text: "11特征对象", link: "/notes/Rust基础学习/11特征对象"},
                        {text: "12深入特征", link: "/notes/Rust基础学习/12深入特征"},
                        {text: "13动态数组Vector", link: "/notes/Rust基础学习/13动态数组Vector"},
                        {text: "14KV存储HashMap", link: "/notes/Rust基础学习/14KV存储HashMap"},
                        {text: "15认识生命周期", link: "/notes/Rust基础学习/15认识生命周期"},
                        {text: "16返回值和错误处理", link: "/notes/Rust基础学习/16返回值和错误处理"},
                        {text: "17包和模块", link: "/notes/Rust基础学习/17包和模块"},
                        {text: "18注释和文档", link: "/notes/Rust基础学习/18注释和文档"},
                        {text: "19格式化输出", link: "/notes/Rust基础学习/19格式化输出"},
                        {text: "20实战-文件搜索工具", link: "/notes/Rust基础学习/20实战-文件搜索工具"},
                    ],
                },
                {
                    text: "微前端设计与实现笔记",
                    collapsed: false,
                    items: [
                        {text: "01前端概览", link: "/notes/微前端设计与实现/01前端概览"},
                        {text: "02微前端原则", link: "/notes/微前端设计与实现/02微前端原则"},
                        {text: "03微前端的架构和挑战", link: "/notes/微前端设计与实现/03微前端的架构和挑战"},
                        {text: "04探索微前端架构", link: "/notes/微前端设计与实现/04探索微前端架构"},
                        {text: "05其他", link: "/notes/微前端设计与实现/05其他"},
                    ],
                },
                {
                    text: "ChatGPT提示学习笔记",
                    collapsed: false,
                    items: [
                        {text: "1_2引言—指示", link: "/notes/ChatGPT提示学习/ChatGPT提示学习笔记1_2"},
                        {text: "3迭代", link: "/notes/ChatGPT提示学习/ChatGPT提示学习笔记3"},
                        {text: "4摘要", link: "/notes/ChatGPT提示学习/ChatGPT提示学习笔记4"},
                        {text: "5推理", link: "/notes/ChatGPT提示学习/ChatGPT提示学习笔记5"},
                        {text: "6转换", link: "/notes/ChatGPT提示学习/ChatGPT提示学习笔记6"},
                        {text: "7扩展", link: "/notes/ChatGPT提示学习/ChatGPT提示学习笔记7"},
                        {text: "8聊天机器人", link: "/notes/ChatGPT提示学习/ChatGPT提示学习笔记8"},
                    ],
                },
                {
                    text: "算法与数据结构",
                    collapsed: false,
                    items: [
                        {text: "基础概念", link: "/notes/算法与数据结构/01基础概念"},
                        {text: "线性表", link: "/notes/算法与数据结构/02线性表"},
                        {text: "栈和队列", link: "/notes/算法与数据结构/03栈和队列"},
                        {text: "数组", link: "/notes/算法与数据结构/04数组"},
                        {text: "树", link: "/notes/算法与数据结构/05树"},
                        {text: "图", link: "/notes/算法与数据结构/06图"},
                        {text: "查找", link: "/notes/算法与数据结构/07查找"},
                        {text: "排序", link: "/notes/算法与数据结构/08排序"},
                        {text: "算法概述", link: "/notes/算法与数据结构/10算法概述"},
                        {text: "递归与分治", link: "/notes/算法与数据结构/11递归与分治"},
                        {text: "动态规划", link: "/notes/算法与数据结构/12动态规划"},
                        {text: "贪心算法", link: "/notes/算法与数据结构/13贪心算法"},
                        {text: "回溯与分支极限", link: "/notes/算法与数据结构/14回溯与分支界限"},
                        {text: "经典算法实现", link: "/notes/算法与数据结构/15经典算法实现"},
                        {text: "剑指Offer", link: "/notes/算法与数据结构/16剑指Offer"},
                    ],
                },
                {
                    text: "计算机基础知识",
                    collapsed: false,
                    items: [{text: "操作系统基础", link: "/notes/计算机基础知识/01操作系统基础"}],
                },
                {
                    text: "数据库一期",
                    collapsed: false,
                    items: [
                        {text: "数据库系统概述", link: "/notes/数据库01/01数据库系统概述"},
                        {text: "关系数据库", link: "/notes/数据库01/02关系数据库"},
                        {text: "SQL(重点)", link: "/notes/数据库01/03SQL(重点)"},
                        {text: "数据库管理与维护(重点)", link: "/notes/数据库01/05数据库管理与维护(重点)"},
                        {text: "关系数据理论(重点)", link: "/notes/数据库01/06关系数据理论(重点)"},
                        {text: "数据库设计", link: "/notes/数据库01/07数据库设计"},
                    ],
                },
                {
                    text: "JavaScript[待更新]",
                    collapsed: false,
                    items: [{text: "JS常见手写面试题", link: "/notes/JavaScript/01JS常见手写面试题"}],
                },
                {
                    text: "CSS相关[待更新]",
                    collapsed: false,
                    items: [],
                },
                {
                    text: "Vue相关",
                    collapsed: false,
                    items: [
                        {text: "Vue3是如何运行的", link: "/notes/Vue相关/01Vue3是如何运行的"},
                        {text: "Vue3编译器", link: "/notes/Vue相关/02Vue3编译器"},
                        {text: "虚拟DOM", link: "/notes/Vue相关/03虚拟DOM"},
                        {text: "Vue3-Reactivity", link: "/notes/Vue相关/04Vue3-Reactivity"},
                        {text: "Mini-Vue", link: "/notes/Vue相关/05Mini-Vue"},
                        {text: "Vue3其他", link: "/notes/Vue相关/06Vue3其他"},
                    ],
                },
                {
                    text: "NestJS",
                    collapsed: false,
                    items: [
                        {text: "controller", link: "/notes/NestJS/01controller"},
                        {text: "service", link: "/notes/NestJS/02service"},
                        {text: "module", link: "/notes/NestJS/03module"},
                        {text: "DTO", link: "/notes/NestJS/04DTO"},
                        {text: "postgreSQL", link: "/notes/NestJS/05postgreSQL"},
                        {text: "原理细节", link: "/notes/NestJS/06原理细节"},
                        {text: "应用配置", link: "/notes/NestJS/07应用配置"},
                        {text: "更多模块", link: "/notes/NestJS/08更多模块"},
                        {text: "openAPI", link: "/notes/NestJS/09openAPI"},
                        {text: "测试", link: "/notes/NestJS/10测试"},
                    ],
                },
                {
                    text: "前端八股文",
                    collapsed: false,
                    items: [
                        {text: "HTML", link: "/notes/前端八股文/01HTML"},
                        {text: "CSS", link: "/notes/前端八股文/02CSS"},
                        {text: "JavaScript", link: "/notes/前端八股文/03JavaScript"},
                        {text: "Vue", link: "/notes/前端八股文/04Vue"},
                        {text: "计算机网络", link: "/notes/前端八股文/05计算机网络"},
                        {text: "浏览器原理", link: "/notes/前端八股文/06浏览器原理"},
                        {text: "性能优化", link: "/notes/前端八股文/07性能优化"},
                    ],
                },
                {
                    text: "后端储备",
                    collapsed: false,
                    items: [
                        {text: "Django进阶学习笔记", link: "/notes/后端储备/01Django进阶学习笔记"},
                        {text: "DRF学习笔记", link: "/notes/后端储备/02DRF学习笔记"},
                        {text: "Redis学习笔记", link: "/notes/后端储备/03Redis学习笔记"},
                    ],
                },
                {
                    text: "Web3.0",
                    collapsed: false,
                    items: [
                        {text: "Solidity8新特性", link: "/notes/Web3.0/00Solidity8新特性"},
                        {text: "Solidity8基本语法", link: "/notes/Web3.0/01Solidity8基本语法"},
                        {text: "Solidity8高级", link: "/notes/Web3.0/02Solidity8高级"},
                        {text: "Solidity8进阶", link: "/notes/Web3.0/03Solidity8进阶"},
                    ],
                },
                {
                    text: "AI相关[待更新]",
                    collapsed: false,
                    items: [],
                },
            ],
            "/my_notes/": [
                {
                    text: "前端学习笔记",
                    collapsed: false,
                    items: [
                        {text: "HTML", link: "/my_notes/fore_end/HTML/api"},
                        {text: "CSS", link: "/my_notes/fore_end/CSS/api"},
                        {text: "JavaScript", link: "/my_notes/fore_end/Javascript/api"},
                        {text: "Promise", link: "/my_notes/fore_end/promise/api"},
                        {text: "TypeScript",items:[
                            {text: "黑马", link: "/my_notes/fore_end/typescript/api1"},
                            {text: "超哥", link: "/my_notes/fore_end/typescript/api2"},
                            ]},
                        {text: "Three.js", link: "/my_notes/fore_end/three/api"},
                        {text: "Vue", link: "/my_notes/fore_end/vue/api"},
                        {text: "React", link: "/my_notes/fore_end/react/api"},
                        {text: "uni-app", link: "/my_notes/fore_end/uni-app/api"},
                        {text: "Websocket", link: "/my_notes/fore_end/websocket/api"},
                        {text: "Electron", link: "/my_notes/fore_end/electron/api"},
                        {text: "数据结构与算法", link: "/my_notes/fore_end/算法与数据结构/api"},
                        {text: "Dva.js", link: "/my_notes/fore_end/Dvajs/api"},
                        {text: "Umi.js", link: "/my_notes/fore_end/Umijs/api"},
                    ]
                },
                {
                    text: "后端学习笔记",
                    collapsed: false,
                    items: [
                        {text: "Python", link: "/my_notes/after_end/python/api"},
                        {text: "Java", link: "/my_notes/after_end/Java/api"},
                        {text: "Node.js", link: "/my_notes/after_end/Node/api"},
                        {text: "Mysql", link: "/my_notes/after_end/Mysql/api"},
                        {text: "Mongodb", link: "/my_notes/after_end/Mongodb/api"},
                        {text: "Graphql", link: "/my_notes/after_end/Graphql/api"},
                    ]
                },
                {
                    text:'经验总结',
                    collapsed: false,
                    items:[
                        {text:'前端',link:'/my_notes/fore_end/important/api'}
                    ]
                }
            ]
        },
        lastUpdated: true, // 显示上次修改时间
        socialLinks: [
            {icon: 'github', link: 'https://github.com/ZHEGUO6'},
            {
                icon: {
                    svg: '<svg t="1726234122104" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"\n' +
                        '     p-id="17972" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200">\n' +
                        '    <path d="M512 1024C229.222 1024 0 794.778 0 512S229.222 0 512 0s512 229.222 512 512-229.222 512-512 512z m259.149-568.883h-290.74a25.293 25.293 0 0 0-25.292 25.293l-0.026 63.206c0 13.952 11.315 25.293 25.267 25.293h177.024c13.978 0 25.293 11.315 25.293 25.267v12.646a75.853 75.853 0 0 1-75.853 75.853h-240.23a25.293 25.293 0 0 1-25.267-25.293V417.203a75.853 75.853 0 0 1 75.827-75.853h353.946a25.293 25.293 0 0 0 25.267-25.292l0.077-63.207a25.293 25.293 0 0 0-25.268-25.293H417.152a189.62 189.62 0 0 0-189.62 189.645V771.15c0 13.977 11.316 25.293 25.294 25.293h372.94a170.65 170.65 0 0 0 170.65-170.65V480.384a25.293 25.293 0 0 0-25.293-25.267z"\n' +
                        '          fill="#C71D23" p-id="17973"></path>\n' +
                        '</svg>'
                }, link: 'https://gitee.com/li-guozhe'
            }
        ],
        footer: {
            message: '本网站仅供学习使用',
            copyright: '禁止copy用作商业用途'
        },
        // 设置搜索框的样式
        search: {
            provider: "local",
            options: {
                translations: {
                    button: {
                        buttonText: "搜索文档",
                        buttonAriaLabel: "搜索文档",
                    },
                    modal: {
                        noResultsText: "无法找到相关结果",
                        resetButtonTitle: "清除查询条件",
                        footer: {
                            selectText: "选择",
                            navigateText: "切换",
                        },
                    },
                },
            },
        },
    },
    vite:{
        ssr:{
            noExternal: ['@escook/vitepress-theme','vitepress']
        }
    }
})
