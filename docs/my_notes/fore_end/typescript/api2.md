# 尚硅谷视频笔记

## 基本类型

类型可以添加给形参，变量，函数返回值。

### 代码

```TypeScript
// 字面量
let a : 10
a = 10 // a只能等于10

// 联合类型
let a : 'male' | 'female'
let b : boolean | string


// any 任意类型  可以赋值给任意类型变量（不建议）
let a : any
let a; // 隐式声明

// unknown 未知类型 类型安全的any
// unknown 类型的变量，不能直接赋值给其他变量
let u : unkonwn;
u = 10;
u = 'qqq';
let s : string
if(typeof u === 'string'){
    s = u
}

// 类型断言 告诉编译器，变量的值是某一类型
/*
* 语法：
*  <类型>变量名
*  变量名 as 类型
* */
let someValue: unknown = "this is a string";
let someString: string = (someValue as string);
let someString2: string = <string>someValue;

// void 类型 表示没有任何类型
function warnUser(): void {
    console.log("This is my warning message");
}

// never 类型 表示的是那些永不存在的值的类型
function error(message: string): never {
    throw new Error(message); // never 主要用于抛出错误 
}

// object 类型 表示非原始类型，也就是 number，boolean，string，symbol，null，undefined
// 以及它们对应的对象包装类型如 String，Boolean，Number，Symbol，BigInt。
let obj: object
obj = {name: 'zhangsan'}
obj = function () {
    return 'hello'
}
// ? 表示可选属性 允许有，也可以没有
let obj2: { name: string, age?: number }
obj2 = {name: 'zhangsan', age: 18}

// 表示任意类型的属性 可以添加任意个属性
let obj3: { name: string, age: number, [propName: string]: any }
obj3 = {name: 'zhangsan', age: 18, gender: '男', height: 1.88}

// 定义一个函数类型 x,y为参数，返回值为number
/*
* 语法：
*  (参数列表) => 返回值类型
*  参数列表：x,y
*  返回值类型：number
* */
let myAdd: (x: number, y: number) => number
myAdd = function (x: number, y: number): number {
    return x + y
}


/*
 * array类型 表示数组类型
* 语法：
*  类型[]
*  Array<类型>
* */
let list: number[] = [1, 2, 3]
let list2: Array<number> = [1, 2, 3]

// 元组 ，固定长度的数组，元素类型可以不同
/*
* 语法：
*   [类型1,类型2]
*   Array<类型1,类型2>
* */
let info: [string, number]
info = ['zhangsan', 18]

/*
* enum 枚举类型
* 语法：
*   enum 枚举名 {}
* */
enum Color {Red, Green, Blue}
let user = {
    name: 'zhangsan',
    age: 18,
    color: Color.Red
}
// & 表示运算符，表示同时满足两个条件
let sex : {name: string} & {age: number}
sex = {name: 'zhangsan', age: 18}

// 类型别名 自定义一个类型
type NameList = 1 | 2 | 3
type Name = string
let myname: Name = 'zhangsan'
let myname2: NameList = 1
```

## 编译选项

Tsc  xxx.ts  => xxx.js

1. -w  监听ts文件变化，自动更新到js文件

## 配置tsconfig.json 文件

```JSON
tsconfig.json // ts编译器配置文件
{
  "include": [
    "./src/**/*"
    // 表示src根目录下的所有ts文件都需要编译
    /*
    路径：
        /** 表示任意目录
        /* 表示任意文件
    */
  ],
  "exclude": [
    "./src/node/**/*"
    // 表示src/node目录下的所有文件不需要编译
  ],
  "extends": [
    "./tsconfig.base.json"
    // 继承tsconfig.base.json配置
  ],
  "files": [
    "./src/index.ts",
    "./src/index.tsx"
    // 指定编译文件
  ],
  "compilerOptions": {
    // 编译选项
    "target": "es6",
    // 指定编译目标版本
    "module": "es6",
    // 指定模块化规范,
    "lib": [
      "es6",
      "dom"
    ],
    // 指定编译时使用的库
    "outDir": "./dist",
    // 指定编译输出目录
    "outFile": "./dist/index.js",
    // 将全局作用域中的代码合并为一个文件
    "allowJs": false,
    // 是否允许编译js文件 默认是false
    "checkJs": false,
    // 是否检查js文件
    "removeComments": false,
    // 是否移除注释
    "noEmit": false
    // 是否禁止编译
    "noEmitOnError": false,
    // 编译错误是否停止编译
    "strict": true,
    // 是否启用严格检查(总开关)
    "alwaysStrict": false,
    // 是否启用严格模式
    "noImplicitAny": false,
    // 是否允许隐式any类型
    "noImplicitThis": false,
    // 是否允许this隐式any类型
    "strictNullChecks": false
    // 是否启用严格空检查
  }
}
```

## webpack打包ts代码

### 配置webpack.config.js 文件

```JavaScript
const path = require('path');

// webpack配置模板
module.exports = {
    // 指定入口文件
    entry: './src/index.ts',
    output: {
        // 指定打包文件的目录
        path: path.resolve(__dirname, 'dist'),
        // 打包后的文件名
        filename: 'bundle.js'
    },
    // 指定webpack打包时要使用此模版
    module: {
        // 指定要加载的规则
        rules: [
            {
                test: /\.ts$/, // 匹配.ts文件
                use: 'ts-loader', // 使用ts-loader
                exclude: /node_modules/ // 排除node_modules
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    }
}
```

## 面向对象

### 类 class

```TypeScript
class Person {

    /*
    *  对象里面包含两个部分
    *   1.属性
    *   2.方法
    * */
    // 定义实例属性 创建实例才能访问
    name: string = '张三'
    //  定义静态属性(类属性) 直接通过类访问
    static age: number = 18
    // 只读属性，初始化后不允许修改
    readonly gender: string = '男'



    /* 定义方法
    * 如果方法以static 开头，表示静态方法，直接通过类访问，不能通过实例访问
    * */
    sayHello() {
        console.log('hello')
    }
}

const per = new Person()
console.log(per.name)
console.log(Person.age)
per.sayHello()
```

### this和构造器

```TypeScript
class Dog {
    name: string;
    age: number;
    /**
     * 构造函数
     *
     * @param name - 对象的姓名属性，用于初始化对象的姓名属性
     * @param age - 对象的年龄属性，用于初始化对象的年龄属性
     */
    constructor(name: string, age: number) {
        // this 表示当前对象的实例
        this.name = name;
        this.age = age;
    }

    bark() {
        console.log('汪汪汪');
    }
}

const dog = new Dog('旺财', 3);
const dog2 = new Dog('小黑', 2);
console.log(dog)
console.log(dog2)
```

### 继承和super关键字

```TypeScript
(function () {
    class Animal {
        name: string
        age: number

        constructor(name: string, age: number) {
            this.name = name
            this.age = age
        }

        say() {
            console.log(`${this.name} ${this.age}`)
        }
    }

    /**
     * Dog类是Animal类的子类，用于表示狗这种动物
     * 继承自Animal类，使得Dog类可以复用Animal类中的属性和方法
     */
    class Dog extends Animal {
        /**
         * 构造函数，用于创建Dog类的实例
         * 调用父类Animal的构造函数，初始化名称和年龄属性
         * @param name 狗的名字
         * @param age 狗的年龄
         */
        constructor(name: string, age: number) {
            // 继承父类的构造函数
            super(name, age)
        }

        /**
         * 重写Animal类的say方法，使其实现狗的叫声
         * 这是一个实例方法，用于输出狗的叫声
         */
        say() {
            console.log('汪汪汪')
        }
    }

        // 如上所示
    class Cat extends Animal {
        constructor(name: string, age: number) {
            super(name, age)
        }

        say() {
            console.log('喵喵喵')
        }
    }

    const dog = new Dog('旺财', 3)
    dog.say()
 
    const cat = new Cat('小花', 2)
    cat.say()
})()
```

### 抽象类

```TypeScript
(function () {
    /**
     * 以abstract 开头定义抽象类
     * 抽象类和其他类区别不大，只是不能用来创建对象
     * 抽象类是专门用来被继承的类
     * 抽象类 Animal 定义了动物的基本属性和行为
     */
    abstract class Animal {
        name: string
        age: number

        protected constructor(name: string, age: number) {
            this.name = name
            this.age = age
        }

        // 抽象方法，子类必须重写
        abstract say(): void
    }

    // 如上所示
    class Cat extends Animal {
        constructor(name: string, age: number) {
            super(name, age)
        }

        say() {
            // 调用父类的方法 super代表父类
            console.log('喵喵喵',`${this.name}在叫`)
        }
    }

    const cat = new Cat('小花', 2)
    cat.say()
})()
```

### 接口

```TypeScript
(function () {
    // 描述一个对象的类型
    type myType = {
        name: string;
        age: number;
        [propName: string]: any;
    }

    const obj: myType = {
        name: 'why',
        age: 18,
        height: 1.88
    }

    /*
    *   interface 和 type 的区别
    *   1. type 声明基本类型别名，interface 声明对象类型别名
    *   2. type 声明联合类型，interface 声明对象、接口的扩展
    *  接口用来定义一个类结构，和一个类中应该包含那些属性和方法，同时接口也可以当成类型声明去使用
    * 接口可以重复声明，声明合并
    * */
    interface myInterface {
        name: string;
        age: number;
    }

    interface myInterface {
        gender: string;
    }

    // const obj2: myInterface = {
    //     name: 'why',
    //     age: 18,
    //     gender: '男'
    // }

    /*
    * 接口可以在定义类的时候限制类的结构
    * */
    interface myInterface2 {
       name: string;
       run(): void;
    }

    // 定义类时候，通过 implements 关键字实现
    // 定义一个类时，可以使类去满足一个接口
 
    class Person implements myInterface2 {
        name: string;

        constructor(name: string) {
            this.name = name
        }
        run(): void {
        }

    }

})()
```

### 属性封装

```TypeScript
(function () {
    class Person {
        /*
        * TS可以在属性前面添加修饰符
        *   public 修饰的属性可以在任意位置访问（修改）
        *   private 私有属性，私有属性只能在类内部进行访问（修改）
        *   protected 保护属性，只能在当前类和当前类的子类中访问（修改）
        *   readonly 只读属性，不能修改
        *   static 类的属性，直接通过类名访问
        *   默认是public
        * */
        //属性
        private name: string;
        private age: number;

        constructor(name: string, age: number) {
            this.name = name;
            this.age = age;
        }

        // 封装getter和setter 方法
        // 属性存储器
        /*
        * 实例属性可以被任意修改赋值，会导致数据泄露，
        * 封装属性
        * */

        // java中的setter和getter方法
        public getName(): string {
            return this.name;
        }

        setName(newName: string) {
            this.name = newName;
        }

        getAge(): number {
            return this.age;
        }

        setAge(newAge: number) {
            this.age = newAge;
        }

        // TS中的getter 和setter方法
        get _name() {
            return this.name;
        }

        set _name(value: string) {
            this.name = value;
        }

        get _age() {
            return this.age;
        }

        set _age(value: number) {
            if (value < 0) return;
            this.age = value;
        }
    }

    const p = new Person('张三', 18);
})()
```

### 泛型

```TypeScript
/*
*  在定义类或者函数的时候，如果遇到类型不明确就可以使用泛型
* */

function fn<T>(a: T): T {
    return a
}

fn(10) // 不指定泛型，ts会自动识别为number类型
fn<string>('10') // 指定泛型为string类型


/*
* 泛型可以指定多个泛型参数
* */
function fn2<T, K>(a: T, b: K): T {
    return a
}

fn2<number, string>(1, '2')


/*
* 泛型如果继承了接口，则必须实现接口中的属性
* */
interface Inter {
    length: number;
}

function fn3<T extends Inter>(a: T): number {
    return a.length
}

fn3('1')
fn3([1, 2, 3])
fn3(document.querySelectorAll('div'))
fn3({length: 10})
// fn3({name: '1'}) 不行。必须实现接口中的属性

class MyClass<T>{
    name: T;
    constructor(name: T) {
        this.name = name
    }
}

const mc = new MyClass<number>(1)
const mc2 = new MyClass('天命人')
```