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

运行成功，在本地3000端口打开一个HTTP服务。`【http://localhost:3000】`

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



## 创建Service服务

1. `nest g s`

2. 输入服务名称，src目录下面会生成一个你刚才命名的文件夹。

3. 例如你创建了一个shark服务。在 **shark.service.ts** 文件里面。

```typescript
import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {Shark} from "../entities/shark.entities";

@Injectable()
export class SharkService {
    // 模拟数据库
    private sharks: Shark[] = [
        {
            id: 1,
            name: 'Sammy',
            age: 5,
            weight: 40,
            flavor: ['sweet', 'sour']
        },
        {
            id: 2,
            name: 'Bob',
            age: 6,
            weight: 50,
            flavor: ['sweet']
        }
    ];

    // 查询所有数据
    findAll() {
        return {
            code:10000,
            message:'findAll success',
            data:this.sharks
        };
    }

    // 根据id查询单条数据
    findOne(id: number) {
        const shark = this.sharks.find(shark => shark.id === id);
        if (!shark) {
            // 抛出异常，添加状态码
            throw new HttpException(`Shark #${id} not found`, HttpStatus.NOT_FOUND)
        }
        return {
            code:10000,
            message:'findOne success',
            data:shark
        };
    }

    // 创建数据
    create(createSharkDto: any) {
        this.sharks.push(createSharkDto);
        return {
            code:10000,
            message:'success',
            data:createSharkDto
        };
    }

    // 接收一个id，和要更新的数据
    PatchUpdate(id: number, updateSharkDto: any) {
        this.sharks.map(item => item.id === id ? updateSharkDto : item);
        if (this.sharks.filter(item => item.id === id)){
            return {
                code:10000,
                message:'update success',
                data:updateSharkDto
            };
        } else {
            return {
                code: 10001,
                message: 'not found'
            };
        }
    }

    // 接受一个id,删除对应数据
    remove(id: number) {
        this.sharks = this.sharks.filter(item => item.id !== id);
        return {
            code:10000,
            message:'remove success'
        };
    }

}
```

4. 几个异常实例

```typescript
 // 1. 404异常实例，传入一个字符串，包含到message属性里面
	throw new NotFoundException(`Shark #${id} not found`)
	示例：
    {
    "message": "Shark #3 not found",
    "error": "Not Found",
    "statusCode": 404
	}

// 2. http异常实例，传入一个字符串，和一个状态码
	// 抛出异常，添加状态码
	throw new HttpException(`Shark #${id} not found`, HttpStatus.NOT_FOUND)
	示例：
    {
    "statusCode": 404,
    "message": "Shark #3 not found"
	}


```

## 创建新的Module

命令行：`nest g module [name]`

创建之后会在 **app.module.ts** 文件里面的imports插入你创建的module。

```typescript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BeefController } from './beef/beef.controller';
import { SharkController } from './shark/shark.controller';
import { BeefService } from './beef/beef.service';
import { SharkService } from './shark/shark.service';
import { SharkModule } from './shark/shark.module';

@Module({
    // 你创建的module
  imports: [SharkModule],
    // 你创建的controller
  controllers: [AppController, BeefController, SharkController],
   // 你创建的service 
  providers: [AppService, BeefService, SharkService],
})
export class AppModule {}

```

## 创建DTO

**什么是DTO？**

在 Nest.js 中，DTO (Data Transfer Object) 是用于定义和验证数据结构的类。DTO 的主要作用包括：

- 数据验证：确保传入的数据符合预期的格式和类型。
- 数据转换：可以对传入的数据进行一些预处理或转换。
- 数据过滤：可以限制客户端只能访问或修改特定的属性。

命令行：`nest g class shark/dto/create-shark.dto --no-spec --flat`

会创建如下图：·

![](//images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/ZHEGUO6/image/img/202411041717811.png)

安装插件：`npm i class-validator class-transformer`

class-validator：用于数据验证，提供了丰富的装饰器来定义验证规则。
		class-transformer：用于对象之间的转换，例如将请求体转换为 DTO 类的实例。

**DTO数据验证**

```typescript
import {IsString,IsNumber} from 'class-validator';
// 设置类型安全验证 
export class CreateSharkDto {
    @IsString()
    // 必须是字符串
    readonly name: string;
    @IsNumber()
    // 必须是数字
    readonly age: number;
    @IsNumber()
    readonly weight: number;
    @IsString({each:true})
    // 必须是字符串类型的数组
    readonly flavor: string[];
}
```

为了避免每给每个接口都复写冗余的验证代码，可以使用**继承机制**。

安装**@nestjs/mapped-types**插件

```typescript
// update.dto接口继承create.dto接口的验证机制

import {PartialType} from '@nestjs/mapped-types'
import {CreateSharkDto} from './create-shark.dto'
export class UpdateSharkDto extends PartialType(CreateSharkDto){}
```

**ValidationPipe的白名单机制**

```typescript
// 在main.ts里面
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    // 白名单 只会返回DTO里面包含的数据，别的字段会被筛选出去
    whitelist: true,
    // 如果请求的字段多余DTO的字段，就会报错，并告诉你多余的字段
    forbidNonWhitelisted: true
  }))
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
```

