# `Umi.js`

**什么是`Umijs`?**

`UmiJS`（发音为“乌米”）是一个专为构建企业级前端应用设计的可插拔框架，基于React。它提供了类似于`Next.js`的功能，包括对各种路由的支持（如常规路由和按需加载的高级路由功能），并且拥有一个完整的插件系统，能够覆盖从源代码编写到构建过程中的每一个阶段。
**`UmiJS`的主要特点包括：**

- 路由基础：`UmiJS`以路由为核心，支持配置式路由和约定式路由，使得路由功能非常完善。
- 插件系统：它具备强大的插件生态系统，允许开发者根据项目需求轻松添加或扩展功能。
- 简化开发：通过框架提供的约定、自动化工具以及解析代码等功能，`UmiJS`旨在减少开发者的编码工作量，提高开发效率。
- 企业级应用：作为蚂蚁金服的底层前端框架，`UmiJS`特别适合用于构建大型复杂的企业级应用。

`UmiJS`的设计理念是通过提供一系列的工具和约定来帮助开发者更专注于业务逻辑的实现，而不是繁琐的基础架构搭建。如果你正在使用React进行开发，并且寻找一种可以加速开发流程并提供丰富特性的解决方案，那么`UmiJS`可能是一个不错的选择。

## 安装脚手架

国内建议选 **`pnpm + taobao` 源**，速度提升明显。这一步会自动安装依赖，同时安装成功后会自动执行 `umi setup` 做一些文件预处理等工作。

> **`PNPM`**

```bash
$ pnpm dlx create-umi@latest

✔ Install the following package: create-umi? (Y/n) · true

✔ Pick Npm Client › pnpm

✔ Pick Npm Registry › taobao

Write: .gitignore

Write: .npmrc

Write: .umirc.ts

Copy:  layouts/index.tsx

Write: package.json

Copy:  pages/index.tsx

Copy:  pages/users.tsx

Copy:  pages/users/foo.tsx

> @ postinstall /private/tmp/sorrycc-vylwuW

> umi setup

info  - generate files
```

### 从模板创建项目

```bash
# 从 @umijs/electron-template 创建一个 electron 模板

  pnpm create umi --template electron
```

### 参数选项

使用 `create-umi` 创建项目时，可用的参数如下：

| option         | description                |
| -------------- | -------------------------- |
| `--no-git`     | 创建项目，但不初始化 Git   |
| `--no-install` | 创建项目，但不自动安装依赖 |

## 启动项目

执行 `pnpm dev` 命令，

```bash
$ pnpm dev

        ╔═════════════════════════════════════════════════════╗

        ║ App listening at:                                   ║

        ║  >   Local: https://127.0.0.1:8000                  ║

ready - ║  > Network: https://192.168.1.1:8000                ║

        ║                                                     ║

        ║ Now you can open browser with the above addresses👆 ║

        ╚═════════════════════════════════════════════════════╝

event - compiled successfully in 1121 ms (388 modules)

event - MFSU compiled successfully in 1308 ms (875 modules)
```

在浏览器里打开 `http://localhost:8000/ `，能看到以下界面，

<img src="https://img.alicdn.com/imgextra/i2/O1CN01ufcj8M1Lpt1yXd8sy_!!6000000001349-2-tps-1372-1298.png" alt="img" style="zoom: 33%;" />

## 路由

两种路由模式，一种是**配置式**，一种是**约定式**。

```ts
// 配置式 .umirc.ts
// 在routes里面配置路径和组件，组件就是pages文件夹里面文件名。
import {defineConfig} from "umi";

export default defineConfig({
    routes: [
        {path: "/", component: "index"},
        {path: "/docs", component: "docs"},
        {path: '/about', component: 'about'},
    ],
    npmClient: 'pnpm',
});
```

```
// 约定式：注解掉routes，pages里面有几个.tsx文件,就有几个路由，文件名就是对应的路径。
```

