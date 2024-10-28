# 前端数据结构与算法

## 简单排序

```js
let arr = new Array(1, 2, 3)
    console.log(arr)

    let arr1 = [3, 89, 63, 74]
    // 正序
    arr1.sort((x, y) => x - y)
    console.log(arr1)
    //
    // 倒序
    let arr2 = [2, 5, 68, 7]

    arr2.sort((x, y) => y - x)
    console.log(arr2)

    // console.log(arr2.concat(arr1,20,30,10).sort((x,y)=>x-y))
    // 集合嵌套数组 排序
    let obj1 = [
        {
            name: "tiechui",
            age: 10
        }, {
            name: "李国哲",
            age: 30
        }, {
            name: "郭德纲",
            age: 20
        }
    ]

    obj1.sort((x, y) => x.age - y.age)
    console.log(obj1)

```

## 迭代方法

```js
 //     迭代方法 every some filter map foreach reduce


    let arr = [10, 20, 12300, 56, 74]
    // every()方法  返回值为Boolean值
    // 遍历检查数组每一项是否符合回调函数规则 是返回true 否返回false
    // let res = arr.every(item => item > 1000)

    // some()方法 返回值为Boolean值
    // 遍历检查数组每一项是否符合回调函数规则 只要有一项元素符合就会返回true
    // let res = arr.some(item => item > 1000)


    // filter()方法  把符合条件的数组每一项元素过滤到一个新数组
    // 返回值为数组
    // let res = arr.filter(item => item > 20)

    // map()方法  映射到数组的每一个元素
    // 返回值为数组
    // let res = arr.map(item => item +1)


    // foreach()方法 遍历数组
    // 注意返回值为undefined
    // arr.forEach((item,index) => {
    //     console.log(item,index)
    // })


    // reduce()方法  可以设置初始值，可遍历数组 进行累加
    // let res = arr.reduce((item1, item2) => item1 + item2)
    // console.log(arr)

    // 迭代器对象
    // let ite = arr[Symbol.iterator]()
    // console.log((ite.next()))
    // console.log((ite.next()))
    // console.log((ite.next()))
    // console.log((ite.next()))
    // console.log((ite.next()))

    // console.log(arr.entries())
    //
    // for (let i of arr.values()) {
    //
    //     console.log(i)
    // }

    //     函数  arguments 在没有形参的情况下 直接获取实参的值，不过得进行二次加工
    // function test() {
    //     // 把实参传过来的数据转化为数组
    //     console.log(Array.from(arguments))
    // }
    // test(1, 2, 3)

    //  搜索
    // find 返回第一个满足条件的值
    //  findIndex 返回第一个满足条件的索引值
    // findLast 从后往前遍历，返回第一个满足条件的值
    // findLastIndex 从后往前遍历，返回第一个满足条件的索引值
    // includes 数组是否含有括号内的值  返回布尔值
    // indexOf  返回数组内含有括号内的值的索引
    // console.log(arr.includes(20))

    let arr2 = [
        [99, 88, 55],
        [91, 82, 15],
        [29, 38, 45]
    ]
    for (var i = 0; i < arr2.length; i++) {
        console.log(`这是第${i + 1}个学生的成绩`)
        for (var j = 0; j < arr2[i].length; j++) {
            console.log((arr2[i][j]))
        }
    }

```



## 队列

```js
 <!--封装队列结构和自定义方法-->
    class Queue {
        // 加#号 表示函数内部私有属性，不可直接操纵数据，否则会报错
        // 可以通过创造实例，调用方法的方式间接操纵
        #item = {}
        // 记录队头
        #lowCount = 0
        // 记录队尾
        #count = 0

        // 删除队头
        deleteQu() {
            // 如果队列长度为零的话 返回undefined 并结束执行下面的语句，防止#lowCount 继续++
            if (this.Empty()) {
                return undefined
            }

            let res = this.#item[this.#lowCount]
            delete this.#item[this.#lowCount]
            this.#lowCount++
            return res
        }

        // 添加入队
        pushQu(data) {
            this.#item[this.#count] = data
            this.#count++
        }

        // 返回队头
        front() {
            return this.#item[this.#lowCount]
        }

        Empty() {
            return this.size() === 0
        }

        size() {
            return this.#count - this.#lowCount

        }

        toString() {
            let str = ''
            for(let i = this.#lowCount;i<this.#count;i++){
                str+=`${this.#item[i]}`
            }
            return str
        }
    }

    let queue = new Queue()
    queue.pushQu(111)
    // queue.deleteQu()
    queue.front()
    console.log(queue.size())
```

## 双端队列

```js
 var arr1 = ["a", "s", "d"]
        var arr2 = ["s", "a", "d"]

        console.log(arr1 == arr2)
        <!--    双端队列封装-->
        // 双端队列
        // 既可以在队头添加删除元素 也可以在队尾添加删除元素
        class Dequeue {

            // 加#号 表示函数内部私有属性，不可直接操纵数据，否则会报错
            // 可以通过创造实例，调用方法的方式间接操纵
            #item = {}
            // 记录队头
            #lowCount = 0
            // 记录队尾
            #count = 0

            //在队尾增加一个元素
            addBack(data) {
                this.#item[this.#count] = data
                this.#count++
                return data
            }

            // 删除队尾
            removeBack() {
                if (this.Empty()) {
                    return undefined
                }

                this.#count--
                let res = this.#item[this.#count]
                delete this.#item[this.#count]
                return res

            }

            //添加第一个元素
            addFront(data) {
                // 如果长度为空
                if (this.Empty()) {
                    this.addBack(data)
                } else {
                    if (this.#lowCount > 0) {
                        this.#lowCount--
                        this.#item[this.#lowCount] = data
                    } else if (this.#lowCount === 0) {
                        // 因为每一次addBack() count都会加一 所以count的值会比
                        // 集合最后一项元素的·key值大一
                        for (let i = this.#count; i > 0; i--) {
                            this.#item[i] = this.#item[i - 1]
                        }
                        this.#item[0] = data
                        // 方便addBack 不会出错
                        this.#count++
                    }
                }
            }

            //删除第一个元素
            removeFront() {
                if (this.Empty()) {
                    return undefined
                }

                let res = this.#item[this.#lowCount]
                delete this.#item[this.#lowCount]
                this.#lowCount++
                return res
            }

            // 返回第一个元素
            peekFront() {
                return this.#item[this.#lowCount]
            }

            //返回最后一个元素
            peekBack() {
                return this.#item[this.#count - 1]
            }

            // 返回长度是否为0
            Empty() {
                return this.size() === 0
            }

            //返回集合长度
            size() {
                return this.#count - this.#lowCount
            }

        }

        // 判断回文封装函数
        function test(str) {
            let dequeue = new Dequeue()
            let local = str.toLowerCase().split(" ").join("")
            for (let i = 0; i < local.length; i++) {
                dequeue.addBack(local[i])
            }

            let palindrome = true
            while (dequeue.size() > 1) {
                if (dequeue.removeFront() !== dequeue.removeBack()) {
                    palindrome = false
                    break
                }
            }

            return palindrome
            // console.log(dequeue)
        }

        console.log(test("a 1 A"))

        // dequeue.addBack(100)
        // dequeue.addBack(200)
        // dequeue.addBack(300)
        // dequeue.removeFront()
        // dequeue.addFront(400)
        // dequeue.removeBack()
        // console.log(dequeue)
        // console.log(dequeue.peekBack())
```

## 单链表封装

```js
<!--    封装单链表-->
    class Node {
        constructor(ele) {
            this.element = ele
            this.next = null

        }
    }

    class linkedNode {
        constructor() {
            this.count = 0
            this.head = null
        }

        push(data) {
            let node = new Node(data)

            if (this.head === null) {
                this.head = node
            } else {
                let current = this.head

                // 如果current.next 不为空 向下循环 把current等于下一层的next
                // next为空的是链表的最后一项
                while (current.next !== null) {
                    current = current.next
                }
                current.next = node
            }
            this.count++
        }

        // 删除指定索引节点元素 element
        removeAt(index) {
            if (index >= 0 && index < this.count) {
                // 表示上一个节点
                let previous
                // 表示当前节点
                let current = this.head

                // 当删除元素为第一个时 走这里
                if (index === 0) {
                    this.head = this.head.next
                } else {
                    // 当删除元素不为第一个时 走这里

                    for (let i = 0; i < index; i++) {
                        previous = current
                        current = current.next
                    }
                    previous.next = current.next
                }
                // 节点长度减一
                this.count--
                //返回删除节点element元素
                return current.element
            }

        }

        // 改良版 remove
        removeAt2(index) {
            if (index >= 0 && index < this.count) {
                // 表示上一个节点
                let previous
                // 表示当前节点
                let current = this.head

                // 当删除元素为第一个时 走这里
                if (index === 0) {
                    this.head = this.head.next
                } else {
                    // 当删除元素不为第一个时 走这里
                    previous = this.getNodeAt(index - 1)
                    current = previous.next
                    previous.next = current.next
                }
                // 节点长度减一
                this.count--
                //返回删除节点element元素
                return current.element
            }

        }

        getNodeAt(index) {
            if (index >= 0 && index < this.count) {
                let node = this.head

                for (let i = 0; i < index; i++) {
                    node = node.next
                }
                return node.head
            }
        }

        // 判断元素是否相等
        equals(target, element) {
            // 第一种
            // return target === element 只可以判断简单数据类型

            // 第二种
            // 可以判断复杂数据类型  没命名的集合
            // 缺点 集合内部 key值顺序改变 会识别不出来
            return JSON.stringify(target) === JSON.stringify(element)

            // 第三种
            //     第三方库 imumutable
        }

        // 返回指定元素索引
        indexOf(element) {
            let current = this.head
            for (let i = 0; i < this.count; i++) {
                if (this.equals(element, current.element)) {
                    return i
                }
                current = current.next
            }
            return -1
        }

        // 删除指定元素
        removeElement(element) {
            const index = this.indexOf(element)
            // 判断返回值索引
            if (index >= 0) {
                return this.removeAt(index)
            } else {
                return undefined
            }

        }

        //     在指定位置插入一个元素
        insert(ele, index) {
            if (index >= 0 && index <= this.count) {
                const node = new Node(ele)
                if (index === 0) {

                    node.next = this.head
                    this.head = node
                } else {
                    const previous = this.getNodeAt(index - 1)
                    node.next = previous.next
                    previous.next = node
                }
                this.count++
                return true
            }
            return false
        }

        isEmpty() {
            return this.size() === 0
        }

        size() {
            return this.count
        }

        // 返回链头
        getHead() {
            return this.head
        }


    }

    // 单链表判断回文函数
    function test(str) {
        let dequeue = new linkedNode()
        let local = str.toLowerCase().split(" ").join("")
        for (let i = 0; i < local.length; i++) {
            dequeue.push(local[i])
        }

        let palindrome = true
        while (dequeue.size() > 1) {
            if (dequeue.removeAt(0) !== dequeue.removeAt(dequeue.size() - 1)) {
                palindrome = false
                break
            }
        }

        return palindrome
        // console.log(dequeue)
    }

    console.log(test("我是是我"))


// 单链表封装击鼓传花
    function game(list, num) {
        // 创建 Queue实例
        let queue = new linkedNode()
        // 把数组内的数据存储到实例当中
        for (let i = 0; i < list.length; i++) {
            queue.push(list[i])
        }

        // 游戏开始
        while (queue.size() > 1) {

            for (let j = 0; j < num; j++) {
                queue.push(queue.removeAt(0))
            }

            console.log(queue.removeAt(0), "被淘汰")
        }

        return queue.removeAt(0)
    }

    // game(["aaa", "abc", "scd", "edf", "dfg"], 7)
    console.log(game(["aaa", "abc", "scd", "edf", "dfg"], 7)+"胜利")
```

## 双向链表

```js
 <!--    封装单链表-->
    class Node {
        constructor(ele) {
            this.element = ele
            this.next = null

        }
    }

    class linkedNode {
        constructor() {
            this.count = 0
            this.head = null
        }

        push(data) {
            let node = new Node(data)

            if (this.head === null) {
                this.head = node
            } else {
                let current = this.head

                // 如果current.next 不为空 向下循环 把current等于下一层的next
                // next为空的是链表的最后一项
                while (current.next !== null) {
                    current = current.next
                }
                current.next = node
            }
            this.count++
        }

        // 删除指定索引节点元素 element
        removeAt(index) {
            if (index >= 0 && index < this.count) {
                // 表示上一个节点
                let previous
                // 表示当前节点
                let current = this.head

                // 当删除元素为第一个时 走这里
                if (index === 0) {
                    this.head = this.head.next
                } else {
                    // 当删除元素不为第一个时 走这里

                    for (let i = 0; i < index; i++) {
                        previous = current
                        current = current.next
                    }
                    previous.next = current.next
                }
                // 节点长度减一
                this.count--
                //返回删除节点element元素
                return current.element
            }

        }

        // 改良版 remove
        removeAt2(index) {
            if (index >= 0 && index < this.count) {
                // 表示上一个节点
                let previous
                // 表示当前节点
                let current = this.head

                // 当删除元素为第一个时 走这里
                if (index === 0) {
                    this.head = this.head.next
                } else {
                    // 当删除元素不为第一个时 走这里
                    previous = this.getNodeAt(index - 1)
                    current = previous.next
                    previous.next = current.next
                }
                // 节点长度减一
                this.count--
                //返回删除节点element元素
                return current.element
            }

        }

        getNodeAt(index) {
            if (index >= 0 && index < this.count) {
                let node = this.head

                for (let i = 0; i < index; i++) {
                    node = node.next
                }
                return node.head
            }
        }

        // 判断元素是否相等
        equals(target, element) {
            // 第一种
            // return target === element 只可以判断简单数据类型

            // 第二种
            // 可以判断复杂数据类型  没命名的集合
            // 缺点 集合内部 key值顺序改变 会识别不出来
            return JSON.stringify(target) === JSON.stringify(element)

            // 第三种
            //     第三方库 imumutable
        }

        // 返回指定元素索引
        indexOf(element) {
            let current = this.head
            for (let i = 0; i < this.count; i++) {
                if (this.equals(element, current.element)) {
                    return i
                }
                current = current.next
            }
            return -1
        }

        // 删除指定元素
        removeElement(element) {
            const index = this.indexOf(element)
            // 判断返回值索引
            if (index >= 0) {
                return this.removeAt(index)
            } else {
                return undefined
            }

        }

        //     在指定位置插入一个元素
        insert(ele, index) {
            if (index >= 0 && index <= this.count) {
                const node = new Node(ele)
                if (index === 0) {

                    node.next = this.head
                    this.head = node
                } else {
                    const previous = this.getNodeAt(index - 1)
                    node.next = previous.next
                    previous.next = node
                }
                this.count++
                return true
            }
            return false
        }

        isEmpty() {
            return this.size() === 0
        }

        size() {
            return this.count
        }

        // 返回链头
        getHead() {
            return this.head
        }


    }

    // 单链表判断回文函数
    function test(str) {
        let dequeue = new linkedNode()
        let local = str.toLowerCase().split(" ").join("")
        for (let i = 0; i < local.length; i++) {
            dequeue.push(local[i])
        }

        let palindrome = true
        while (dequeue.size() > 1) {
            if (dequeue.removeAt(0) !== dequeue.removeAt(dequeue.size() - 1)) {
                palindrome = false
                break
            }
        }

        return palindrome
    }

 class SonNode extends Node {
        constructor(element) {
            super(element);
            this.prev = null
        }
    }

    class SonListNode extends linkedNode {
        constructor() {
            super();
            this.tail = null
        }

        ppp(element) {
            const node = new SonNode(element)
            if (this.head === null) {
                this.head = node
                this.tail = node
            } else {
                this.tail.next = node
                node.prev = this.tail
                this.tail = node
            }
            this.count++

        }

        insert(element, index) {
            if (index >= 0 && index <= this.count) {
                const node = new SonNode(element)
                let current = this.head
                if (index === 0) {
                    if (this.head === null) {
                        this.head = node
                        this.tail = node
                    } else {
                        node.next = this.head
                        this.head.prev = node
                        this.head = node
                    }
                } else if (index === this.count) {
                    current = this.tail
                    current.next = node
                    node.prev = current
                    this.tail = node
                }
            }

            this.count++
        }

        getHead() {
            return this.head
        }

    }

    let list = new SonListNode()
    list.ppp(1111)
    list.ppp(2000)
    // list.push(8881)
    console.log(list)
```

## 栈结构

```js
 <!--封装栈结构和自定义方法-->
    class Stack {
        // 加#号 表示函数内部私有属性，不可直接操纵数据，否则会报错
        // 可以通过创造实例，调用方法的方式间接操纵
        #item = []

        // 弹出
        pop() {
            return this.#item.pop()
        }

        // 压栈
        push(data) {
            return this.#item.push(data)
        }

        //栈顶
        peek() {
            return this.#item.at(-1)
        }

        //     是否为空
        isEmpoty() {
            return this.#item.length === 0
        }

        size() {
            return this.#item.length
        }

        toString() {
            return this.#item.join("-")
        }

        clear() {
            return this.#item = []
        }
    }

    // 十进制转换器
    // num 十进制数 scams 进制
    function number(num,scams) {
        let restack = new Stack()
        //     准备容器
        let String = ""
        let basic = "0123456789ABCDEF"
        while (num > 0) {
            restack.push(num % scams)
            // 这里的numbs必须向下取整
            num = Math.floor(num / scams)
        }

        while (!(restack.isEmpoty())) {
            String += basic[restack.pop()]
        }
        return String
    }

    console.log(number(500,16))
```

## 判断回文



### 单链表实现

```js
<!--    封装单链表-->
    class Node {
        constructor(ele) {
            this.element = ele
            this.next = null

        }
    }

    class linkedNode {
        constructor() {
            this.count = 0
            this.head = null
        }

        push(data) {
            let node = new Node(data)

            if (this.head === null) {
                this.head = node
            } else {
                let current = this.head

                // 如果current.next 不为空 向下循环 把current等于下一层的next
                // next为空的是链表的最后一项
                while (current.next !== null) {
                    current = current.next
                }
                current.next = node
            }
            this.count++
        }

        // 删除指定索引节点元素 element
        removeAt(index) {
            if (index >= 0 && index < this.count) {
                // 表示上一个节点
                let previous
                // 表示当前节点
                let current = this.head

                // 当删除元素为第一个时 走这里
                if (index === 0) {
                    this.head = this.head.next
                } else {
                    // 当删除元素不为第一个时 走这里

                    for (let i = 0; i < index; i++) {
                        previous = current
                        current = current.next
                    }
                    previous.next = current.next
                }
                // 节点长度减一
                this.count--
                //返回删除节点element元素
                return current.element
            }

        }

        // 改良版 remove
        removeAt2(index) {
            if (index >= 0 && index < this.count) {
                // 表示上一个节点
                let previous
                // 表示当前节点
                let current = this.head

                // 当删除元素为第一个时 走这里
                if (index === 0) {
                    this.head = this.head.next
                } else {
                    // 当删除元素不为第一个时 走这里
                    previous = this.getNodeAt(index - 1)
                    current = previous.next
                    previous.next = current.next
                }
                // 节点长度减一
                this.count--
                //返回删除节点element元素
                return current.element
            }

        }

        getNodeAt(index) {
            if (index >= 0 && index < this.count) {
                let node = this.head

                for (let i = 0; i < index; i++) {
                    node = node.next
                }
                return node.head
            }
        }

        // 判断元素是否相等
        equals(target, element) {
            // 第一种
            // return target === element 只可以判断简单数据类型

            // 第二种
            // 可以判断复杂数据类型  没命名的集合
            // 缺点 集合内部 key值顺序改变 会识别不出来
            return JSON.stringify(target) === JSON.stringify(element)

            // 第三种
            //     第三方库 imumutable
        }

        // 返回指定元素索引
        indexOf(element) {
            let current = this.head
            for (let i = 0; i < this.count; i++) {
                if (this.equals(element, current.element)) {
                    return i
                }
                current = current.next
            }
            return -1
        }

        // 删除指定元素
        removeElement(element) {
            const index = this.indexOf(element)
            // 判断返回值索引
            if (index >= 0) {
                return this.removeAt(index)
            } else {
                return undefined
            }

        }

        //     在指定位置插入一个元素
        insert(ele, index) {
            if (index >= 0 && index <= this.count) {
                const node = new Node(ele)
                if (index === 0) {

                    node.next = this.head
                    this.head = node
                } else {
                    const previous = this.getNodeAt(index - 1)
                    node.next = previous.next
                    previous.next = node
                }
                this.count++
                return true
            }
            return false
        }

        isEmpty() {
            return this.size() === 0
        }

        size() {
            return this.count
        }

        // 返回链头
        getHead() {
            return this.head
        }


    }

    // 单链表判断回文函数
    function test(str) {
        let dequeue = new linkedNode()
        let local = str.toLowerCase().split(" ").join("")
        for (let i = 0; i < local.length; i++) {
            dequeue.push(local[i])
        }

        let palindrome = true
        while (dequeue.size() > 1) {
            if (dequeue.removeAt(0) !== dequeue.removeAt(dequeue.size() - 1)) {
                palindrome = false
                break
            }
        }

        return palindrome
        // console.log(dequeue)
    }

    console.log(test("我是是我"))
```

### 双端队列实现

```js
 <!--    双端队列封装-->
    // 双端队列
    // 既可以在队头添加删除元素 也可以在队尾添加删除元素
    class Dequeue {

        // 加#号 表示函数内部私有属性，不可直接操纵数据，否则会报错
        // 可以通过创造实例，调用方法的方式间接操纵
        #item = {}
        // 记录队头
        #lowCount = 0
        // 记录队尾
        #count = 0

        //在队尾增加一个元素
        addBack(data) {
            this.#item[this.#count] = data
            this.#count++
            return data
        }

        // 删除队尾
        removeBack() {
            if (this.Empty()) {
                return undefined
            }

            this.#count--
            let res = this.#item[this.#count]
            delete this.#item[this.#count]
            return res

        }

        //添加第一个元素
        addFront(data) {
            // 如果长度为空
            if (this.Empty()) {
                this.addBack(data)
            } else {
                if (this.#lowCount > 0) {
                    this.#lowCount--
                    this.#item[this.#lowCount] = data
                } else if (this.#lowCount === 0) {
                    // 因为每一次addBack() count都会加一 所以count的值会比
                    // 集合最后一项元素的·key值大一
                    for (let i = this.#count; i > 0; i--) {
                        this.#item[i] = this.#item[i - 1]
                    }
                    this.#item[0] = data
                    // 方便addBack 不会出错
                    this.#count++
                }
            }
        }

        //删除第一个元素
        removeFront() {
            if (this.Empty()) {
                return undefined
            }

            let res = this.#item[this.#lowCount]
            delete this.#item[this.#lowCount]
            this.#lowCount++
            return res
        }

        // 返回第一个元素
        peekFront() {
            return this.#item[this.#lowCount]
        }

        //返回最后一个元素
        peekBack() {
            return this.#item[this.#count - 1]
        }

        // 返回长度是否为0
        Empty() {
            return this.size() === 0
        }

        //返回集合长度
        size() {
            return this.#count - this.#lowCount
        }

    }

    // 判断回文封装函数
    function test(str) {
        let dequeue = new Dequeue()
        let local = str.toLowerCase().split(" ").join("")
        for (let i = 0; i < local.length; i++) {
            dequeue.addBack(local[i])
        }

        let palindrome = true
        while (dequeue.size() > 1) {
            if (dequeue.removeFront() !== dequeue.removeBack()) {
                palindrome = false
                break
            }
        }

        return palindrome
        // console.log(dequeue)
    }

    console.log(test("a 1 A"))

    // dequeue.addBack(100)
    // dequeue.addBack(200)
    // dequeue.addBack(300)
    // dequeue.removeFront()
    // dequeue.addFront(400)
    // dequeue.removeBack()
    // console.log(dequeue)
    // console.log(dequeue.peekBack())
```

## 进制转化器

### 单链表实现

```js
 <!--    封装单链表-->
    class Node {
        constructor(ele) {
            this.element = ele
            this.next = null

        }
    }

    class linkedNode {
        constructor() {
            this.count = 0
            this.head = null
        }

        push(data) {
            let node = new Node(data)

            if (this.head === null) {
                this.head = node
            } else {
                let current = this.head

                // 如果current.next 不为空 向下循环 把current等于下一层的next
                // next为空的是链表的最后一项
                while (current.next !== null) {
                    current = current.next
                }
                current.next = node
            }
            this.count++
        }

        // 删除指定索引节点元素 element
        removeAt(index) {
            if (index >= 0 && index < this.count) {
                // 表示上一个节点
                let previous
                // 表示当前节点
                let current = this.head

                // 当删除元素为第一个时 走这里
                if (index === 0) {
                    this.head = this.head.next
                } else {
                    // 当删除元素不为第一个时 走这里

                    for (let i = 0; i < index; i++) {
                        previous = current
                        current = current.next
                    }
                    previous.next = current.next
                }
                // 节点长度减一
                this.count--
                //返回删除节点element元素
                return current.element
            }

        }

        // 改良版 remove
        removeAt2(index) {
            if (index >= 0 && index < this.count) {
                // 表示上一个节点
                let previous
                // 表示当前节点
                let current = this.head

                // 当删除元素为第一个时 走这里
                if (index === 0) {
                    this.head = this.head.next
                } else {
                    // 当删除元素不为第一个时 走这里
                    previous = this.getNodeAt(index - 1)
                    current = previous.next
                    previous.next = current.next
                }
                // 节点长度减一
                this.count--
                //返回删除节点element元素
                return current.element
            }

        }

        getNodeAt(index) {
            if (index >= 0 && index < this.count) {
                let node = this.head

                for (let i = 0; i < index; i++) {
                    node = node.next
                }
                return node.head
            }
        }

        // 判断元素是否相等
        equals(target, element) {
            // 第一种
            // return target === element 只可以判断简单数据类型

            // 第二种
            // 可以判断复杂数据类型  没命名的集合
            // 缺点 集合内部 key值顺序改变 会识别不出来
            return JSON.stringify(target) === JSON.stringify(element)

            // 第三种
            //     第三方库 imumutable
        }

        // 返回指定元素索引
        indexOf(element) {
            let current = this.head
            for (let i = 0; i < this.count; i++) {
                if (this.equals(element, current.element)) {
                    return i
                }
                current = current.next
            }
            return -1
        }

        // 删除指定元素
        removeElement(element) {
            const index = this.indexOf(element)
            // 判断返回值索引
            if (index >= 0) {
                return this.removeAt(index)
            } else {
                return undefined
            }

        }

        //     在指定位置插入一个元素
        insert(ele, index) {
            if (index >= 0 && index <= this.count) {
                const node = new Node(ele)
                if (index === 0) {

                    node.next = this.head
                    this.head = node
                } else {
                    const previous = this.getNodeAt(index - 1)
                    node.next = previous.next
                    previous.next = node
                }
                this.count++
                return true
            }
            return false
        }

        isEmpty() {
            return this.size() === 0
        }

        size() {
            return this.count
        }

        // 返回链头
        getHead() {
            return this.head
        }


    }

    // 用单链表实现进制转化器

    function number(num, scams) {
        let restack = new linkedNode()
        //     准备容器
        let String = ""
        let basic = "0123456789ABCDEF"
        while (num > 0) {
            restack.push(num % scams)
            // 这里的numbs必须向下取整
            num = Math.floor(num / scams)
        }

        while (!(restack.isEmpty())) {
            String += basic[restack.removeAt(restack.size() - 1)]
        }
        return String
    }

    console.log(number(500, 16))
```

### 栈结构实现

```js
 <!--封装栈结构和自定义方法-->
    class Stack {
        // 加#号 表示函数内部私有属性，不可直接操纵数据，否则会报错
        // 可以通过创造实例，调用方法的方式间接操纵
        #item = []

        // 弹出
        pop() {
            return this.#item.pop()
        }

        // 压栈
        push(data) {
            return this.#item.push(data)
        }

        //栈顶
        peek() {
            return this.#item.at(-1)
        }

        //     是否为空
        isEmpoty() {
            return this.#item.length === 0
        }

        size() {
            return this.#item.length
        }

        toString() {
            return this.#item.join("-")
        }

        clear() {
            return this.#item = []
        }
    }

    // 十进制转换器
    // num 十进制数 scams 进制
    function number(num,scams) {
        let restack = new Stack()
        //     准备容器
        let String = ""
        let basic = "0123456789ABCDEF"
        while (num > 0) {
            restack.push(num % scams)
            // 这里的numbs必须向下取整
            num = Math.floor(num / scams)
        }

        while (!(restack.isEmpoty())) {
            String += basic[restack.pop()]
        }
        return String
    }

    console.log(number(500,16))
```

## 击鼓传花

### 单链表实现

```js
 <!--    封装单链表-->
    class Node {
        constructor(ele) {
            this.element = ele
            this.next = null

        }
    }

    class linkedNode {
        constructor() {
            this.count = 0
            this.head = null
        }

        push(data) {
            let node = new Node(data)

            if (this.head === null) {
                this.head = node
            } else {
                let current = this.head

                // 如果current.next 不为空 向下循环 把current等于下一层的next
                // next为空的是链表的最后一项
                while (current.next !== null) {
                    current = current.next
                }
                current.next = node
            }
            this.count++
        }

        // 删除指定索引节点元素 element
        removeAt(index) {
            if (index >= 0 && index < this.count) {
                // 表示上一个节点
                let previous
                // 表示当前节点
                let current = this.head

                // 当删除元素为第一个时 走这里
                if (index === 0) {
                    this.head = this.head.next
                } else {
                    // 当删除元素不为第一个时 走这里

                    for (let i = 0; i < index; i++) {
                        previous = current
                        current = current.next
                    }
                    previous.next = current.next
                }
                // 节点长度减一
                this.count--
                //返回删除节点element元素
                return current.element
            }

        }

        // 改良版 remove
        removeAt2(index) {
            if (index >= 0 && index < this.count) {
                // 表示上一个节点
                let previous
                // 表示当前节点
                let current = this.head

                // 当删除元素为第一个时 走这里
                if (index === 0) {
                    this.head = this.head.next
                } else {
                    // 当删除元素不为第一个时 走这里
                    previous = this.getNodeAt(index - 1)
                    current = previous.next
                    previous.next = current.next
                }
                // 节点长度减一
                this.count--
                //返回删除节点element元素
                return current.element
            }

        }

        getNodeAt(index) {
            if (index >= 0 && index < this.count) {
                let node = this.head

                for (let i = 0; i < index; i++) {
                    node = node.next
                }
                return node.head
            }
        }

        // 判断元素是否相等
        equals(target, element) {
            // 第一种
            // return target === element 只可以判断简单数据类型

            // 第二种
            // 可以判断复杂数据类型  没命名的集合
            // 缺点 集合内部 key值顺序改变 会识别不出来
            return JSON.stringify(target) === JSON.stringify(element)

            // 第三种
            //     第三方库 imumutable
        }

        // 返回指定元素索引
        indexOf(element) {
            let current = this.head
            for (let i = 0; i < this.count; i++) {
                if (this.equals(element, current.element)) {
                    return i
                }
                current = current.next
            }
            return -1
        }

        // 删除指定元素
        removeElement(element) {
            const index = this.indexOf(element)
            // 判断返回值索引
            if (index >= 0) {
                return this.removeAt(index)
            } else {
                return undefined
            }

        }

        //     在指定位置插入一个元素
        insert(ele, index) {
            if (index >= 0 && index <= this.count) {
                const node = new Node(ele)
                if (index === 0) {

                    node.next = this.head
                    this.head = node
                } else {
                    const previous = this.getNodeAt(index - 1)
                    node.next = previous.next
                    previous.next = node
                }
                this.count++
                return true
            }
            return false
        }

        isEmpty() {
            return this.size() === 0
        }

        size() {
            return this.count
        }

        // 返回链头
        getHead() {
            return this.head
        }


    }


    // 单链表封装击鼓传花
    function game(list, num) {
        // 创建 Queue实例
        let queue = new linkedNode()
        // 把数组内的数据存储到实例当中
        for (let i = 0; i < list.length; i++) {
            queue.push(list[i])
        }

        // 游戏开始
        while (queue.size() > 1) {

            for (let j = 0; j < num; j++) {
                queue.push(queue.removeAt(0))
            }

            console.log(queue.removeAt(0), "被淘汰")
        }

        return queue.removeAt(0)
    }

    // game(["aaa", "abc", "scd", "edf", "dfg"], 7)
    console.log(game(["aaa", "abc", "scd", "edf", "dfg"], 7)+"胜利")
```

### 队列实现

```js
 <!--    用队列实现击鼓传花-->
    // 流程
    // 传花的过程当中按照顺序 没被选中的队员从对头删除 添加到队尾
    // 当音乐结束 队头的成员就是被选上的人

    class Queue {
        // 加#号 表示函数内部私有属性，不可直接操纵数据，否则会报错
        // 可以通过创造实例，调用方法的方式间接操纵
        #item = {}
        #lowCount = 0
        #count = 0

        // 删除队头
        deleteQu() {
            // 如果队列长度为零的话 返回undefined 并结束执行下面的语句，防止#lowCount 继续++
            if (this.Empty()) {
                return undefined
            }

            let res = this.#item[this.#lowCount]
            delete this.#item[this.#lowCount]
            this.#lowCount++
            return res
        }

        // 添加入队
        pushQu(data) {
            this.#item[this.#count] = data
            this.#count++
        }

        // 返回队头
        front() {
            return this.#item[this.#lowCount]
        }

        Empty() {
            return this.size() === 0
        }

        size() {
            return this.#count - this.#lowCount

        }

        toString() {
            let str = ''
            for (let i = this.#lowCount; i < this.#count; i++) {
                str += `${this.#item[i]}`
            }
            return str
        }
    }

    function game(list, num) {
        // 创建 Queue实例
        let queue = new Queue()
        // 把数组内的数据存储到实例当中
        for (let i = 0; i < list.length; i++) {
            queue.pushQu(list[i])
        }

        //     游戏开始
        while (queue.size() > 1) {

            for (let j = 0; j < num; j++) {
                queue.pushQu(queue.deleteQu())
            }

            console.log(queue.deleteQu(), "被淘汰")
        }
        console.log(queue)
        return queue.front()
    }

    // game(["aaa", "abc", "scd", "edf", "dfg"], 7)
    console.log(game(["aaa", "abc", "scd", "edf", "dfg"], 7)+"胜利")
```

