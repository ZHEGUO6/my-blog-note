# 黑马程序员视频笔记

## 接口

接口可以继承

```TypeScript
interface IUser {
    name: string;
    age: number;
}

// 接口继承 实现复用
interface IUser2 extends IUser {
    sex: string;
}

const obj: IUser2 = {
    name: 'zhangsan',
    age: 18,
    sex: '男'
}
```

## 元组

![img](https://uigp2ahyt1w.feishu.cn/space/api/box/stream/download/asynccode/?code=ZjBmYzk5YzE4YzNjNDdlZTg0ZWQ1N2UwMzM0NTM4MTZfTWIwVHRjdEdyT2RGMXBrU2lORXdROXp5MHMxVDNJZkZfVG9rZW46TWFqdmJ3bDcyb25hSkh4N0RXZ2NjOXUxblg1XzE3Mjc0MDAzNzc6MTcyNzQwMzk3N19WNA)

```TypeScript
// 使用元组(Tuple)
// 元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。
let position: [number, number] = [1, 2];
let position2: [number, string] = [1, '2'];
```

## 类型推论

![img](https://uigp2ahyt1w.feishu.cn/space/api/box/stream/download/asynccode/?code=NDA5YzhhYzU0YWVkZjc3MDg2ZmEzY2ZiNjQyMDg4ZmNfaTNxTVo1T3NCV0d0QVRUNWljRUFXT1NsYzdyRmozWDlfVG9rZW46VFBraGJkdExBb2VIMUR4ZllXMGN3U3FrbnNoXzE3Mjc0MDAzNzc6MTcyNzQwMzk3N19WNA)

```TypeScript
// 类型推论 隐式类型推断
let age = 18 // 只限定于立即初始化变量的情况

// 如果声明变量后没有立即初始化，那么变量的类型需要手动赋值
let a: number
a = 18

function fn(a: number, b: number) {
    return a + b
}

fn(1, 2)
```

## 类型断言

![img](https://uigp2ahyt1w.feishu.cn/space/api/box/stream/download/asynccode/?code=YzRkMTk5NDFjM2UzNjNiNWI5ZGE3NTIxM2Q4YTlmN2RfbUNZRkVabVJlRXNhSkN5UFJya0FWRnBSOUxqM1RjZEFfVG9rZW46RmU0RmJTVU1HbzJoSmR4UWI0WGNDUGREbk5YXzE3Mjc0MDAzNzc6MTcyNzQwMzk3N19WNA)

```TypeScript
// 语法一： 类型断言 as 把一个不确定的类型转换为另一个类型
let a: unknown
let b: string
a = '111'
b = (a as string)


// 语法二 <> 把一个不确定的类型转换为另一个类型
let c: unknown
let d: string
c = '222'
d = <string>c
```

## 字面量类型

![img](https://uigp2ahyt1w.feishu.cn/space/api/box/stream/download/asynccode/?code=Zjg5Y2FkZTZkMzY5NWM1MGEyNzMwZjlhZWVmYTg5ZTFfa0w0c0lROVJuVVM0ZTFpajQ4aWhNWTROVnp6VW1NVGNfVG9rZW46SlZkcmJJQzd6bzh3MmV4endTUWNKQXpobmZmXzE3Mjc0MDAzNzc6MTcyNzQwMzk3N19WNA)

![img](https://uigp2ahyt1w.feishu.cn/space/api/box/stream/download/asynccode/?code=YjIzODNmMGIyZGFiMDdiMDAwNGUzNjM4YTJhOWUzZTJfU1R4VXNLUFlMZ2t6Z0RIejNkRmtHcXdaclNZWVIwUVRfVG9rZW46RmQyOGI3b2pFb2N4UER4SHZqSmNWYmhGbjZlXzE3Mjc0MDAzNzc6MTcyNzQwMzk3N19WNA)

```TypeScript
let a : 1 | 2 | 3 ;
a = 1;

let age : 18 = 18
let str : 'Hello TS' = 'Hello TS'
```

## 枚举

![img](https://uigp2ahyt1w.feishu.cn/space/api/box/stream/download/asynccode/?code=NDgwNWM4ZTgwYmQyNDUzZTVmMGIzMDdjNWIzZmM3ZTVfQkNzWDREUVVBU2YxQmlyOWpBbzRwaW12MEFjOHBETjlfVG9rZW46VTdlamJWSW5ub3l6dEN4VEJXZWNiTUx4blJkXzE3Mjc0MDAzNzc6MTcyNzQwMzk3N19WNA)

![img](https://uigp2ahyt1w.feishu.cn/space/api/box/stream/download/asynccode/?code=YmQ3MDdiYjEzNzMyZWE1YWNmMjQyNTA1NGM3ZTJmY2NfVllsS25TYVlTTnRKWHVFNXQ3a0JWSWxPN1RwcUNBek9fVG9rZW46UnJrb2JrdGZEb3ExTFF4WDNndmNpQ3F1bnloXzE3Mjc0MDAzNzc6MTcyNzQwMzk3N19WNA)

```TypeScript
enum Direction {Up, Down, Left, Right}

enum Color {Red, Green, Blue, Purple}

function changeDirection(direction: Direction) {
    console.log(direction)
}

changeDirection(Direction.Up)
```

字符串枚举：枚举成员的值是字符串。

```TypeScript
// 字符串枚
enum Direction2 {Up = 'UP', Down = 'DOWN', Left = 'LEFT', Right = 'RIGHT'}
```

## Any 类型

![img](https://uigp2ahyt1w.feishu.cn/space/api/box/stream/download/asynccode/?code=ZGU3ZDlkYTY0OGU5YjQwNzg2ZDJiN2FmNjg5MzQ2YzdfWUgydkQ3c1Z6R2kxcHdvTDBJck9JWTdHYjdUNWpLWnJfVG9rZW46WHd5VGI4NkIwb01FMzd4NU1jVWNOaGg2bklmXzE3Mjc0MDAzNzc6MTcyNzQwMzk3N19WNA)

```TypeScript
let obj: any = {x: 0}

obj.aaa = 1
console.log(obj)
// 不报错 失去了类型保护
let a: number = obj
```

## Typeof 操作符

![img](https://uigp2ahyt1w.feishu.cn/space/api/box/stream/download/asynccode/?code=ZjNhODE1MWU5MjdiNzMyOWZkYmY5YWRlYTFkMThiN2VfVllQUG9JcVFHd0hhVzk5RXRnMkhSV0ozQjQ1YjJ1ZU5fVG9rZW46SGNOc2JuWFczb2puU2R4VzNpTWNIRGRkbk5kXzE3Mjc0MDAzNzc6MTcyNzQwMzk3N19WNA)

```TypeScript
let p = {
    x: 1,
    y: 2
}
console.log(typeof 'Hello')
function fn(obj: typeof p) {
    console.log(obj.x, obj.y)
}

fn({x: 1, y: 2})
```

Readonly 只读修饰符

![img](https://uigp2ahyt1w.feishu.cn/space/api/box/stream/download/asynccode/?code=MzQwNzYyNmFlNjZiYmE5OTM2NTAxZTg4NDlkYTM3NTBfUnljRnhXaHN0bjVDMjB2eE1Xc1JTSkM3VW95OHp4dEFfVG9rZW46WXU0SmJQTnowb2x6OHJ4TTR1VGNSNlBCbnFoXzE3Mjc0MDAzNzc6MTcyNzQwMzk3N19WNA)

```TypeScript
class Person {
    readonly name: string = '折果';
    // readonly name = '折果'; 字面量赋值，不能修改，相当于const name = '折果'

    constructor(name: string) {
        this.name = name
    }

    // readonly 只能修饰属性 不能修饰方法
    // 添加只读修饰符之后 不能修改 只能读取
    // set _name(newName: string) {
    //     this.name = newName
    // }
}

const p = new Person("折果1");
console.log(p.name)


interface  User {
    readonly name: string;
}

let obj : User = {
    name: '折果'
}

// obj.name = '折果1'  只读属性，不允许修改
```

## 类型兼容性

![img](https://uigp2ahyt1w.feishu.cn/space/api/box/stream/download/asynccode/?code=N2NjM2ViZWI5MTgwNGExNjBkNDdlMzA1ZjdkNjNjYzhfWFdrUnd1SmN2RWRsRUY1MUFvMExEOWRRMkNMOEFFdVNfVG9rZW46SFdNVWJQUjJzb1Y0V2V4QUJxZ2N1NEtibmdrXzE3Mjc0MDAzNzc6MTcyNzQwMzk3N19WNA)

```TypeScript
// 类型兼容
class A {
    name: string;
    age: number;
}

class B {
    name: string;
    age: number;
}

// TS 采用的是结构化类型系统
let a: A = new B()
```

对象类型兼容性

![img](https://uigp2ahyt1w.feishu.cn/space/api/box/stream/download/asynccode/?code=NjUzZjMwNWIyZTJmZTliODBhMjY1OTkyZWZjNWU2OTNfNzRrY1N2aVd2SFJqdDdyNWhBbjljU2xEU3RLVXdzYWFfVG9rZW46U2pTQWJWUlBibzU0dGV4YXhrN2NJUVl2blBkXzE3Mjc0MDAzNzc6MTcyNzQwMzk3N19WNA)

接口类型兼容性

![img](https://uigp2ahyt1w.feishu.cn/space/api/box/stream/download/asynccode/?code=NTYwNzRhZTA3NmY1YjQ4NzAwNmY1Mjg2MmE2YjIwZDJfYXROV2dheWc5OXlTbjFyN0MxcmExRDlVaDdtZHQySHVfVG9rZW46RnFjMWJyazR2b3QwY0V4Wk1vVWN5RlFNbmVkXzE3Mjc0MDAzNzc6MTcyNzQwMzk3N19WNA)

函数兼容性

![img](https://uigp2ahyt1w.feishu.cn/space/api/box/stream/download/asynccode/?code=MTcyZmVjNTQ2NDNkMjEyOTFhYjg0MGNiY2QwNzVlMzRfNlpyMDBiUjkwallsUVpMbWJMV1hRYUxJZm1wSVZxTXhfVG9rZW46QUNSZGJYbVdHb3RUY0V4MWlzR2NaSG1HblNnXzE3Mjc0MDAzNzc6MTcyNzQwMzk3N19WNA)

![img](https://uigp2ahyt1w.feishu.cn/space/api/box/stream/download/asynccode/?code=OGE4M2IwODhjZTUxMWRiNDE5ZmRjYzJjZTdhYmVjY2FfczRZRE54TUdmTmRhM3JRS3hraExJSW9ERXRrQU1reUVfVG9rZW46S1lyZmJBTklsb1k5NHJ4cjRLZWNaRzZvblZnXzE3Mjc0MDAzNzc6MTcyNzQwMzk3N19WNA)

![img](https://uigp2ahyt1w.feishu.cn/space/api/box/stream/download/asynccode/?code=ODA1YTI2N2VkN2QwMDQ2YzUzN2YzZmNlZWQwOTRjNjFfWGhsb2g2YmZsbm9GRENMSDc0N1NrZ0NocGZ6QmFlZVpfVG9rZW46UUpLMmI0a3Fkb0hVTk94cXVWTmMzUFNLbjZmXzE3Mjc0MDAzNzc6MTcyNzQwMzk3N19WNA)

函数返回值类型兼容

![img](https://uigp2ahyt1w.feishu.cn/space/api/box/stream/download/asynccode/?code=ZjQ2N2FiZDgwNWFkMzAyN2U4NzRjMzAwZjNjMWRiYzFfM1I0emMxbFkweGs3WGxlN1Bvb0dKWkpmOFhrOGNpM21fVG9rZW46WVU4TmJGdjdvbzF4S0x4d2hzZWNxdzF0bkxjXzE3Mjc0MDAzNzc6MTcyNzQwMzk3N19WNA)

```TypeScript
// 返回值类型兼容
type F3 = () => number
type F4 = () => string
// let f4 : F4 = f3  返回值类型不兼容

type F5 = () => { age: number }
type F6 = () => { age: number, name: string }

// 多的赋值给少的
let f6: F6
let f5: F5 = f6
```

## 交叉类型

![img](https://uigp2ahyt1w.feishu.cn/space/api/box/stream/download/asynccode/?code=MGI2MGIxMWE0ODg3MGQ2ZjY3Y2E0NWFmNjNmMjJhZWZfcGk2WTV3S0ZLRDJaM0lONXF6dEE0ajVxZGhZajJldlBfVG9rZW46SXc4MmJLS1BFb2dsOUF4N2RhSGNTRTg3blhkXzE3Mjc0MDAzNzc6MTcyNzQwMzk3N19WNA)

```TypeScript
interface A {
    name: string;
    age: number;
}

interface B {
    gender: string;
}

// 类型别名 和接口很像，但是接口只能用于对象类型，而类型别名除了对象类型，还可以用于原始类型、联合类型、元组类型等。
// 交叉类型 使用&将多个类型合并成一个类型
type C = A & B
let c: C = {
    name: 'why',
    age: 18,
    gender: '男'
}
```

交叉类型和接口继承之间的对比

![img](https://uigp2ahyt1w.feishu.cn/space/api/box/stream/download/asynccode/?code=NjdkNTQ2MWMxMWIwYTVmMWQ5NjQxYzM1ZDgzNTNhZThfa3ZzQmV3YjlxMEJ4UnpYQVl4ZE1FRTNLanlVRW9TdmZfVG9rZW46WnFkYWJpSGhNb0JzOTN4MkdPY2NLU3A2bklkXzE3Mjc0MDAzNzc6MTcyNzQwMzk3N19WNA)

```TypeScript
interface D {
    fn: (val: number) => void
}

interface E {
    fn: (val: string) => void
}

type F = D & E

let f: F = {
    fn(val: number | string) {
        console.log(val)
    }
}

f.fn(123)
```

## 泛型

![img](https://uigp2ahyt1w.feishu.cn/space/api/box/stream/download/asynccode/?code=YTY1Nzg2NmQ3YzBkMzcxOWVhZDliZjNiNWQ4ZjAyYTVfNTd4RUNrVEJuNmZwSVhpc1A4cGFrVWN4aHRMYmRkZFNfVG9rZW46RDE2M2JVc2VIb2lnWVB4Yk11YmNnS0dUbnJkXzE3Mjc0MDAzNzc6MTcyNzQwMzk3N19WNA)

![img](https://uigp2ahyt1w.feishu.cn/space/api/box/stream/download/asynccode/?code=YjZlOTFmMTFhYzBlZGFmM2FjNjg4NWVhYmRkYzU4YzlfUXA4T2tvT0Nxa01tZUhJT0VtOG1XdDNqWFc5ajQwdHNfVG9rZW46WGtTR2JBalZkb1NBRTR4cklGSGNHSjBybnNjXzE3Mjc0MDAzNzc6MTcyNzQwMzk3N19WNA)

![img](https://uigp2ahyt1w.feishu.cn/space/api/box/stream/download/asynccode/?code=Nzk5N2Y2MzZmNWU5NzAwMDc3MDQyM2YzYmZiZjVlYWFfcGdLOXBiNXVDV2g4N1FseUI1a0JIam1wRkNvUFRhOFVfVG9rZW46TnYxdWJSZUVubzhTYkF4dXF4ZWMwa2pEbmViXzE3Mjc0MDAzNzc6MTcyNzQwMzk3N19WNA)

```TypeScript
// 泛型 定义一个未知泛型<T> 传入类型是什么，<T>就代表什么类型
function id<T>(value: T): T {
    return value;
}

console.log(id<number>(1))
console.log(id<string>('1'))
```

![img](https://uigp2ahyt1w.feishu.cn/space/api/box/stream/download/asynccode/?code=MDc3OGJjZjQ1ODcyNGUzZmM0NDU2Y2ZjMWU5YmEyNGJfTHRwV1pJNkNEd3pyYlFJdTZEVVdkd0x2NlBHSjF1M3VfVG9rZW46RHNBNmJYQTE5b2o3ZnF4Q0N5YmMwNmo3blJkXzE3Mjc0MDAzNzc6MTcyNzQwMzk3N19WNA)

```TypeScript
// 泛型 定义一个未知泛型<T> 传入类型是什么，<T>就代表什么类型
function id<T>(value: T): T {
    return value;
}

let num = id(111)
let tr = id(true)
```

泛型约束

![img](https://uigp2ahyt1w.feishu.cn/space/api/box/stream/download/asynccode/?code=ZjA1Yzc4NWUyYjlhOTU3MzhmNjdjMmUxYzg3ZWRhNDBfblF5MDFNN2ZQNDFIUFVHQmpsN3dNOGhFSzQwWkdUd3RfVG9rZW46WnZnSmIzbjdIb3ZJTk94UERhZGN1V2lhblViXzE3Mjc0MDAzNzc6MTcyNzQwMzk3N19WNA)

![img](https://uigp2ahyt1w.feishu.cn/space/api/box/stream/download/asynccode/?code=ZTRiMjU2MTM5NzMwMzczZDRmYmFkZDVkZTc4NTA5MTBfdjVuZXF3cVlXNmtnNVEybEw1UWNDQmJlenViblVkZ3lfVG9rZW46TDRHdGJFeGw0b3dNRnh4WW0wSWM0Y3pGblFiXzE3Mjc0MDAzNzc6MTcyNzQwMzk3N19WNA)

```TypeScript
//泛型约束
// 指定value 类型为数组
function qqq<T>(value: T[]): T[] {
    console.log(value.length)
    return value;
}

qqq([1, 2, 6, 3])

interface LengthWise {
    length: number;
}
// extends不是继承，T 必须包含length 属性
function qqq2<T extends LengthWise>(value: T): T {
    console.log(value.length)
    return value;
}
qqq2([1, 2, 3]) // 必须包含length 属性
qqq2({length: 1}) // 必须包含length 属性
```

![img](https://uigp2ahyt1w.feishu.cn/space/api/box/stream/download/asynccode/?code=NjZlYTY4OTEzYTk4N2U2YWFkYTFiNmU4MWQ0YzEwODlfS3AxQ2lDR1c3RUR1UXRpblI1Z0dIUEJpSVRMNWNiOHVfVG9rZW46TW1hQWJ5UE5Cb2VYeWV4MHZHU2NQR1UzbjdlXzE3Mjc0MDAzNzc6MTcyNzQwMzk3N19WNA)

```TypeScript
// 多个约束
function qqq3<T, K extends keyof T>(obj: T, key: K): T[K] {
    console.log(obj[key])
    return obj[key]
}

// K extends keyof T 表示K 必须是T存在的key
// 返回值是T[K]

let U = {
    name: '111111',
    age: 2
}

qqq3(U, 'age')
qqq3(11,'toFixed')
```

泛型接口

![img](https://uigp2ahyt1w.feishu.cn/space/api/box/stream/download/asynccode/?code=MDMzOGFlYmM4M2YxMGY0ZTQwMWNiNTY2ZDgyM2VmNGVfZ0RlUmZoTzVodXkyalBBcE16bEREVGpaaEE4aDJJTGxfVG9rZW46TjZFZmJxbmJDbzdPaG54MHh0SGNGWDZzbmhnXzE3Mjc0MDAzNzc6MTcyNzQwMzk3N19WNA)

```TypeScript
//泛型接口
interface CreateArrayFunc<T> {
    id: (value: T) => T;
    createArray: (length: number) => T[];
}

let obj: CreateArrayFunc<number> = {
    id: (value: number) => {
        return value;
    },
    createArray: (length: number) => {
        return [1, 1, 1]
    }
}
```

泛型类

![img](https://uigp2ahyt1w.feishu.cn/space/api/box/stream/download/asynccode/?code=ZWYwNmJiZGRkYzE3YTA0YmE5MDJhMTY0NzZiODQ3NmNfMmpSclJ3blV4d1RlTjhaUXg5RXl5Q0ZVdlFlZ1p0QzBfVG9rZW46WEtFU2JMZEt4bzdsMnB4aDBETGM3ZFVEbkdlXzE3Mjc0MDAzNzc6MTcyNzQwMzk3N19WNA)

```TypeScript
class MyArray<T> {
    defaultValue: T;

    constructor(defaultValue: T) {
        this.defaultValue = defaultValue;
    }

    add(value: T) {
        console.log(value)
        return value;
    }
}

// 泛型类 <>不加自动识别类型
const myArray = new MyArray('这鬼婆');
const myArray2 = new MyArray<number>(1);
myArray.defaultValue = '鬼'
console.log(myArray2.defaultValue)
```

泛型工具类型

![img](https://uigp2ahyt1w.feishu.cn/space/api/box/stream/download/asynccode/?code=ZDg2ZjcxZDhkMjMxZDA3YjhlOGYxY2UxN2E1MzMxZTFfYXpWUVFuMzFnVGl0aVlxZk5SaDFPNlNUR0djRWg1NTZfVG9rZW46TFVHTWJsVk5Eb2Z4N1J4YWJCZ2NhYm1mblZnXzE3Mjc0MDAzNzc6MTcyNzQwMzk3N19WNA)

```TypeScript
interface IUser {
    name: string;
    age: number;
}

type PartProps = Partial<IUser>

// 这个工具类把所有属性都变成可选的
let user: PartProps = {
    name: 'zhangsan',
    age: 18
}
```

![img](https://uigp2ahyt1w.feishu.cn/space/api/box/stream/download/asynccode/?code=ODk5MGU2ZDgzYTlkOGM0YmFmZjc0NDZkYWU2NDE4MjZfbDNSSDlBNHlSUEQ3dlpUWXFyZHlxY2g1YnVxZFJ1VGlfVG9rZW46TUxZSmJjVUNPbzIwb3h4SGZUWGNVR3Vmbm9iXzE3Mjc0MDAzNzc6MTcyNzQwMzk3N19WNA)

```TypeScript
interface IUser {
    name: string;
    age: number;
}

// 将所有属性变为只读的
type ReadonlyProps = Readonly<IUser>

let user2: ReadonlyProps = {
    name: 'zhangsan',
    age: 18
}

// user2.name = '111' 错误，只读不可修改
```

![img](https://uigp2ahyt1w.feishu.cn/space/api/box/stream/download/asynccode/?code=OTE3NmNjNzhmNjdhZjZkYTJkNjFjODFjZDllNzE4ZTdfTTh0eU9OMHU1RW9qQXQxWXpFbVFVT2VxQkIxQnlIUDRfVG9rZW46VzJLc2JqcDZzb0ljU3N4ZTBFZGNJeWtHblJjXzE3Mjc0MDAzNzc6MTcyNzQwMzk3N19WNA)

```TypeScript
interface IUser {
    name: string;
    age: number;
}

// 选择接口里面的某些属性构造成一个新的类型
type PickProps = Pick<IUser, 'name'>
// PickProps只有name一个属性 
// 加上age type PickProps = Pick<IUser, 'name' | 'age'>

let user3: PickProps = {
    name: 'zhangsan'
}
```

![img](https://uigp2ahyt1w.feishu.cn/space/api/box/stream/download/asynccode/?code=Y2QxYzJkODM2ZDZkYWVkNWZhNjdkNGNlNmI0OThmNmVfWm1rYmRPcGd6WG9iYmFOamhoQWxNZUpaTVRmNXp3R0NfVG9rZW46U1JRdGI1SmJZb1RrQ3l4dThZNWNGOHp0blZlXzE3Mjc0MDAzNzc6MTcyNzQwMzk3N19WNA)

```TypeScript
// 传入属性键值和属性类型 构造一个对象类型
type RecordProps = Record<'name' | 'age', string>
let user4: RecordProps = {
    name: 'zhangsan',
    age: '18'
}
```

## 索引签名类型

![img](https://uigp2ahyt1w.feishu.cn/space/api/box/stream/download/asynccode/?code=MTU1MThjZjVmZGVkMTVlMGUyY2UyM2MwNTUzZGE5MTFfYmhkQzNKR2pPRUFyeWt4NkxBNjlXeXN3T2V0dkc5UERfVG9rZW46RU5UZGJJc09Ob21wbUx4OVRYY2NBcjhlbjNmXzE3Mjc0MDAzNzc6MTcyNzQwMzk3N19WNA)

```TypeScript
interface AnyObject<T> {
    [key: string]: T
}

let a: AnyObject<number> = {
    name: 1,
    age: 2,
    sex: 3
}

interface myArray<T> {
    [index: number]: T
}

let arr: myArray<number> = [1, 2, 3]
```

## 映射类型

![img](https://uigp2ahyt1w.feishu.cn/space/api/box/stream/download/asynccode/?code=NmEzODQyMmUzY2YyYjhmOGM4ZDgzODEwMzg3Y2JlNDdfOVpiekxlNWpBM2VQSjkwVk5NRHhJUlVXV1FJS1JJRnNfVG9rZW46UGkya2JNZkJjbzllZ2J4VjZ2U2M1SFYybnhiXzE3Mjc0MDAzNzc6MTcyNzQwMzk3N19WNA)

![img](https://uigp2ahyt1w.feishu.cn/space/api/box/stream/download/asynccode/?code=NzA2YzY3YWE3YjlkMDEwNTE3MjgwMWY3ZmRjOGM2YzFfYTlWaHFsRWFUcEJEZUlpWjFSNzhHY3hvd09QTjl1RzlfVG9rZW46QWZHc2JxVDJTb3pLT2p4OHFJdGNyRFhHblpnXzE3Mjc0MDAzNzc6MTcyNzQwMzk3N19WNA)

```TypeScript
type PropKeys = 'x' | 'y' | 'z';
type Type1 = {
    x: number;
    y: number;
    z: number;
}

type Type2 = { [key in PropKeys]: number }

let t2: Type2 = {x: 1, y: 2, z: 3}

type Type3 = { [key in keyof Type1]: number }

let t3: Type3 = {x: 1, y: 2, z: 3}


// partial 实现
type Partial<T> = {
    [key in keyof T]?: T[key];
}
type Props = { a: number; b: number; c: number }
type PropTypes = Partial<Props>;
let obj: PropTypes = {a: 1}
```

![img](https://uigp2ahyt1w.feishu.cn/space/api/box/stream/download/asynccode/?code=NDNiN2NlNjFmMjk2YjhkOTA0ZmY4MTYwMjVkYjJkN2NfWWEzYVA2TU9HMlFhSmEyZGlGQmZsMlp4ekp5WmtRbzRfVG9rZW46RmRnRWJRQm9rb1FnOG94bmxMZWN5WVBHbjNiXzE3Mjc0MDAzNzc6MTcyNzQwMzk3N19WNA)

同时查多个索引类型

![img](https://uigp2ahyt1w.feishu.cn/space/api/box/stream/download/asynccode/?code=NWQ0ZWU2ZjI0ODMxNGFkYzdmMjhhOTE4OTljNWFlNjJfSGpCYVlrMlpTa3RWaTJTa3VwS3RtcGdVemhCak1CSUlfVG9rZW46TGZPU2JGbDZ1b2FPMG14b0dBdmNsWWJSbm1kXzE3Mjc0MDAzNzc6MTcyNzQwMzk3N19WNA)

## 类型声明文件

![img](https://uigp2ahyt1w.feishu.cn/space/api/box/stream/download/asynccode/?code=ZDhkOGY0ZjEyOTI3ZGY5YWQwN2YyMjNjYjlhMGY4NzZfdGhPWG9YWXF0VVlzZHA2cjEzeUtyNkx6Y1JFU1ppcmJfVG9rZW46RWloNGJiRmxCb2Q3NzZ4VGo1bWN0RHp0bkdmXzE3Mjc0MDAzNzc6MTcyNzQwMzk3N19WNA)