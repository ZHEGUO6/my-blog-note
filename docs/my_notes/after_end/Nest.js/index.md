# 什么是Nest.js?

**Nest.js 是一个用于构建高效、可扩展的 Node.js 服务器端应用程序的开发框架。以下是关于 Nest.js 的一些关键点：**

- 框架基础：Nest.js 构建在 Express 或 Fastify 这样的 HTTP 服务器框架之上，同时提供了对这些底层框架的高级抽象。
- 编程语言支持：虽然 Nest.js 使用 JavaScript 编写，但它完全支持 TypeScript，这使得开发者可以利用静态类型检查和其他 TypeScript 特性来提高开发效率和代码质量。
- 架构特性：
  1. MVC：模型-视图-控制器设计模式，帮助组织代码结构。
  2. IOC：控制反转，通过依赖注入实现组件间的解耦。
  3. AOP：面向切面编程，支持横切关注点的模块化。
  4. 适应性强：Nest.js 的模块化架构允许开发者轻松集成第三方库和服务，提供高度的灵活性。
  5. 开发效率：内置了 CLI 工具，可以帮助开发者快速搭建项目结构、生成服务、控制器等。
  6. 安全性与性能：提供了多种工具和最佳实践来确保应用的安全性和高性能。
  7. 社区与文档：拥有活跃的社区和详细的官方文档，为开发者提供持续的支持和资源。

> `npm i -g @nestjs/cli`  全局安装nestjs项目构建工具

## nest cli 命令行

```shell
创建项目目录
nest new
跳转到对应目录
cd .\files
运行命令
npm run start
```

运行成功，在本地3000端口打开一个HTTP服务。http://localhost:3000

![](//images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/ZHEGUO6/image/img/202411011457363.png)

## 创建controller控制器

```shell
创建新控制器/输入控制器名称，会出现你命名的文件夹，同时app.module.ts模块会新增一个controller
nest g co
```

```
在对应目录下创建控制器/--dry-run 不会真的创建，模拟打印出指令会创建的内容
nest generate controller [文件夹名称]/[name] --dry-run
```

![](//images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/ZHEGUO6/image/img/202411011524891.png)

## 创建接口路由和返回数据

###     Get请求

```typescript
// 在[name].controller.ts里面创建一个方法，并定义为get请求接口

import {Controller, Get,Param} from '@nestjs/common';
@Controller('shark')
export class SharkController {
    // 路由路径/shark
    @Get()
    findAll() {
        return {
            message: 'shark',
            name: 'shark'
        };
    }
    // 嵌套路由路径/shark/fish
    @Get('fish')
    findFish(){
        return 'fish'
    }

    // 路由传参
    // 路径/shark/:id
    @Get(':id')
    findFishById(@Param('id') id:string){
        return `return fish by #${id}`
    }
}
```

### Post请求

```typescript
  	@Post()
	// 路径/shark
    @HttpCode(HttpStatus.GONE)// 返回410状态码
    addFish(@Body() body:any){
        // body表示请求头里面的body参数
        return {
            code:111
        }
    }
```

除此之外，我们还可以使用express库的基础api

```typescript
    @Get()
	// 路径/shark
    findAll(@Res() response) {
        // 使用express库的api
        return response.status(200).send('hello world')
    }
```

### Patch和Delete请求

```typescript
@Patch(':id')
// 路径/shark/:id
updateFish(@Param('id') id:string){
    return `update fish by #${id}`
}

@Delete(':id')
// 路径/shark/:id
deleteFish(@Param('id') id:string){
    return `delete fish by #${id}`
}
```

## 请求体传参

> Params传参

```typescript
@Delete(':id')
deleteFish(@Param('id') id:string){
    return `delete fish by #${id}`
}
```

> query传参

```typescript
 @Get('query')
    findFishByQuery(@Query() pagination){
        const {limit,offset} = pagination
        return `return fish by query limit:${limit},offset:${offset}`
    }
```

> Body传参

```typescript
 @Post()
    @HttpCode(HttpStatus.GONE)// 返回410状态码
    addFish(@Body() body:any){
        return body
    }
```

