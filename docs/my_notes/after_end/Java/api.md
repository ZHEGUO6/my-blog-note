# Java零基础



## java的三大技术平台



![](//images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/ZHEGUO6/image/img/202411161723325.png)

## 配置JDK

建议安装JDK21(LTS)，LTS表示java的长期支持版本，会有专业人员长期维护。

企业一般使用较老版本的jdk，因为这些经过了市场的长期考验，稳定性高。

安装jdk直接去**oracle官网**下载，[点击跳转](https://www.oracle.com/java/technologies/downloads/#jdk21-windows)

![](//images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/ZHEGUO6/image/img/202411161800904.png)

## 什么是方法？

![](//images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/ZHEGUO6/image/img/202411171555414.png)

```java
 /*
    * 需求：无参数，无返回值的方法，打印三行字符串"hello"
    * void 方法体
    * */ 
    public static void print() {
        System.out.println("hello");
        System.out.println("hello");
        System.out.println("hello");
    }
```

方法的指定输入和输出：

```java
/*
     * 需求：输入指定位数，随机返回验证码
     * 输入：int len
     * 输出：String
     */
    public static String getCode(int len) {
        String code = "";
        for (int i = 0; i < len; i++) {
            int num = (int) (Math.random() * 10);
            code += num;
        }
        return code;
    }
```

### 方法的注意事项

1. **方法重载：**同一个类中，方法名相同，参数列表不同(类型不同，个数不同，顺序不同)，返回值可以相同，也可以不同。

2. **注意**：在无返回值的方法中使用`return`可以立即结束当前方法。

![](//images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/ZHEGUO6/image/img/202411171617412.png)

```java
 // 定义多个重载的方法
    public static void show(int a) {
        System.out.println("int");
    }

    public static void show(String a) {
        System.out.println("String");
    }

    public static void show(double a) {
        System.out.println("double");
    }
```

## 类型转换

**自动类型转换**：类型范围小的变量可以赋值给类型范围大的变量，但是类型范围大的变量不能赋值给类型范围小的变量。

![](//images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/ZHEGUO6/image/img/202411171632610.png)

**强制类型转换**：将一个类型转换为另一个类型。

**格式**：(类型)变量名。

**注意**：把过大的变量强制转换为小数值，会出现数据溢出。

![](//images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/ZHEGUO6/image/img/202411171644813.png)

```java
    public static void main(String[] args) {
        // 自动类型转换
        // byte < short < int < long < float < double
        byte b = 127;
        short s = b;
        int i = s;
        long l = i;
        float f = l;
        double d = f;

        // 强制类型转换
        // double > float > long > int > short > byte
        double db = 3.14;
        float fl = (float)db;
        long lo = (long)fl;
        int in = (int)lo;
        short sh = (short)in;
    }
```

![](//images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/ZHEGUO6/image/img/202411171648362.png)

## 表达式的自动类型提升

![](//images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/ZHEGUO6/image/img/202411171655813.png)

```java
package com.zheguo.type;

public class demo02 {
    public static void main(String[] args) {
        // 表达式的运算：byte,short,char 运算结果都是int
        System.out.println(solve((byte) 127, (byte) 127));
    }

    public static int solve(byte a, byte b) {
       // byte,short,char 自动提升成为int类型
        return a + b;
    }

    // 返回结果的类型是形参列表的最大类型
    public static double solve(byte a, short b, char c, int d, double f) {
        return a + b + c + d + f;
    }
}
```

## 输入和输出

键盘输入通过jdk提供的api，scanner对象。

```java
 // 写一个方法，键盘输入两个数字，打印这两个数字的和
    public static void add(){
        // 键盘输入对象实例化
        Scanner sc = new Scanner(System.in);
        System.out.println("请输入第一个数字：");
        int a = sc.nextInt();
        System.out.println("请输入第二个数字：");
        int b = sc.nextInt();
        // 计算
        int sum = a + b;
        // 输出
        System.out.println("两个数字的和为：" + sum);
    }
```

## 运算符



###  算术运算符

![](//images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/ZHEGUO6/image/img/202411172340570.png)

```java
// +符号既可以做加法，也可以做拼接 
public static void test1() {
        int a = 10;
        System.out.println(a + 10); // 20
        System.out.println(a + "hello"); // 10hello
        System.out.println("hello" + a); // hello10
        System.out.println("hello" + "world"); // helloworld
        System.out.println(a + 'b' + 'a'); // 205
    }
```

### 自增自减运算符

自增：++

自减：--

```java
 public static void test1(int a) {
        int res = ++a;
        System.out.println(a); // 11
        System.out.println(res); // 11
    }

public static void test2(int a) {
    int res = a++;
    System.out.println(a); // 11
    System.out.println(res); // 10
}
```

### 赋值运算符

![](//images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/ZHEGUO6/image/img/202411180004014.png)

### 逻辑运算符

![](//images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/ZHEGUO6/image/img/202411180020282.png)

## 实战案例：健康计算器

```java
package com.zheguo.bmi;

import java.util.Scanner;

public class demo01 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("请输入身高（单位：米）：");
        double height = sc.nextDouble();
        System.out.println("请输入体重（单位：千克）：");
        double weight = sc.nextDouble();
        System.out.println("请输入性别（1：男，2：女）：");
        int sex = sc.nextInt();
        System.out.println("请输入年龄：");
        int age = sc.nextInt();
        double bmi = bmi(height, weight);
        System.out.println("您的BMI指数为：" + bmi);
        System.out.println("您的BMI范围是：" + bmiRange(bmi));
        double bmr = bmr(age, sex, height, weight);
        System.out.println("您的基础代谢率（BMR）为：" + bmr);
        System.out.println("您的基础代谢率范围是：" + bmrRange(bmr));
    }

    // 设计一个程序，计算BMI值，并输出结果。
    public static double bmi(double height, double weight) {
        return weight / (height * height);
    }

    // 根据个人信息，计算用户的BMR指数
    public static double bmr(int age, int sex, double height, double weight) {
        double bmr = 0;
        if (sex == 1) {
            bmr = 66 + (13.7 * weight) + (5 * height) - (6.8 * age);
        } else {
            bmr = 655 + (9.6 * weight) + (1.8 * height) - (4.7 * age);
        }
        return bmr;
    }

    // 设计一个程序，判断用户的BMI值属于什么范围。
    public static String bmiRange(double bmi) {
        String range = "";
        if (bmi < 18.5) {
            range = "过轻";
        } else if (bmi >= 18.5 && bmi <= 24.9) {
            range = "正常";
        } else if (bmi > 24.9 && bmi <= 29.9) {
            range = "过重";
        } else {
            range = "肥胖";
        }
        return range;
    }

    // 设计一个程序，判断用户的基础代谢率属于什么范围
    public static String bmrRange(double bmr) {
        String range = "";
        if (bmr < 1000) {
            range = "低";
        } else if (bmr >= 1000 && bmr <= 1500) {
            range = "中";
        } else {
            range = "高";
        }
        return range;
    }
}
```

## 程序的三种执行顺序

1. 顺序结构：自上而下的执行顺序。
2. 分支结构：根据条件，选择对应的代码执行。
3. 循环结构·：控制某段代码重复的执行。

### 分支结构

if分支，switch分支。

### 循环结构

for循环，while循环，do-while循环，死循环，循环嵌套。

#### **for循环和while循环的差别在哪？**

**使用for循环，前提你要知道循环的次数再使用。while循环，你在不知道要循环多少次，只知道结束循环的条件的情况下使用。**

```java
public class demo01 {
    public static void main(String[] args) {
        // 调用year方法，求出存了10000元，在1.7%利率下，多少年后能实现资金翻倍。
        System.out.println(year(10000, 1.7));
    }

    // 假设你在银行中存了10000元，每年给出的利率为1.7%，多少年后能实现资金翻倍。
    public static int year(double money, double rate) {
        int year = 0;
        while (money < 2 * money) {
            money += money * rate / 100;
            year++;
        }
        return year;
    }
}
```

#### 死循环

**死循环的几种写法：**

![](//images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/ZHEGUO6/image/img/202411190024403.png)

#### 嵌套循环

```java
// 写一个嵌套循环
    public static void loop() {
        for (int i = 1; i <= 9; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.print("hello world");
            }
            System.out.println();//换行
        }
    }
```

**嵌套循环的特点**：外部循环每执行一次，内部循环都会执行一轮。

打印九九乘法表：

```java
 // 打印一个九九乘法表
    public static void print() {
        for (int i = 1; i <= 9; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.print(j + "*" + i + "=" + i * j + "\t");
            }
            System.out.println();
        }
    }
```

break：跳出并结束当前的循环。

continue：跳出当前循环，直接进入下一次循环。

## 综合实战

### 一、计算器

单值匹配：

```java
 // 写一个简单计算器的程序，输入两个数字，然后选择加减乘除，最后输出结果。
    public static void calculator() {
        Scanner scanner = new Scanner(System.in);
        System.out.println("请输入第一个数字：");
        double num1 = scanner.nextDouble();
        System.out.println("请输入第二个数字：");
        double num2 = scanner.nextDouble();
        System.out.println("请选择运算符（+、-、*、/）：");
        String operator = scanner.next();
        double result = 0;
        switch (operator) {
            case "+":
                result = num1 + num2;
                break;
            case "-":
                result = num1 - num2;
                break;
            case "*":
                result = num1 * num2;
                break;
            case "/":
                result = num1 / num2;
                break;
            default:
                System.out.println("输入的运算符有误！");
        }
        System.out.println("计算结果为：" + result);
    }
```

### 二、猜数字

多值匹配：

```java
 // 写一个猜数字的游戏，用户输入一个数字，计算机随机生成一个数字，然后判断用户输入的数字是否等于计算机生成的数字，如果等于，则提示用户猜对了，否则提示用户猜的大还是小。
    public static void guessNumber() {
        Scanner scanner = new Scanner(System.in);
        int number = (int) (Math.random() * 100 + 1);
       do {
           System.out.println("请输入一个数字：");
           int input = scanner.nextInt();
           if (input == number) {
               System.out.println("恭喜你，猜对了！");
               break;
           } else if (input > number) {
               System.out.println("你猜的数字太大了，请再试一次：");
           } else {
               System.out.println("你猜的数字太小了，请再试一次：");
           }
       } while (true);
    }
```

### 三、随机生成验证码

```java
   // 写一条随机生成验证码的程序
    public static void generateVerificationCode(int n) {
        String code = "";
        for (int i = 0; i < n; i++) {
            int type = (int) (Math.random() * 3); // 0 1 2表示不同类型的字符
            switch (type) {
                case 0:
                    int num = (int) (Math.random() * 10); // 生成0-9之间的数字
                    code += num;
                    break;
                case 1:
                    char ch = (char) (Math.random() * 26 + 'a'); // 生成a-z之间的字母
                    code += ch;
                    break;
                case 2:
                    char CH = (char) (Math.random() * 26 + 'A'); // 生成A-Z之间的字母
                    code += CH;
                    break;
                default:
                    System.out.println("生成验证码时发生错误！");
            }
        }
        System.out.println("生成的验证码为：" + code);
    }
```

### 四、找素数

```java
package com.zheguo.circulate;

public class demo02 {
    public static void main(String[] args) {
        // 找到100-200之间的素数
        for (int i = 100; i <= 200; i++) {
            // 判断是否是素数
            if (isPrime(i)) {
                System.out.println(i);
            }
        }
    }

    // 方法功能：判断一个数是否是素数
    public static boolean isPrime(int num){
        if (num < 2) {
            return false;
        }

        for (int i = 2; i < Math.sqrt(num); i++) {
            if (num % i == 0) {
                return false;
            }
        }
        return true;
    }
}
```

## 数组

数组是一个容器，批量存储同类型的数据。

![](//images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/ZHEGUO6/image/img/202411191354765.png)

### 动态初始化数组

```java
package com.zheguo.arry;

import java.util.Scanner;

public class demo01 {
    public static void main(String[] args) {
        inputScore();
    }

    // 设计一个方法，录入8名学生的成绩
    public static void inputScore() {
        // 需要一个数组来动态接收8个学生成绩
        double[] arr = new double[8];
        // 这时数组的的状态 [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]
        Scanner scanner = new Scanner(System.in);
        for (int i = 0; i < arr.length; i++) {
            System.out.println("请输入第" + (i + 1) + "个学生的成绩");
            arr[i] = scanner.nextDouble();
        }

        // 统计总分
        double sum = 0;
        for (double v : arr) {
            sum += v;
        }
        // 输出平均分
        System.out.println("平均分是：" + (sum / arr.length));
        System.out.println("最高分是：" + max(arr));
        System.out.println("最低分是：" + min(arr));
        System.out.println("总分是：" + sum);

    }

    // 需求：定义一个方法，用来统计数组的最大值
    public static double max(double[] arr) {
        double max = arr[0];
        for (double v : arr) {
            if (max < v) {
                max = v;
            }
        }
        return max;
    }

    // 需求：定义一个方法，用来统计数组的最小值
    public static double min(double[] arr) {
        double min = arr[0];
        for (double v : arr) {
            if (min > v) {
                min = v;
            }
        }
        return min;
    }
}
```

### 斗地主做牌和洗牌

```java
package com.zheguo.arry;

public class poker {
    public static void main(String[] args) {
        getPokers();
    }

    // 写一个斗地主程序，只写做牌和洗牌
    public static void getPokers() {
        // 创建一个数组，用来存储54张牌
        String[] pokers = new String[54];
        // 定义花色和牌面
        String[] colors = {"♠", "♥", "♣", "♦"};
        // 定义牌面点数
        String[] nums = {"2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"};
        int index = 0;
        for (int i = 0; i < nums.length; i++) {
            for (int j = 0; j < colors.length; j++) {
                pokers[index++] = colors[j] + nums[i];
            }
        }

        pokers[index++] = "小王";
        pokers[index] = "大王";

        System.out.println("----------洗牌----------");

        // 随机洗牌
        // 如何实现洗牌？ 随机生成两个0-53 之间的数，然后交换位置，循环54次
        for (int i = 0; i < pokers.length; i++) {
            int index1 = (int) (Math.random() * pokers.length);
            int index2 = (int) (Math.random() * pokers.length);
            String temp = pokers[index1];
            pokers[index1] = pokers[index2];
            pokers[index2] = temp;
        }

         // 把牌打印出来
        for (String poker : pokers) {
            System.out.println(poker + " ");
        }
    }
}
```

## 二维数组

**二维数组：数组里面的每个元素都是一个数组。**

```java
package com.zheguo.arry;

public class Array2D {
    public static void main(String[] args) {
        // 写一个姓名的二维数组
        // 静态初始化
        String[][] names = {
                {"张三", "李四"},
                {"王五", "赵六" , "钱九"},
                {"孙七", "周八"}
        };

        // 打印到屏幕上
        for (int i = 0; i < names.length; i++) {
            for (int j = 0; j < names[i].length; j++) {
                System.out.print(names[i][j] + "\t");
            }
            System.out.println();
        }
    }
}
```

## 实战案例：数字华容道

```java
package com.zheguo.arry;

public class demo02 {
    public static void main(String[] args) {
        huarongdao(4);
    }

    // 写一个数字华容道的方法
    public static void huarongdao(int num) {
        // 1. 创建一个二维数组，用来模拟华容道
        int[][] arr = new int[num][num];
        // 2. 填充数组
        int count = 1;
        for (int i = 0; i < num; i++) {
            for (int j = 0; j < num; j++) {
                arr[i][j] = count++;
            }
        }

        //  输出数组
        printArray(arr);
        System.out.println("======================");

        // 3. 随机交换数组中的元素
        for (int i = 0; i < num; i++) {
            for (int j = 0; j < num; j++) {
                int row = (int) (Math.random() * num);
                int col = (int) (Math.random() * num);
                int temp = arr[row][col];
                arr[row][col] = arr[i][j];
                arr[i][j] = temp;
            }
        }
        printArray(arr);
    }

    // 方法：打印二维数组
    public static void printArray(int[][] arr) {
        for (int i = 0; i < arr.length; i++) {
            for (int j = 0; j < arr[i].length; j++) {
                System.out.print(arr[i][j] + "\t");
            }
            System.out.println();
        }
    }
}
```

打乱一个不对称的数组

```java
// 打乱一个不对称二维数组
    public static void test() {
        // 1. 创建一个姓名二维数组，每个元素长度不相等、姓名不重复
        String[][] names = {
                {"张三", "李四"},
                {"王五", "赵六", "钱九"},
                {"孙七", "周八"}
        };
        // 输出
        printArrayString(names);
        // 2. 给一个每个元素长度都不相等的二维数组打乱顺序
        for (int i = 0; i < names.length; i++) {
            for (int j = 0; j < names[i].length; j++) {
                int col = (int) (Math.random() * names[i].length);
                String temp = names[i][col];
                names[i][col] = names[i][j];
                names[i][j] = temp;
            }
        }
        // 输出
        printArrayString(names);
    }

    public static void printArrayString(String[][] arr) {
        for (int i = 0; i < arr.length; i++) {
            for (int j = 0; j < arr[i].length; j++) {
                System.out.print(arr[i][j] + "\t");
            }
            System.out.println();
        }
    }
```

## 面向对象编程

什么是对象？

对象是一种特殊的数据结构，可以用来记住一个事物的数据，从而代表该数据。

### 声明一个明星类

```java
public class Star {
    // 声明一个明星对象
    String name;
    String sex;
    int age;
    String phone;
    String address;

    // 重写toString方法
    @Override
    public String toString()
    {
        return "Star [name=" + name + ", sex=" + sex + ", age=" + age + ", phone=" + phone + ", address=" + address
            + "]";
    }
}
```

### 在主函数实例化这个类

```java
 // 创建Star对象实例
        Star star1 = new Star();
        star1.name = "王宝强";
        star1.sex = "男";
        star1.age = 35;
        star1.phone = "13888888888";
        star1.address = "北京";
        // 打印对象具体信息
        System.out.println(star1.toString());
```

### 类的基本语法

#### 构造器

创建对象时，对象自动调用构造器。

创建学生类：

```java
package com.zheguo.oop;

public class Student {
    String name;
    int age;

    // 无参构造器
    public Student() {
        System.out.println("无参构造器");
    }

    // 有参构造器
    public Student(String name, int age) {
        this.name = name;
        this.age = age;
        System.out.println("有参构造器");
    }
}
```

调用构造器：

```java
// 创建对象，无参数，调用无参构造器
Student stu1 = new Student();
// 有参数，调用有参构造器
Student stu2 = new Student("张三", 18);
```

构造器的常见应用场景：创建对象，同时完成对对象成员变量（属性）初始化赋值。

注意事项：

- 类默认带了一个无参构造器
- 如果定义了一个有参构造器，那么默认的无参构造器就没有了，想用就得自己再写一个。

### this关键字

this是一个变量，可以用在方法中，指的是当前对象。

举个例子：

```java
//定义一个print方法，打印this
public void print() {
    // this代表当前对象
    // 那个对象调用print方法，this就是那个对象
    System.out.println(this);
}
```

```java
// 打印的是对象存储在堆中的地址值
stu2.print();
// 直接打印对象，调用的是toString方法
System.out.println(stu2);
```

**打印到控制台上的结果：**

![结果](//images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/ZHEGUO6/image/img/202411201710496.png)

打印出来的都是对象存储的地址，并且地址位置相同表示为同一对象。

**this关键字的应用场景：**解决变量名称冲突问题。

例如：

```java
public void favorite(String name) {
    // 有了this,形参就不会跟成员变量的名称冲突了
    System.out.println(this.name + "喜欢" + name);
}

// 调用方法
Student stu2 = new Student("张三", 18);
stu2.favorite("java");

// 打印结果
张三喜欢java
```

## 封装

面向对象三大特征：封装、继承、多态。‘

为保证对象里面的数据私有化，给每个成员变量前面加上private标识符，并提供Getter和Setter方法。

```java
package com.zheguo.capsulation;

public class Student {
    // 成员变量私有化
    private String name;
    private int age;

    // 无参构造器
    public Student() {
        System.out.println("无参构造器");
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void print() {
        System.out.println("姓名：" + name + "，年龄：" + age);
    }
}
```

## Javabean

什么是实体类？需要满足以下条件

![](//images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/ZHEGUO6/image/img/202411201904073.png)

代码的分层思想：

先封装一个实体类，用于读写学生的成绩信息

```java
package com.zheguo.operator;

public class Student {
    private String name;
    private double Chinese;
    private double Math;

    // 无参构造器
    public Student() {

    }

    // 有参构造器
    public Student(String name, double c, double m) {
        this.name = name;
        this.Chinese = c;
        this.Math = m;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getChinese() {
        return Chinese;
    }

    public void setChinese(double chinese) {
        Chinese = chinese;
    }

    public double getMath() {
        return Math;
    }

    public void setMath(double math) {
        Math = math;
    }
}
```
再定义一个管理类用于存放业务逻辑代码：
```java
package com.zheguo.operator;

public class Operator {
    private Student s;

    public Operator(Student s) {
        this.s = s;
    }

    // 计算学生的总分
    public String total() {
        return "学生" + this.s.getName() + "的总分为" + (this.s.getChinese() + this.s.getMath());
    }

    // 计算学生的平均分
    public String average() {
        return "学生" + this.s.getName() + "的平均分为" + (this.s.getChinese() + this.s.getMath()) / 2;
    }
}
```

在主函数调用方法：

```java
public static void main(String[] args) {
    Student student = new Student("张三", 90, 80);
    Operator operator = new Operator(student);
    System.out.println(operator.total());
    System.out.println(operator.average());
}
```

## static 静态

static叫静态，可以修饰成员变量，成员方法。

成员变量按照有无static修饰，分为两种：

- 静态变量（类变量）：有static修饰，这计算机里只有一份，会被类的的全部对象共享。
- 实例变量（对象的变量）：无static修饰，属于每个对象的。

```java
static double english;
```

```java
Student student = new Student("张三", 90, 80);
// 类变量可以拿类名访问，实例变量只能通过实例名访问
Student.english = 60;
```

### 静态变量的应用场景

- 如果某个数据只要一份，且希望能够被共享（访问，修改），则该数据可以定义成成员变量来记住。

案例导学：

- 系统启动后，要求用户类可以记住自己创建了多少个用户对象。

```java
public class User {
    static int count = 0;

    public User(){
        // 每创建一个对象，就加一
        count++;
    
}
```

```java
public static void main(String[] args) {
    new User();
    new User();
    new User();
    System.out.println(User.count);// 3
}
```

静态方法使用和静态变量大体相同。在做功能性方法，不需要使用对象内的实例变量时，可以加上static。

**静态方法应用场景**：封装工具类

### 为什么工具类中的方法要使用静态方法，而不用实例方法？

- 实例方法需要创建对象实例来调用，此时调用对象只是为了调用方法，对象占用内存，这样会浪费内存。
- 静态方法，直接用类名调用即可，调用方便，也能节省内存。

**多学一招：**

**工具类没有创建对象的需求，建议将工具类的构造器进行私有，防止别人实例化工具类。**

注意事项：

![](https://cdn.jsdelivr.net/gh/ZHEGUO6/image/img/202411210938173.png)

## 综合小项目

需求：1. 展示所有电影信息。   2. 输入id展示对应的电影信息。

第一步：电影Movie类

```java
public class Movie {
    private int id;
    private String name;
    private String actor;
    private double price;

    public Movie(int id, String name, String actor, double price) {
        this.id = id;
        this.name = name;
        this.actor = actor;
        this.price = price;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getActor() {
        return actor;
    }

    public void setActor(String actor) {
        this.actor = actor;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}
```

第二步：电影管理类

```java
public class MovieOperator {
    private final Movie[] movie;

    public MovieOperator(Movie[] movie) {
        this.movie = movie;
    }
    // 显示所有电影
    public void showAll() {
        for (Movie value : movie) {
            System.out.println(value.getId() + " " + value.getName() + " " + value.getActor() + " " + value.getPrice());
        }
    }

    // 搜索电影
    public void searchMovie(int id) {
        for (Movie value : movie) {
            if (value.getId() == id) {
                System.out.println(value.getId() + " " + value.getName() + " " + value.getActor() + " " + value.getPrice());
            }
        }
    }
}
```

第三步：入口

```java
public static void main(String[] args) {
    Movie[] movies = new Movie[6];
    movies[0] = new Movie(1, "大话西游", "周星驰", 20);
    movies[1] = new Movie(2, "大话西游2", "周星驰", 20);
    movies[2] = new Movie(3, "大话西游3", "周星驰", 20);
    movies[3] = new Movie(4, "大话西游4", "周星驰", 20);
    movies[4] = new Movie(5, "大话西游5", "周星驰", 20);
    movies[5] = new Movie(6, "大话西游6", "周星驰", 20);

    // 创建电影操作类
    MovieOperator mo = new MovieOperator(movies);

    // 显示所有电影
    mo.showAll();

    System.out.println("-------------------------------------");
    // 输入电影编号显示电影对象
    mo.searchMovie(1);
}
```

## 继承

为什么要继承？

提高代码的复用性，减少一些代码的重复书写。

什么是继承?

Java中提供了一个关键字extends，用这个关键字，可以让一个类和另一个类建立起父子关系。

例如：

父类People类

```java
public class People {
    String name;
    String sex;

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
```

子类：老师类，咨询师类

```java
public class Teacher extends People {
    String skill;

    public String getSkill() {
        return skill;
    }

    public void setSkill(String skill) {
        this.skill = skill;
    }

    public void teach() {
        System.out.println(super.name + "老师正在讲" + skill);
    }
}
```

```java
public class Consultant extends People {
    private int number;

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public void work() {
        System.out.println(super.getName() + "咨询师帮助了" + number + "位客户");
    }
}
```

入口：

```java
public class Entry {
    public static void main(String[] args)
    {
        Teacher t = new Teacher();
        t.setName("张三");
        t.setSex("男");
        t.setSkill("java");
        t.teach();// 张三老师正在讲java

        Consultant c = new Consultant();
        c.setName("李四");
        c.setSex("女");
        c.setNumber(123);
        c.work();// 李四咨询师帮助了123位客户
    }
}
```

## 权限修饰符

- private 只能本类。
- 缺省 本类，同一个包中的类。
- protected 本类，同一个包中的类，子孙类中。
- public 任意位置

**public > protected > 缺省 > private**

![](https://cdn.jsdelivr.net/gh/ZHEGUO6/image/img/202411211457083.png)

![](https://cdn.jsdelivr.net/gh/ZHEGUO6/image/img/202411211520280.png)

继承后子类访问成员的特点：就近原则

- 在子类方法中访问其他成员（成员变量，成员方法），是依照就近原则的。
- 先子类局部范围找，然后子类成员范围找，然后父类成员范围找，如果父类范围还没有找到则报错。

**super关键字：**

**访问父类的方法和关键字。**

## 方法重写

当子类觉得父类中的某个方法不好用，或者无法满足自己的需求时，子类可以重写一个方法名称、参数列表一样的方法，去覆盖父类这个方法。

注意事项：

- 子类重写父类方法时，访问权限必须大于或者等于父类该方法的权限（public > protected > 缺省)
- 重写的方法返回值类型，必须和被重写的方法返回值类型一样，或者范围更小。
- 私有方法，静态方法不能被重写，如果重写会报错的。

**举个例子：重写Object的toString方法**

```java
package com.zheguo.override;

public class demo02 {
    public static void main(String[] args) {
        Student student = new Student("张三", 20, "男");
        System.out.println(student);
    }
}

class Student {
    private String name;
    private int age;
    private String sex;

    public Student(){

    }

    public Student(String name, int age, String sex){
        this.name = name;
        this.age = age;
        this.sex = sex;
    }

    // 重写Object的toString方法
    @Override
    public String toString() {
        return "Student {name=" + name + ", age=" + age + ", sex=" + sex + "}";
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }
}
```

## 构造器

**构造器的特点：**子类的全部构造器，会先调用父类的构造器，在调用自己的。

## this(...)调用兄弟构造器

```java
package com.zheguo.constructor;

public class demo01 {
    public static void main(String[] args) {
        Student student = new Student("张三", 20);
        System.out.println(student);

        Student student2 = new Student("李四", 30, "中国工程大学");
        System.out.println(student2);
    }
}

class Student{
    private String name;
    private int age;
    private String school;


    public Student(String name, int age){
        // this关键字调用兄弟构造器
        this(name, age, "中国大学");
    }

    public Student(String name, int age, String school){
        this.name = name;
        this.age = age;
        this.school = school;
    }

    @Override
    public String toString() {
        return "Student {name=" + name + ", age=" + age + ", school=" + school + "}";
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getSchool() {
        return school;
    }

    public void setSchool(String school) {
        this.school = school;
    }
}
```

**注意**：super和this必须写在构造器的第一行，且不能同时出现

## 多态

什么是多态？

多态是在继承/实现情况下的一种现象，表现为：对象多态，行为多态。

多态的前提：

- 有继承/实现关系；存在父类引用子类对象；存在方法重写。

多态的注意事项：

- 多态是对象，行为的多态。Java的成员变量不谈多态。

代码：

```java
public class demo {
    public static void main(String[] args) {
        // 认识多态
        // 1. 对象多态
        Animal a = new Cat();
        // 2. 行为多态
        a.eat();// 编译看左边，运行看右边
        // 成员变量，编译看左边，运行也看左边

        Animal b = new Dog();
        b.eat();
    }
}
```

多态的好处：

- 在多态形式下，右边的对象是解耦合的，更便于扩展和维护。
- 定义方法时，使用父类型的形参，可以接收一切子类对象，扩展性更强，更便利。

### 多态下的类型转换

自动类型转换：父类 变量 = new 子类

强制类型转换：子类 变量 = （子类）变量

强制类型转换之后，就可以调用子类独有的方法。建议强制类型转换之前，对被转换的变量进行instance类型判断，防止报错。

## 综合项目

需求：

- 某加油站为了吸引更多的车主，推出了如下活动，车主可以办理金卡和银卡。
- 卡片信息包括：车主姓名，车牌号码，电话号码，卡片余额。
- 金卡办理时入存金额必须大于等于5000元，银卡办理时预存金额必须大于等于2000元，金卡支付时享受八折优惠，银卡支付时享受九折优惠，金卡消费满200元可以提供免费洗车票的服务。

题目：请使用面向对象编程，完成该加油站支付机的存款和消费程序。

代码：

**Card类**

```java
package com.zheguo.project;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data // 自动生成getter/setter方法
@NoArgsConstructor // 无参
@AllArgsConstructor // 全参
public class Card {
    private String name;
    private String cardId;
    private String phone;
    private double money;


    // 写一个存储金额的方法
    public void saveMoney(double money) {
        this.money += money;
    }

    // 消费金额的方法
    public void payMoney(double money) {
        this.money -= money;
    }

}
```

**金卡子类**

```java
package com.zheguo.project;

public class GoldCard extends Card {

    public GoldCard(String name, String cardId, String phone, int money) {
        super(name, cardId, phone, money);
    }

    // 重写消费方法
    @Override
    public void payMoney(double money) {
        System.out.println("金卡卡主，" + this.getName() + "您消费的金额是" + money);
        System.out.println("打折之后的金额是" + money * 0.8);
        // 1. 判断余额是否充足
        if (this.getMoney() >= money * 0.9) {
            // 余额充足，消费
            this.setMoney(this.getMoney() - money * 0.8);
            System.out.println("恭喜，消费成功，当前余额为：" + this.getMoney());
        } else {
            // 余额不足，消费失败
            System.out.println("您当前的余额是" + this.getMoney() + "余额不足，消费失败");
            return;
        }

        if (money > 200) {
            System.out.println("恭喜您消费超过200元，赠送您一张洗车券");
        }
    }
}
```

**银卡子类**

```java
package com.zheguo.project;

public class SliverCard extends Card {

    public SliverCard(String name, String cardId, String phone, int money) {
        super(name, cardId, phone, money);
    }

    // 重写消费方法
    @Override
    public void payMoney(double money) {
        System.out.println("银卡卡主，" + this.getName() + "您消费的金额是" + money);
        System.out.println("打折之后的金额是" + money * 0.9);
        // 1. 判断余额是否充足
        if (this.getMoney() >= money * 0.9) {
            // 余额充足，消费
            this.setMoney(this.getMoney() - money * 0.9);
            System.out.println("恭喜，消费成功，当前余额为：" + this.getMoney());
        } else {
            // 余额不足，消费失败
            System.out.println("您当前的余额是" + this.getMoney() + "余额不足，消费失败");
        }
    }

}
```

**支付机方法**

```java
package com.zheguo.project;

import java.util.Scanner;

public class demo {
    public static void main(String[] args) {
        GoldCard gc = new GoldCard("小明", "123456789", "123456789", 5000);
        pay(gc);
        SliverCard sc = new SliverCard("小红", "123456789", "123456789", 2000);
        pay(sc);
    }

    // 写一个支付方法
    public static void pay(Card card) {
        Scanner sc = new Scanner(System.in);
        System.out.println("请输入要支付的金额：");
        double money = sc.nextDouble();
        card.payMoney(money);
    }
}
```

## final关键字

final关键字是最终的意思，可以修饰类，方法，变量。

- 修饰类：该类被称为最终类，特点是不能被继承了。
- 修饰方法：该方法被称为最终方法，特点是不能被重写了。
- 修饰变量：该变量有且仅能被赋值一次。

注意事项：

- final修饰基本类型的变量，变量存储的数据不能改变。
- final修饰引用类型的变量，变量存储的地址不能改变，但地址所指向的对象内容是可以被改变的。

```java
public class demo01 {
    public static void main(String[] args) {
        final int[] arr = {1, 2, 3};
        // arr = new int[]{11, 2, 3};
        // 引用类型地址不能修改，但是元素可以修改
        arr[1] = 1;
    }
}

final class A {
    // 标识final 的类不能被继承
}

class B {

    private static final String NAME = "齐天大圣"; // 被static和final修饰的成员变量通常称为常量，在编译阶段，会自动赋值，并且不允许再次赋值
    final int num = 10;

    public final void show() {
        System.out.println("show");
        // this.num = 20; 被 final 修饰的成员变量只能被赋值一次
    }
}

class C extends B {
    // 被final 修饰的方法不能被重写
    //    @Override
    //    public void show(){
    //        System.out.println("show");
    //    }
}
```

## 单例设计模式

作用：确保某个类只能创建一个对象。

```java
package com.zheguo.finalDemo;

// 单例设计模式
public class demo02 {
    public static void main(String[] args) {
        Student a = Student.getInstance();
        Student b = Student.getInstance();
        // Student  = Student.a;
        // Student b = Student.a;
        System.out.println(a == b);
    }
}

class Student {
    // 第一种：静态方法＋final关键字
    // public static final Student a = new Student();

    // 第二种：私有化成员变量
    private static Student a = new Student();

    // 私有化构造器
    private Student() {

    }

    // 提供静态方法返回唯一对象
    public static Student getInstance() {
        return a;
    }
}
```

## 枚举类

枚举是一种特殊类。

写法：

```java
public enum A{
    x,y,z;
}
```

特点：

- 枚举类中的第一行，只能写枚举类的对象名称，且要用逗号隔开。
- 这些名称，本质是常量，每个常量都记住了枚举类的一个对象。

![](https://cdn.jsdelivr.net/gh/ZHEGUO6/image/img/202411221944580.png)

应用场景：

```java
// 枚举类
package com.zheguo.enumDemo;

public enum Direction {
    UP,
    DOWN,
    LEFT,
    RIGHT
}


// 主方法
package com.zheguo.enumDemo;

public class Test2 {
    public static void main(String[] args) {
        // 使用枚举类做信息标识和分类：参数值受枚举类约束
        move(Direction.RIGHT);
    }

    // 写一个上下左右移动的方法
    public static void move(Direction direction) {
        switch (direction) {
            case UP:
                System.out.println("向上移动");
                break;
            case DOWN:
                System.out.println("向下移动");
                break;
            case LEFT:
                System.out.println("向左移动");
                break;
            case RIGHT:
                System.out.println("向右移动");
                break;
            default:
                System.out.println("无效的方向");
        }
    }
}
```

## 抽象类

- 抽象类中不一定要有抽象方法，有抽象方法的类必须是抽象类。
- 普通类有的成员变量，成员方法，构造器，抽象类都可以有。
- 抽象类最主要的特点是：抽象类不能创建对象，只能作为一只特殊的父类让子类继承并实现。
- 一个类继承抽象类，必须全部重写父类的抽象方法，否则这个类必须也定义为抽象类。

- 抽象类和抽象方法都是用abstract关键字修饰，抽象方法没有方法体，只有方法名。

### 抽象类的好处

父类知道每个子类都要做某个行为，但是每个子类要做的事情不一样，这时候，就可以把父类定义成抽象方法，交给子类去重写实现。可以更好地支持多态。

```java
// 入口方法
package com.zheguo.abstractDemo;

public class demo {
    public static void main(String[] args) {
        Animal dog = new Dog();
        // 编译看左边，运行看右边
        System.out.println(dog.name);
        dog.cry();
        // 要是想要调用子类特有方法，需要向下转型
        Dog dog2 = (Dog) dog;
        dog2.eat1();

        Animal cat = new Cat();
        cat.cry();
        Cat cat2 = (Cat) cat;
        cat2.eat2();
    }
}

--------------------------------------------------------

抽象父类
    package com.zheguo.abstractDemo;

public abstract class Animal {
    String name = "动物";

    // 抽象方法只有声明，没有方法体
    public abstract void cry();
}

------------------------------------------------------------

子类Cat
    package com.zheguo.abstractDemo;

public class Cat extends Animal{
    String name = "小猫";
    @Override
    public void cry() {
        System.out.println("猫是喵喵叫");
    }

    // 定义一个独有的方法
    public void eat2(){
        System.out.println("猫吃猫粮");
    }
}

----------------------------------------------------------
子类Dog
    package com.zheguo.abstractDemo;

public class Dog extends Animal{
    String name = "dog";
    @Override
    public void cry() {
        System.out.println("wang wang wang");
    }

    public void eat1(){
        System.out.println("吃骨头");
    }
}
```

```
需求：实现抽象类模版设计方法
老师和学生写一篇作文，开头，结尾一样，中间是正文，正文由老师或学生自己写
```

**实现：**

```java
// 大致思路：定义一个抽象父类People,重复的内容填在方法发里面，使用final关键字防止被子类重写，定义抽象方法让子类重写，执行子类独有的内容。
public abstract class People {

    public final void writeOther() {
        // 换行 \d
        System.out.println("开头\n");
        write();
        System.out.println("\n结尾");
    }

    public abstract void write();
}
```

## 接口

1. 接口是什么？

   使用interface关键自定义的一种结构，JDK 8 之前，接口中只能定义成员变量和成员方法。

2. 接口怎么使用？需要注意什么？

​		接口是需要被类实现的

```java
public class Test implements A, B {
    // 实现接口，可以同时实现多个接口
    // 本质上是多继承，实现接口里面的所有方法
    @Override
    public void write() {
        System.out.println("write");
    }

    @Override
    public void read() {
        System.out.println("read");
    }

    @Override
    public void run() {
        System.out.println("run");
    }
}
```

定义接口

```java
package com.zheguo.interfaceDemo;

public interface A {
    // 接口中定义的变量默认是常量，并且必须赋值
    // 接口里面定义的方法默认是public abstract的。
    String NAME = "zheguo";
    void write();
    void read();
}
```

### 接口的综合小案例

```
需求：
方案一 打印所有学生信息，平均分
方案二 打印所有学生信息，平均分（其中学生信息显示男女人数，平均分去掉一个最大值和最小值）
```

创建一个学生类，存储我们需要的字段和方法

```java
package com.zheguo.interfaceProject;

public class Student {
    private String name;
    private int age;
    private int score;
    private String sex;

    public Student(String name, int age, int score, String sex){
        this.name = name;
        this.age = age;
        this.score = score;
        this.sex = sex;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }
}
```

创建一个接口，用于定义我们业务方法

```java
package com.zheguo.interfaceProject;

public interface ClassDataInterface {
    void PrintAllStudent();
    void PrintAverage();
}
```

创建两个方案类，实现我们定义的接口

```java
// 这是方案一
class ClassDataIm1Impl implements ClassDataInterface {
    // 使用一个数组存储学生数据
    private Student[] students;

    public ClassDataIm1Impl(Student[] students) {
        this.students = students;
    }

    @Override
    public void PrintAllStudent() {
        for (Student s : students) {
            System.out.println(s.getName() + "同学是一个" + s.getAge() + "岁的" + s.getSex() + "生，他的成绩是" + s.getScore());
        }
    }

    @Override
    public void PrintAverage() {
        int sum = 0;
        for (Student s : students) {
            sum += s.getScore();
        }
        System.out.println("平均分是：" + sum / students.length);
    }
}

// 这是方案二
class ClassDataIm2Impl implements ClassDataInterface {
    // 使用一个数组存储学生数据
    private Student[] students;

    public ClassDataIm2Impl(Student[] students) {
        this.students = students;
    }

    @Override
    public void PrintAllStudent() {

        int maleCount = 0;
        int femaleCount = 0;
        for (Student s : students) {
            if (s.getSex().equals("男")) {
                maleCount++;
            } else {
                femaleCount++;
            }
            System.out.println(s.getName() + "同学是一个" + s.getAge() + "岁的" + s.getSex() + "生，他的成绩是" + s.getScore());
        }
        System.out.println("男学生有" + maleCount + "个，女学生有" + femaleCount + "个");
    }

    @Override
    public void PrintAverage() {
        int max = students[0].getScore();
        int min = students[0].getScore();
        int sum = 0;
        for (Student s : students) {
            sum += s.getScore();
            if (s.getScore() > max) {
                max = s.getScore();
            }
            if (s.getScore() < min) {
                min = s.getScore();
            }
        }
        System.out.println("平均分是：" + (sum - max - min) / (students.length - 2));
    }
}
```

最后定义一个主类，初始化我们的数据，启动我们的案例

```java
public class Test {
    public static void main(String[] args) {
        Student[] students = new Student[10];
        students[0] = new Student("张三", 18, 90, "男");
        students[1] = new Student("李四", 19, 80, "男");
        students[2] = new Student("王五", 20, 70, "男");
        students[3] = new Student("赵六", 21, 60, "女");
        students[4] = new Student("钱七", 22, 50, "女");
        students[5] = new Student("孙八", 23, 40, "女");
        students[6] = new Student("周九", 24, 30, "女");
        students[7] = new Student("吴十", 25, 20, "男");
        students[8] = new Student("郑十一", 26, 10, "男");
        students[9] = new Student("郑十", 27, 90, "男");

        // 转换不同的方案只需要解耦合不同的方案类就可以
        ClassDataInterface classDataInterface = new ClassDataIm1Impl(students);
        classDataInterface.PrintAllStudent();
        classDataInterface.PrintAverage();
    }
}
```

### 接口新增的三种方法

```java
public interface C {
    // 1. 默认方法（实例方法）使用default修饰，默认会被加上public修饰
    // 注意：只能使用使用接口的实现类对象调用
    default void run(){
        System.out.println("C.run()");
    }

    // 2. 静态方法使用static修饰，默认会被加上public修饰
    // 注意：只能使用接口名调用
    static void show(){
        System.out.println("C.show()");
    }
    
    // 3. 私有方法使用private修饰，默认会被加上default修饰
    // 注意：只能被接口内部的方法调用
    private void print(){
        System.out.println("C.print()");
    }
}
```

```java
// 接口C同时继承A，B接口
public interface C extends A,B{
    
}


package com.zheguo.interfaceDemo;

public class Test2 {
    public static void main(String[] args) {
        Dog d = new Dog();
        d.go();
    }
}

// 1. 接口与接口可以多继承，一个结构可以同时继承多个接口
/**
 * 类与类 单继承，一个类只能继承一个父类
 * 类与接口 多实现，一个类可以同时实现多个接口
 * 接口与接口 多继承，一个接口可以同时继承多个接口
 */

class D implements C {

    @Override
    public void run() {
        C.super.run();
    }

    @Override
    public void test() {

    }

    @Override
    public void write() {

    }

    @Override
    public void read() {

    }
}

// 2. 一个接口继承多个接口，如果多个接口中存在方法签名冲突，则此时不支持多继承，也不支持多实现。
// 3. 一个类如果继承的父类，同时实现了接口，如果父类和接口有重名的方法，那么会优先实现父类的方法。
class Animal {
    public void run() {
        System.out.println("Animal run");
    }
}

interface E {
    default void run() {
        System.out.println("E run");
    };
}

class Dog extends Animal implements E {

    public void go() {
        // 调用接口中的run方法
        /*
        * 语法：接口名.super.方法名
        * */
        E.super.run();
    }
}

// 4. 一个类实现了多个接口，如果多个接口中存在同名的默认方法，可以不冲突，实现类重写该方法即可(都不用,自己写)
interface F {
    default void cry() {
        System.out.println("F cry");
    }
}

interface G {
    default void cry() {
        System.out.println("G cry");
    }
}

class Cat implements F, G {

    @Override
    public void cry() {
        // 想要哪个调哪个方法
        F.super.cry();
        G.super.cry();
    }
}
```

## 抽象类和接口的区别

相同点：

1. 多是抽象形式，都可以有抽象方法，都不能创建对象。
2. 都是派生子类形式：抽象类是被子类继承使用，接口是被实现类实现。
3. 一个类继承抽象类或者实现接口，都必须重写他们的抽象方法，否则自己就必须成为·1抽象类或者报错。
4. 都能支持多态，都能实现解耦合。

不同点：

1. 抽象类可以定义类的全部普通成员，接口只能定义常量，抽象方法和（JDK新增的三种方法）。
2. 抽象类只能贝被类单继承，接口可以被类多实现。
3. 一个类继承抽象类就不能再继承其他类，一个类实现了接口还可以继承其他类或者实现其他接口。
4. 抽象类适用于模版思想，利于做父类，实现代码的复用性。
5. 接口更适合业务功能的解耦合，解耦合性更强更灵活。

## 综合案例-智能家居系统

具体步骤：

```
// 1.创建设备类
// 2.创建数组，存储家电对象
// 3.给每个设备类定义一个开 or 关的方法
// 4.创建一个智能管理对象，控制设备的开关（单例模式）
```

创建设备类

```java
package com.zheguo.projectDemo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// 家电父类
@Data
@NoArgsConstructor
@AllArgsConstructor
public class JD implements Switch{
    private String name;
    private boolean status;

    // 按下开关
    @Override
    public void press() {
        this.status = !this.status;
    }
}

// 设备类继承家电父类

public class AirMachine extends JD{
    public AirMachine(String name, boolean status) {
        super(name, status);
    }
}

public class Lamp extends JD{
    public Lamp(String name, boolean status) {
        super(name, status);
    }
}
.........
```

创建数组，初始化

```java
package com.zheguo.projectDemo;

import java.util.Scanner;

public class Entry {
    public static void main(String[] args) {
        // 1.创建设备类
        // 2.创建数组，存储家电对象
        JD[] jds = new JD[4];
        jds[0] = new TV("小米电视", false);
        jds[1] = new WashMachine("格力洗衣机", false);
        jds[2] = new Lamp("小米吊灯", false);
        jds[3] = new AirMachine("美的空调", false);

        // 3.给每个设备类定义一个开 or 关的方法
        // 4.创建一个智能管理对象，控制设备的开关
        SmartManage smartManage = SmartManage.getInstance();
       while (true) {
           // 5.调用管理对象的控制方法 控制电视机的开关
           System.out.println("************************************");
           System.out.println("请输入要控制的家电序号：");
           System.out.println("1.电视机\n2.洗衣机\n3.吊灯\n4.空调\n5.退出\n");
           Scanner scan = new Scanner(System.in);
           int swi = scan.nextInt();
           switch (swi) {
               case 1:
                   smartManage.Controller(jds[0]);
                   break;
               case 2:
                   smartManage.Controller(jds[1]);
                   break;
               case 3:
                   smartManage.Controller(jds[2]);
                   break;
               case 4:
                   smartManage.Controller(jds[3]);
                   break;
               case 5:
                   System.out.println("欢迎下次使用");
                   return;
               default:
                   System.out.println("输入有误，请重新输入");
                   break;
           }
           smartManage.printAll(jds);
       }

    }
}
```

创建接口，定义开关控制方法，JD类实现这个接口

```java
package com.zheguo.projectDemo;

public interface Switch {
    public void press();
}
```

创建家具控制对象（单例模式）

```java
package com.zheguo.projectDemo;

// 单例模式
public class SmartManage {
    private static final SmartManage instance = new SmartManage();

    // 私有化构造方法
    private SmartManage() {
    }

    // 提供一个公有的静态方法，返回实例
    public static SmartManage getInstance() {
        return instance;
    }

    public void Controller(JD jd) {
        jd.press();
    }

    // 打印所有开关状态
    public void printAll(JD[] jds) {
        System.out.println("当前所有开关状态：");
        System.out.println("--------------------------------");
        for (JD jd : jds) {
            System.out.println(jd.getName() + "开关状态：" + (jd.isStatus() ? "开" : "关"));
        }
    }
}
```

## 代码块

#### 静态代码块：

格式：

```java
static {
   // .......
}
```

特点：类加载时自动执行，由于类只会加载一次，相对于静态方法优先加载，只加载一次。

基本作用：可以完成对类的静态资源初始化。

#### 实例代码块：

格式：

```java
{
  // ......
}
```

特点：每次创建对象时，执行实例代码块，并在构造器前执行。

作用：和构造器一样，都是用来完成对象的初始化的。例如对实例变量进行初始化。

## 内部类

#### 成员内部类

1. 内部类可以直接调用外部类的静态成员，也可以直接访问外部类的实例成员
2. 内部类实例方法中可以直接拿到外部类的对象 外部类名.this

创建格式：

```java
public class Test {
    public static void main(String[] args) {
        // 成员内部类创建对象的格式
        // 外部类名.内部类名 对象名 = new 外部类名().new 内部类名();
        OutSide.InSide i = new OutSide().new InSide();
        i.print();
    }
}
```

```java
package com.zheguo.interClass;

public class OutSide {
    // 定义外部类的成员变量和类变量
    private static int a = 1;
    private int b = 2;

    public static int getA() {
        return a;
    }

    public static void setA(int a) {
        OutSide.a = a;
    }

    public int getB() {
        return b;
    }

    public void setB(int b) {
        this.b = b;
    }

    public void run() {
        System.out.println("这里是run方法");
    }


    // ---------------------------------------------------------

    public class InSide {
        // 内部类里面包括一切成员
        private String name;
        private static int d = 4;

        // 无参构造方法
        public InSide() {

        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public static int getD() {
            return d;
        }

        public static void setD(int d) {
            InSide.d = d;
        }

        // 有参构造方法
        public InSide(String name){
            this.name = name;
        }


        public void print() {
            System.out.println(a);
            run();
            // 拿到外部类的对象
            System.out.println(OutSide.this);
        }
    }
}
```

####  静态内部类

- 有static关键字修饰
- 外部类名.内部类名 对象名 = new 外部类名.内部类名();
- 可以访问外部类的静态成员，但是不能访问外部类的实例成员

#### 局部内部类

- 局部内部类是定义在方法中，代码块中，构造器等执行体中。

#### 匿名内部类 *

- 是一种特殊的局部内部类。
- 所谓匿名是指在代码内部不需要为它命名，实际上是有名字的，一般为 外部类$编号.class
- 匿名内部类本质上是一个子类。
- 作用：更方便的创建子类对象。

创建格式：

```java
Animal a = new Animal(){
    @Override
    public void cry() {
        System.out.println("我是一个匿名内部类");
    }
};
```

**内名内部类的应用场景**

一、通常作为传递方法的对象参数来使用。根据不同的子类对象，来使用其内部特有的方法。

二、在开发当中不是我们主动去写匿名内部类，而是在调用一个Api的时候，让我们去new一个对象时我们可以使用匿名内部类简洁代码形式。

```java
public class guiTest {
    public static void main(String[] args) {
        JFrame frame = new JFrame();
        frame.setTitle("测试窗口");
        frame.setSize(400, 300);
        frame.setLocationRelativeTo(null);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

        JPanel panel = new JPanel();// 创建面板
        frame.add(panel); // 将面板添加到窗口中
        JButton button = new JButton("LOGIN"); // 创建按钮
        panel.add(button); // 将按钮添加到面板中

        // java要求必须给这个按钮添加一个事件监听器对象，这样就可以就可以监听用户的点击操作
        button.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                System.out.println("登陆成功！");
            }
        });

        // 匿名内部类可以更加简化一点,具体功能和上面一摸一样
        button.addActionListener(e -> System.out.println("登陆成功！"));
        frame.setVisible(true);// 显示窗口
    }
}
```

三、使用comparator接口的匿名内部类实现对数组的的排序

```java
package com.zheguo.interClass;

import java.util.Arrays;
import java.util.Comparator;

public class ArraySort {
    public static void main(String[] args) {
        Student[] students = new Student[5];
        students[0] = new Student("张三", 20, "男", 90);
        students[1] = new Student("李四", 21, "女", 20);
        students[2] = new Student("王五", 22, "男", 20);
        students[3] = new Student("赵六", 23, "女", 60);
        students[4] = new Student("小七", 24, "男", 90);

        // 在这里直接使用匿名内部类
        Arrays.sort(students, new Comparator<Student>() {
            @Override
            public int compare(Student o1, Student o2) {
                // 升序规则：如果左边的分数大于右边，返回正整数，否则返回负整数
                // 降序规则：如果左边的分数大于右边，返回负整数，否则返回正整数
                //   return o1.getScore() - o2.getScore();
                return o2.getScore() - o1.getScore();
            }
        });

        // 打印排序后的数组
        for (Student student : students) {
            System.out.println(student);
        }

    }


}
```

##  Lambda

```java
public class Demo {
    public static void main(String[] args) {
        // Lambda表达式并不是可以简化全部的匿名内部类，只能简化函数式接口的匿名内部类
        InterTest a = () -> {
            System.out.println("hello");
        };
        a.show();


        // 这种写法是错误的，Lambda表达式只能简化函数式接口的匿名内部类,不能简化抽象类
        //        Animal a1 = () -> {
        //            System.out.println("eat");
        //        }
    }
}

// 什么是函数式接口？ 只能有一个抽象方法的接口
@FunctionalInterface
interface InterTest {
    void show();
}

abstract class Animal {
    public abstract void eat();
}
```

1. 什么是函数式编程？有什么好处？

- 使用Lambda函数替代某些匿名内部类对象，从而让代码更加简洁，可读性更好。

2. Lambda表达式是啥？有什么用？怎么写？

- JDK8新增的一种语法，代表函数。
- ()->{ 执行体 }

3.  什么样的接口是函数式接口？怎么确保一个接口必须是函数式接口？

- 只有一个方法的函数是函数式接口。
- 在接口上加上@FunctionalInterface注解即可

```java
// 在这里直接使用匿名内部类
/* Arrays.sort(students, new Comparator<Student>() {
    @Override
    public int compare(Student o1, Student o2) {
        return o2.getScore() - o1.getScore();
    }
}); */

// 简写
/* Arrays.sort(students, (Student o1, Student o2) -> {
    return o2.getScore() - o1.getScore();
}); */

// 去掉类型
/* Arrays.sort(students, (o1, o2) -> {
    return o2.getScore() - o1.getScore();
}); */

// 去掉方法体和return
Arrays.sort(students, (o1, o2) -> o2.getScore() - o1.getScore());
```

1. 类型参数全部可以不写。
2. 如果只有一个参数，参数类型省略的同时 "()"也可以省略，但是多个参数不能省略 "()"
3. 如果Lambda表达式中只有一行代码，大括号可以不写，同时要省略分号“;”，如果这行代码是return语句，也必须去掉return。

### 方法引用

#### 静态方法引用

格式： 类名::静态方法

使用场景：如果某个Lambda表达式里面只是调用一个静态方法，并且 “->” 前后的参数一致，就可以使用静态方法引用。

```java
Arrays.sort(students, Student::compareBy);

// 学生类里面定义一个静态类（这个静态方法不局限于学生类）
public static int compareBy(Student o1, Student o2){
        return o1.getScore() - o2.getScore();
}
```

#### 实例方法引用

格式： 对象名::实例方法

使用场景：如果某个Lambda表达式里面只是调用一个实例方法，并且 “->” 前后的参数一致，就可以使用实例方法引用。

```java
Student s = new Student();
Arrays.sort(students, s::compareByHeight);

public int compareByHeight(Student o1, Student o2){
    return Double.compare(o1.getHeight(), o2.getHeight());
}
```

#### 特定类的方法引用

格式： 特定类的名称::方法

使用场景：如果摸个Lambda表达式只是调用一个特定类型的实例方法，并且前面参数列表的第一个参数作为方法的主调，后面的所有参数都是作为该实例方法的入参，此时就可以使用特定类型方法引用。

```java
//        Arrays.sort(arr, new Comparator<String>() {
//            @Override
//            public int compare(String o1, String o2) {
//                // compareToIgnoreCase 忽略首字母大小写比较编码值大小，返回值是正负数
//                return o1.compareToIgnoreCase(o2);
//            }
//        });

Arrays.sort(arr, String::compareToIgnoreCase);
```

#### 构造器引用

格式： 类名::new

```java
CartFunc cf = name ->new Car(name);

// 简化
CartFunc cf = Car::new
```

## 常用API、

### String类

subString，charAt。。。。。

案例：随机生成指定数量的验证码全，要求包含大小写和数字。

```java
package com.zheguo.Lambda;

public class Project {
    public static void main(String[] args) {
        System.out.println(getCode(6));
    }

    // 写一个方法，传入一个整数，返回对应数量的验证码，验证码可以是大写小写字母，数字，随机生成
    public static String getCode(int num) {
        // 定义一个字符串存储可能用到的字符
        String str = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        String code = "";
        for (int i = 0; i < num; i++) {
            // 生成随机数，范围为0-61，因为str有62个字符
            int index = (int) (Math.random() * str.length());
            // 根据随机数获取对应的字符
            char ch = str.charAt(index);
            // 将字符添加到code中
            code += ch;
        }
        return code;
    }
}
```

### ArrayList

```java
public class Demo {
    public static void main(String[] args) {
        // 创建一个数组
        ArrayList<String> list = new ArrayList<>();
        // 添加元素到数组末尾
        list.add("张无忌");
        list.add("阳顶天");
        list.add("小昭");
        list.add("赵敏");

        // 删除数组里面对应的元素
        // System.out.println(list.remove("小昭"));
        // 依据下标删除对应元素
        // System.out.println(list.remove(1));
        // 修改对应下标的数组元素
        // System.out.println(list.set(1, "周芷若"));
        // 找到对应元素的下标
        // System.out.println(list.indexOf("小昭"));
        // 获取对应下标对应的元素
        // System.out.println(list.get(1));
        System.out.println(list);
    }
}
```

## GUI编程

![](//images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/ZHEGUO6/image/img/202411271853458.png)

## 异常

Error：代表的系统级别错误（属于严重问题），也就是说系统一旦出现问题，Sun公司会把这些问题封装成Error对象给出来。

Exception：异常，代表的是我们的程序可能出现的问题。

- 运行时异常（RuntimeException及其子类)：编译阶段不会出现错误提醒，运行时出现的异常。
- 编译时异常：编译阶段就会出现错误提醒的。

### 处理异常的两种方法：

```
// 处理异常的两种办法？

// 第一种try-catch捕获异常，把异常打印出来
/* try {
    // 可能会抛出异常的代码
} catch (Exception e) {
    // 处理异常的代码
} */

// 第二种throw抛出异常，让调用者处理
// throw new RuntimeException("抛出异常");
```

### 异常的作用？

- 作用1：异常是用来定位程序Bug的关键信息。
- 作用2：可以作为方法内部的一种特殊返回值，以便通知上层调用者，方法的执行问题。

## 自定义异常类

如果你需要自定义自己的异常，比如说登录时的密码，用户名长度不规范。这种就可以封装成一个异常类。你可以继承Exception类为编译异常。继承RuntimeException为运行时异常。

编译时异常，无论你的方法是否调用正确，都会报错。这种情况下，要不把异常往上抛，交给上层解决。要不就是用trycatch包围。

```java
try {
    throw new Exception("除数不能为0");
} catch (Exception e) {
    throw new RuntimeException(e);
}
```

**自定义运行时异常**

- 定义一个异常类继承RuntimeException.
- 重写构造器。
- 通过 throw new 异常类(xxx) 来创建对象并抛出。
- 特点：编译阶段不报错，运行时会抛出异常！提醒不属于激进型。

**自定义编译异常**

- 定义一个异常类继承Exception。
- 重写构造器。
- 通过 throw new 异常类(xxx) 来创建对象并抛出。
- 特点：编译阶段报错，属于激进型！

**举例说明：**

**运行时异常**

需求：如果传递的用户名和密码长度小于10位，就抛出异常。

```java
public class LoginException extends RuntimeException {
    public LoginException() {}
    // 需求：如果传递的用户名和密码长度小于10位，就抛出异常。
    public LoginException(String message) {
        super(message);
    }
}


// 写一个测试密码长度是否大于等于10的方法 运行时异常不用向上层抛异常，因为默认已经带上了
public static void checkPassword(String password){
    if (password.length() < 10) {
        // 抛出异常
        throw new LoginException("密码长度不能小于10");
    }
    System.out.println("密码长度符合要求");
}
```

**编译时异常**

需求：账号可以为大写字母，小写字母，数字但是长度大于等于6位

```java
public class signUpException extends Exception {
    // 需求：账号可以为大写字母，小写字母，数字但是长度大于等于6位
    public signUpException() {
    }

    public signUpException(String message) {
        super(message);
    }
}

// 写一个测试账号是否符合规则的方法 编译时异常必须向上层抛异常
public static void checkAccount(String account) throws signUpException {
    if (!account.matches("[a-zA-Z0-9]{6,}")) {
        // 抛出异常
        throw new signUpException("账号不符合规则");
    }
    System.out.println("账号符合规则");
}
```

**通过捕获异常来让程序不容易崩掉。**

```java
public class Demo2 {
    public static void main(String[] args) {
        // 通过异常捕获实现程序的健壮性和可修复性
        while (true) {
            try {
                double price = getPrice();
                System.out.println("价格是：" + price);
                break;
            } catch (Exception e) {
                System.out.println("输入价格有误，请重新输入");
            }
        }
        System.out.println("程序结束");
    }

    // 写一个方法接受用户输入的价格并返回
    public static double getPrice() {
        Scanner sc = new Scanner(System.in);
        System.out.println("请输入价格：");
        return sc.nextDouble();
    }
}
```

## 泛型

定义类，接口，方法时，同时声明一个或者多个类型变量（如：<E>)称为泛型类，泛型接口，泛型方法，它们统称为泛型。

作用：泛型提供了在编译阶段约束所能操作的数据类型，并自动进行检查的能力！这样可以避免强制类型转换，及其可能出现的异常。

```java
public static void main(String[] args) {
    // 创建一个ArrayList对象，泛型为String
    // 泛型约束了ArrayList里面的元素，只能是String类型
    ArrayList<String> list = new ArrayList<String>();
    list.add("hello");
    list.add("world");

    // 获取数据
    for (String s : list){
        System.out.println(s);
    }
}
```

### 泛型类

格式：

```
修饰符 class 类名<类型变量，类型变量，...>{

}
```

注意：类型变量建议用大写的英文字母，常用的有：E,T,K,V等

### 泛型接口

格式：

```
修饰符 interface 接口名<类型变量，类型变量，...>{

}
```

例如：

```java
public interface DemoInerface<T> {
    // 需求：给一个Teacher类型的集合，添加一个Teacher对象或者给一个Student类型的集合，添加一个Student对象
    // 功能：增删改查
    void add(T t);

    T get(int index);

    void update(int index, T t);

    void delete(int index);
}
```

### 泛型方法

格式：

```
修饰符 <类型变量，类型变量，...> 返回值类型 方法名(形参列表){

}
```

```java
// 使用泛型写一个可以接收任何类型数组的方法
public static <T> void printArray(T[] array){
    for (T t : array){
        System.out.println(t);
    }
}
```

通配符：“ ？”，在使用泛型的时候可以代表一切类型。

泛型的上下限：

- 泛型上限：？extends Car:  ?能接收的必须是Car或者其子类。
- 泛型下限：？ super Car:  ？能接受的必须是Car或者其父类。

### 泛型支持的类型

泛型不支持基本数据类型，支持对象数据类型（引用数据类型）。

#### 包装类

把基本数据类型封装成对象。

```java
// 包装类：将基本类型转换为对象
// Integer a = Integer.valueOf(10);

// 自动装箱：将基本类型转换为包装类对象
Integer a = 10;

// 自动拆箱：将包装类对象转换为基本类型
int b = a;
```

```java
// 包装类新增的两个功能：1.将包装类转换为字符串，2.将字符串转换为包装类对象
int A = 11;
String str = Integer.toString(A);
System.out.println(str + 5); // 输出：115

String str2 = "12";
int B = Integer.valueOf(str2);
System.out.println(B + 5); // 输出：17
```

## 集合框架

Collection(单列集合)：每一个元素只包含一个值。

- List系列集合：
  1. ArrayList,LinkdList：有序，可重复，有索引。
- Set系列集合：
  1. HashSet：无序，不重复，无索引。
  2. LinkedHashSet：有序，不重复，无索引。
  3. TreeSet：按照大小默认升序排序，不重复，无索引。

Map(双列集合)：每个元素包含两个值（键值对）。

```java
// 了解Collection集合
// List家族的特点：1.有序，2.可重复 3.索引
// 举例说明
ArrayList<String> list2 = new ArrayList<String>();
list2.add("hello");
list2.add("world");
list2.add("hello");
System.out.println(list2); // 输出：[hello, world, hello]

// Set家族的特点：1.无序，2.不可重复 3.无索引
// 举例说明
HashSet<String> set = new HashSet<String>();
set.add("hello");
set.add("world");
set.add("hello");
System.out.println(set); // 输出：[world, hello]
```

**Collection的常用方法：**

```
// Collection集合的所有常用方法
// add(Object obj)：添加元素
// remove(Object obj)：删除元素
// set(int index,Object obj)：修改指定位置的元素
// indexOf(Object obj)：查找指定元素的下标
// get(int index)：获取指定位置的元素
// toArray()：将集合转换为数组
// size()：获取集合大小
// clear()：清空集合
// isEmpty()：判断集合是否为空
// contains(Object obj)：判断集合是否包含某元素
// forEach(Consumer<? super T> action)：遍历集合
```

**Collection循环遍历的三种方法：**

```java
// 目标：了解Collection集合的遍历方法
Collection<String> list = new ArrayList<>();
list.add("大角牛");
list.add("问天");
list.add("光头强");
list.add("龙戬");
list.add("洛洛");

// 方法一：使用iterator迭代器遍历
System.out.println("=====使用itrator迭代器遍历=====");
Iterator<String> it = list.iterator();
// hasNext() 判断是否还有下一个元素,返回一个布尔值
// 注意元素越界！否则会报NoSuchElementException异常
while (it.hasNext()) {
    String s = it.next();
    // next 获取下一个元素
    System.out.println(s);
}

// 方法二：使用for-each遍历 既可以遍历数组，也可以遍历集合
System.out.println("=====使用for-each遍历=====");
list.forEach(System.out::println);

// 方法三：使用增强for循环遍历
System.out.println("=====使用普通for循环遍历=====");
for (String s : list) {
    System.out.println(s);
}
```

并发修改异常

- 需求：我在购物车里里买了多种商品，买了三本书、一支钢笔、一种鼠标。现在需要批量删除书籍，使用集合来实现。

**一、使用for循环来实现**

```java
ArrayList<String> list = new ArrayList<>();
list.add("java书");
list.add("c++书");
list.add("python书");
list.add("钢笔");
list.add("鼠标");

// 批量删除所有书籍
/*并发修改异常：
使用for循环遍历删除,会出现删除不干净的情况，原因是集合的元素是动态的，每次删除一个元素，集合的长度就减1，导致后续的元素下标发生改变，导致跳过该删除的元素。
* */
// 解决方案一：倒序遍历
for (int i = list.size() - 1; i >= 0; i--) {
    String name = list.get(i);
    if (name.contains("书")) {
        list.remove(name);
    }
}
// 解决方案二：加上i--
for (int i = 0; i < list.size(); i++) {
    String name = list.get(i);
    if (name.contains("书")) {
        list.remove(name);
        // 每删除一个元素，下标减一
        i--;
    }
}
```

**二、使用迭代器实现**

```java
// 如果使用迭代器来删除的话
Iterator<String> iterator = list.iterator();
while (iterator.hasNext()) {
    String name = iterator.next();
    if (name.contains("书")) {
        // 使用迭代器的remove方法，它里面有一个新旧状态的对比判断并且同步
        iterator.remove();
    }
}
```

## ArrayList的底层原理

- ArrayList底层是基于数组存储数据的。(查询速度快)

![](https://cdn.jsdelivr.net/gh/ZHEGUO6/image/img/202411292101036.png)

### LinkedList的底层原理

- LinkedList底层是基于链表存储数据的。

什么是链表？

链表中的数据是一个一个独立的结点组成的，节点在内存中是不连续的，每个结点包含数据值和下一个结点的地址。

链表的特点：

- 查询慢，无论查询哪个数据都要从头开始。
- 链表增删相对快。

## set集合

Set系列集合：

1. HashSet：无序，不重复，无索引。
2. LinkedHashSet：有序，不重复，无索引。
3. TreeSet：按照大小默认升序排序，不重复，无索引。

小栗子：使用Set集合去重。

```java
public String toString() {
    return "{姓名：" + name + "，年龄：" + age + "，地址：" + address + "，学校：" + school + "}";
}

// 重写equals方法和hashCode方法
@Override
public boolean equals(Object obj) {
    if (this == obj) {
        return true;
    }
    if (obj == null || getClass() != obj.getClass()) return false;
    Student s = (Student) obj;
    return this.name.equals(s.name) && this.age == s.age && this.address.equals(s.address) && this.school.equals(s.school);
}

@Override
public int hashCode() {
    return Objects.hash(name, age, address, school);
}
```

## Map集合

注意：Map集合的特点都是由键决定的，值只是一个附属品，只是不做要求的。

- HashMap（由键决定的特点）：无序，不重复，无索引；（用的最多）
- LinkedHashMap（由键决定的特点）：由键决定的特点：有序，不重复，无索引。
- TreeMap（由键决定特点）：按照大小默认升序排序，不重复，无索引。



### 常用方法

```java
// Map的常用方法
System.out.println(map.get("a")); // 获取指定值
System.out.println(map.size()); // 获取键值对个数
System.out.println(map.containsKey("a")); // 判断是否包含键
System.out.println(map.containsValue(1)); // 判断是否包含值
System.out.println(map.keySet()); // 获取所有的键
System.out.println(map.values()); // 获取所有的值

// 遍历键
// 因为键无序不重复，所以使用Set集合存储
Set<String> keys = map.keySet();
for (String key : keys) {
    System.out.println(key);
}

// 遍历值
// 因为值有可能重复的，所以使用Collection集合存储
Collection<Integer> values = map.values();
for (Integer value : values) {
    System.out.println(value);
}
```

### 遍历方法

```java
// map集合的遍历方法一：
for (String key : map.keySet()) {
    Integer value = map.get(key);
    System.out.println(key + ":" + value);
}

// map集合的遍历方法二：
Set<Map.Entry<String, Integer>> entries = map.entrySet();
for (Map.Entry<String, Integer> entry : entries) {
    System.out.println(entry.getKey() + ":" + entry.getValue());
}

// map集合的遍历方法三：
map.forEach((k,v)->{
    System.out.println(k + ":" + v);
});
```

## 综合案例

```java
public class Demo {
    public static void main(String[] args) {
        // 综合案例:某个班级20名学生，现在组织春游活动，一共A,B,C,D四个景点，现在需要投票，请设计一个程序，统计每个景点的投票数，并给出投票结果。

        // 第一步：统计学生的投票数据
        ArrayList<String> voteData = getVoteData(80);
        Map<String, Integer> voteResult = VoteResult(voteData);
        System.out.println(voteResult);

    }

    // 写一个随机生成票数的方法
    public static ArrayList<String> getVoteData(int num) {
        ArrayList<String> list = new ArrayList<>();
        String[] str = {"精绝古城", "秦岭神树", "昆仑神宫", "黄皮子坟" };
        for (int i = 0; i < num; i++) {
            int index = (int) (Math.random() * str.length);
            list.add(str[index]);
        }
        return list;
    }

    public static Map<String, Integer> VoteResult(ArrayList<String> voteData) {
        // 第二步：分析投票数据，统计每个景点的投票数
        // 第三步：把投票结果存储到Map集合里面
        Map<String, Integer> map = new HashMap<>();
        for (String v : voteData) {
            map.put(v, map.containsKey(v) ? map.get(v) + 1 : 1);
        }
        return map;
    }
}
```

## Stream流

1. Stream流是什么？有什么作用？结合了什么技术？
   简化集合，数组操作的API。结合了Lambda表达式。
2. 说说Stream流处理数据的步骤是什么？

- 先得到集合或者数组的Stream流。
- 然后调用Stream流的方法对数据进行处理。
- 获取处理的结果。

### 拿到不同数据结构的stream流

```java
// 1. Collection集合获取Stream流
Collection<String> list = new ArrayList<>();
list.stream();

// 2. Map集合获取Stream流
Map<String,Integer> map = new HashMap<>();

// 键Stream流
Stream<String> stream = map.keySet().stream();

// 值Stream流
Stream<Integer> values = map.values().stream();

// 键值对Stream流
Set<Map.Entry<String, Integer>> entries = map.entrySet();
entries.stream();

// 3. 数组获取Stream流
int[] arr = {1,2,3,4,5};
Stream<int[]> stream1 = Stream.of(arr);
Stream<Integer> stream2 = Stream.of(1,2,3,4,5);
Stream<Integer> stream3 = Arrays.stream(arr);
```

### Stream流常用的几个中间方法

```java
// Stream流常用的几个中间方法
System.out.println("==========");
ArrayList<String> list = new ArrayList<>();
list.add("张三");
list.add("李四");
list.add("王五");
list.add("赵六");
list.add("王七");

/*
方法一：filter过滤方法
* */
// list.stream()把List转换成流对象
// 把名字里面以“王”开头的元素打印出来
list.stream().filter(name -> name.startsWith("王")).forEach(System.out::println);

List<Double> list2 = new ArrayList<>();
list2.add(12.3);
list2.add(23.4);
list2.add(34.5);
list2.add(34.5);
list2.add(45.6);
list2.add(56.7);

/*
方法二：sorted排序方法
* */
list2.stream().sorted().forEach(System.out::println);// 默认是升序
System.out.println("==========");
list2.stream().sorted((x, y) -> Double.compare(y, x)).forEach(System.out::println);// 降序

/*
 *  方法三：limit截取方法
 * */
System.out.println("==========");
list2.stream().limit(3).forEach(System.out::println);

/*
 * 方法四：skip跳过方法
 */
System.out.println("==========");
list2.stream().skip(3).forEach(System.out::println);

/*
 * 方法五：distinct去重方法
 */
System.out.println("==========");
list2.stream().distinct().forEach(System.out::println);

/*
 * 方法六：map映射方法
 */
System.out.println("==========");
list2.stream().distinct().map(x -> "加2分后的数据->" + (x + 2)).forEach(System.out::println);

/*
 * 方法七：concat合并流
 */
System.out.println("==========");
Stream<Object> concat = Stream.concat(list.stream(), list2.stream());
concat.forEach(System.out::println);
```

### Stream流常用的几个终结方法

```java
// Stream流常用的几个终结方法
System.out.println("==========");
ArrayList<String> list = new ArrayList<>();
list.add("张三");
list.add("李四去");
list.add("王五请求");
list.add("赵六去去去");
list.add("王七去去强强强强");

/*
 * 1. 遍历方法 forEach(Consumer<? super T> action)
 */
list.stream().forEach(System.out::println);
System.out.println("==========");

/*
 * 2. 统计Stream流长度 count()
 * */
long count = list.stream().count();
System.out.println(count);
/*
 * 3. 最大值 max(Comparator<? super T> comparator)
 */
list.stream().max((s1, s2) -> s1.length() - s2.length()).ifPresent(System.out::println);

/*
 * 4. 最小值 min(Comparator<? super T> comparator)
 */
list.stream().min((s1, s2) -> s1.length() - s2.length()).ifPresent(System.out::println);
```

### Stream流常用的收集方法

```java
// Collection工具类提供的具体的收集方法

/*
* 方法一：toList()
* 把元素收集到List集合中
* */
List<Student> collect1 = list.stream().collect(Collectors.toList());
System.out.println(collect1);

/*
* 方法二：toSet()
* 把元素收集到Set集合中
* */
Set<Student> collect2 = list.stream().collect(Collectors.toSet());
System.out.println(collect2);

/*
* 方法三：toMap(Function keyMapper, Function valueMapper)
* 把元素收集到Map集合中，键由Function接口决定，值由Function接口决定
* */
Map<String, Integer> collect3 = list.stream().collect(Collectors.toMap(Student::getName, Student::getAge));
System.out.println(collect3);
```

### 方法的可变参数

```java
public class Demo03 {
    public static void main(String[] args) {

        // 可变参数
        print(1,2,3,4,5);
    }

    public static void print(int... nums){
        // 1. 可变参数nums可以接受多个参数
        // 2. 可变参数nums实际上就是一个数组
        // 3. 可变参数只能接受一个数组
        for (int i : nums) {
            System.out.println(i);
        }
    }
}
```

### Collections工具类

```java
public static void main(String[] args) {
    // Collections工具类
    List<String> list = new ArrayList<>();
    list.add("a");
    list.add("ab");
    list.add("abc");
    list.add("abcd");
    list.add("abcde");


    // 1. 给集合批量添加元素
    Collections.addAll(list,"abcdef","abcdefg");

    // 2. 打乱集合顺序
    Collections.shuffle(list);

    // 3. 给集合排序
    Collections.sort(list, (o1, o2) -> o2.length() - o1.length());
    System.out.println(list);

}
```

## IO流

File是java.io包下的类，File类的对象，用于代表当前操作系统的文件（可以是文件或者文件夹）。

注意：File类只能对文件本身进行操作，不能读写文件里面存储的数据。



使用listFiles方法时的注意事项：

- 当主调是文件，或者路径不存在时，返回null。
- 当主调是空文件时，返回一个长度为0的数组。
- 当主调是一个有内容的文件夹时，将里面的所有一级文件和文件夹的路径放到File数组中返回。
- 当主调是一个文件夹，且里面有隐藏文件时，将里面所有文件和文件夹的路径放在File数组中返回，包含隐藏文件。
- 当主调是一个文件夹，但是没有权限访问该文件夹时，返回null。

### 递归

三要素：

- 有一个公式。
- 有终节点。
- 递归的方向走向终结点。

### 案例-文件搜索

```java
public static void main(String[] args) {
    searchFile("微信图片_20220901175647.jpg", "D:\\美好时光");
}

// 文件搜索
public static void searchFile(String fileName, String filePath) {
    File file = new File(filePath);
    // 拿到文件对象列表
    File[] files = file.listFiles();
    // 判断对象列表是否为空
    if (files != null && files.length > 0) {
        for (File f : files) {
            // 判断是否是文件
            if (f.isFile()) {
                // 判断文件名是否相同
                if (f.getName().equals(fileName)) {
                    System.out.println(f.getAbsolutePath());
                }
            } else {
                // 如果是文件夹，递归调用
                searchFile(fileName, f.getAbsolutePath());
            }
        }
    }
}
```

**分类**

按照流的方向：**输入流，输出流。**

按照流的内容：**字节流（适合操作所有类型的文件），字符流（只适合操作纯文本文件）。**

![](//images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/ZHEGUO6/image/img/202412042309633.png)

### 文件字节输入流

```java
public static void main(String[] args) throws IOException {
    // 创建一个字节输入流通道
    InputStream is = new FileInputStream("day12/src/test.txt");

    // 读取文件内容
    // 1.先定义一个字节长度为3的数组
    // 缺点：也会出现乱码问题
    byte[] buffer = new byte[3];
    // 存储每次读取字节的长度
    int len;
    while ((len = is.read(buffer)) != -1) {
        // 把读取的字节数组转换为字符串
        String s = new String(buffer, 0, len);
        System.out.println(s);
    }

    //2. 一次性读取所有字节
    // 缺点：如果文件过大，内存不足，会抛出异常
    byte[] buffer2 = is.readAllBytes();
    String s2 = new String(buffer2);
    System.out.println(s2);

    //总结：字节流不适合纯文本的读取，适用于文件的复制。读取文本适何用字符流。
}
```

### 文件字节输出流

```java
public static void main(String[] args) throws Exception {
    OutputStream os = new FileOutputStream("day12/src/test2.txt", true);

    // 1. 写入一个字节(整数会被当成字节，转成字符集)
    os.write(97);

    // 2. 写入一个字节数组
    byte[] buffer = "我爱你中国".getBytes();
    os.write(buffer);

    // 3. 写入一个字节数组，指定写入的范围
    os.write(buffer, 0, 3);

    // 4. 写入一个换行符
    os.write("\r\n".getBytes());
    os.write("hello world".getBytes());

    // 每次用完之后关闭流
    os.close();
}
```

### 文件复制

```java
public static void main(String[] args) {
    // 需求：把图片复制到指定文件地址
    // 源文件地址："D:\美好时光\2024-10-31.jpg"
    // 目标文件地址："D:\铁佛寺.jpg"

    try {
        copyFile("D:\\美好时光\\2024-10-31.jpg", "D:\\铁佛寺.jpg");
    } catch (Exception e) {
        throw new RuntimeException(e);
    }

}

public static void copyFile(String srcPath, String destPath) throws Exception {
    // 1. 创建源和目标
  InputStream is = new FileInputStream(srcPath);
  OutputStream os = new FileOutputStream(destPath);

  // 2. 读取和写入
  byte[] buffer = new byte[1024];
  int len ;
  while((len = is.read(buffer)) != -1) {
      os.write(buffer, 0, len);
  }

  // 3. 关闭流
  os.close();
  is.close();
}
```

### 资源释放

```java
try{
    
}catch(Exception e){
    e.printStackTrace();
}finally{
    
}
```

- finally代码区的特点：无论try中的程序是正常执行了，还是出现了异常，最后都一定会执行finally区，除非JVM终止。
- 作用：一般用于在程序执行完成后进行的资源释放操作（专业级做法）。

### 文件字符输入流

```java
public static void main(String[] args) {
    // 目标：学习使用字符输入流读取文本到程序中

    try (FileReader fr = new FileReader("day12/src/com/zheguo/FileReader/text.txt");) {
        // 1.定义一个字节数组，用来存储每次读取的字节
        char[] buffer = new char[3];
        // 存储每次读取的字节长度
        int len;
        // 循环读取
        while ((len = fr.read(buffer)) != -1) {
            String s = new String(buffer, 0, len);
            System.out.print(s);
        }
    } catch (Exception e) {
        e.printStackTrace();
    }
}
```

### 文件字符输出流

```java
public static void main(String[] args) {
    try (Writer writer = new FileWriter("day12/src/com/zheguo/FileWrite/text.txt", true);) {
        writer.write("艰难苦恨繁霜鬓，潦倒新停浊酒杯");
        writer.write("浮生若梦");
        writer.flush();// 刷新缓冲区, 将缓冲区中的数据写入文件
        System.out.println("写入成功");
    } catch (Exception e) {
        e.printStackTrace();
    }
}
```

### 缓冲流

作用：可以提高字节输入流读取数据的性能。

原理：缓冲字节/字符输入流自带了8kb缓冲池；缓冲字节/字符输出流也自带了8kb缓冲池。

```java
// 缓冲流一共有四种
// 1. 缓冲字节输入流 BufferedInputStream
// 2. 缓冲字节输出流 BufferedOutputStream
// 3. 缓冲字符输入流 BufferedReader
// 4. 缓冲字符输出流 BufferedWriter
```

**使用缓冲流来优化文件复制**

```java
 // 1. 创建源和目标
    // 资源释放新方法 try-with-resources
    try (
            // 放置资源对象，执行完毕之后会自动释放资源
            InputStream is = new FileInputStream(srcPath);
            OutputStream os = new FileOutputStream(destPath);
            // 把低级的字节输入输出流转换成高级的缓冲输入输出流
            InputStream bis = new BufferedInputStream(is);
            OutputStream bos = new BufferedOutputStream(os);
    ) {
        // 2. 读取和写入
        byte[] buffer = new byte[1024];
        int len;
        while ((len = bis.read(buffer)) != -1) {
            bos.write(buffer, 0, len);
        }
    } catch (Exception e) {
        e.printStackTrace();
    }
}
```

**字符输入缓冲流**

```java
public static void main(String[] args) throws FileNotFoundException {
    // 目的：使用字符缓冲输入流读取文本文件内容
    try (
            // 创建一个字符输入流对象
            Reader in = new FileReader("day12/src/com/zheguo/Buffer/text.txt");
            // 创建一个字符缓冲输入流,把输入流对象作为构造参数
            BufferedReader bs = new BufferedReader(in);
    ) {
        String str;
        // readLine()方法读取一行，读取完毕返回null
        while ((str = bs.readLine()) != null) {
            System.out.println(str);
        }

    } catch (Exception e) {
        e.printStackTrace();
    }
}
```

**字符输出缓冲流**

```java
public static void main(String[] args) throws FileNotFoundException {
    // 目的：使用字符缓冲输出流写入文本文件内容
    try (
            Writer in = new FileWriter("day12/src/com/zheguo/Buffer/text.txt",true);
            // 创建一个字符缓冲输出流,把输入流对象作为构造参数
            BufferedWriter bs = new BufferedWriter(in);
    ) {
        bs.write("hello world");
        // 换行
        bs.newLine();
        bs.write("hello java");
    } catch (Exception e) {
        e.printStackTrace();
    }
}
```

**小案例-使用缓冲流把指定文件按照序号顺序排序，并复制到新的文件中**

```java
public static void main(String[] args) {
    List<String> list = new ArrayList<>();
    // 使用缓冲流把指定文件按照序号顺序排序，并复制到新的文件中
    try (
            Reader in = new FileReader("day12/src/com/zheguo/Buffer/src.txt");
            BufferedReader bs = new BufferedReader(in);
            Writer out = new FileWriter("day12/src/com/zheguo/Buffer/target.txt",true);
            BufferedWriter bw = new BufferedWriter(out);
    ) {

        // 1.按行读取文件，把每行字符串存储到ArrayList中
        String line;
        while ((line = bs.readLine()) != null) {
            list.add(line);
        }
        // 2.对ArrayList进行排序
        Collections.sort(list);
        // 3.循环遍历把排序后的数据写入到新的文件中
        for (String s : list) {
            bw.write(s);
            bw.newLine();
        }
        System.out.println("排序成功");
    } catch (Exception e) {
        e.printStackTrace();
    }

}
```

## 其它流

### 字符输入转换流

```java
public static void main(String[] args) throws FileNotFoundException {
    // 目的：使用字符输入转换流读取GBK格式文件内容并解决乱码问题
    try (
            // 创建一个字符输入流对象
            InputStream in = new FileInputStream("day12/src/com/zheguo/Buffer/text.txt");
            // 创建一个字符输入转换流,把字符输入流对象作为构造参数
            Reader is = new InputStreamReader(in, "GBK");
            // 创建一个字符缓冲输入流,把输入流对象作为构造参数
            BufferedReader bs = new BufferedReader(is);
    ) {
        String str;
        // readLine()方法读取一行，读取完毕返回null
        while ((str = bs.readLine()) != null) {
            System.out.println(str);
        }

    } catch (Exception e) {
        e.printStackTrace();
    }
}
```

### 打印流

```java
public static void main(String[] args) {
    // 目的：使用打印流把数据写入到文本文件
    // 打印流：写什么就是什么
    try (
            PrintStream ps = new PrintStream("day12/src/com/zheguo/other/test.txt");
    ) {
        ps.println("hello world");
        ps.println(123);
        ps.println(true);
        ps.println(12.34);
        ps.println('a');

    } catch (Exception e) {
        e.printStackTrace();
    }
}
```

### 数据输出流

```java
public static void main(String[] args) {
    try (
            // 创建输出流
            DataOutputStream dos = new DataOutputStream(new FileOutputStream("day12/src/com/zheguo/other/test.txt"));
            // 创建输入流
            DataInputStream dis = new DataInputStream(new FileInputStream("day12/src/com/zheguo/other/test.txt"));
    ) {
        dos.writeInt(100);
        dos.writeBoolean(true);
        System.out.println("写入成功");
        System.out.println(dis.readInt());
        System.out.println(dis.readBoolean());
    } catch (Exception e) {
        e.printStackTrace();
    }
}
```

## IO框架

框架（Framework)是一个预先写好的代码库或一组工具，旨在简化和加速开发过程。

**导入commons-io-2.18.0.jar框架到项目中**

1. 在项目中创建一个文件夹：lib。
2. 将commons-io-2.18.jar文件复制到lib文件夹。
3. 在jar文件上面点击右键，选择 添加到库 。
4. 在类里面导包使用。

```java
// FileUtils类提供的方法：
FileUtils.copyFile(); // 复制文件
FileUtils.copyDirectory(); // 复制文件夹
FileUtils.deleteDirectory(); // 删除文件夹
FileUtils.readFileToString(); // 读取文件
FileUtils.writeStringToFile(); // 写入文件
FileUtils.moveFile(); // 移动文件
FileUtils.moveDirectory(); // 移动文件夹

// IOUtils类提供的部分方法：
IOUtils.closeQuietly(); // 关闭流
IOUtils.copy(); // 复制流
IOUtils.write(); // 写入流
```

# 多线程

1. 什么是线程？

​       线程是一条程序内部的一条执行流程。

2. 什么是多线程？

​       多线程是从软硬件上实现的执行多条流程的技术。（多条线程由CPU负责调度）

### 创建多线程的方法：

一、继承Thread类：

- 定义一个子类MyThread继承线程类Java.lang.Thread，重写run方法。

- 创建Mythread类的对象。

- 调用线程对象的start()方法启动线程（启动后还是执行run方法）

  **优缺点：**

  - 优点：编码简单
  - 缺点：线程类已经继承Thread，无法继承其他类，不利于功能的扩展。

注意事项：

- 启动线程必须调用start方法，不能调用run方法，否则不会开启新线程。
- 不要把主线程放在启动子线程之前，否则永远是主线程先跑完。

```java
public class Demo {
    public static void main(String[] args) {
        // 目标：学习创建多线程的方法。
        Thread thread = new MyThread();
        thread.start();// 启动子线程

        // 执行主线程
        for (int i = 0; i < 10; i++) {
            System.out.println("主线程"+i);
        }
    }
}

// 方法一：封装一个子线程类继承Thread类
class MyThread extends Thread{
    // 新建子线程必须重写run方法
    @Override
    public void run() {
        for (int i = 0; i < 10; i++) {
            System.out.println("子线程"+i);
        }
    }
}
```

二、实现Runnable接口

```java
public class Demo2 {
    public static void main(String[] args) {
        // 创建线程任务对象
        Runnable target = new myRunnable();
        // 创建线程对象，构造方法中传递线程任务对象
        Thread t = new Thread(target);
        // 调用start方法开启线程任务
        t.start();

        for (int i = 0; i < 100; i++) {
            System.out.println("主线程" + ":" + i);
        }
    }
}

// 创建线程任务对象，重写run方法
class myRunnable implements Runnable {
    @Override
    public void run() {
        for (int i = 0; i < 100; i++) {
            System.out.println("子线程" + ":" + i);
        }
    }
}
```

三、利用Callable接口和FutureTask类

1. 创建任务对象。
   - 定义一个类实现Callable接口，重写call方法，封装要做的事情，和要返回的数据。
   - 把Callable类型的对象封装成FutureTask（线程任务对象）。
2. 把线程任务对象交给Thread对象。
3. 调用Thread对象的start方法启动线程。
4. 线程执行完毕后，通过FutureTask对象的get方法获取线程任务执行的结果。

```java
public class Demo3 {
    public static void main(String[] args) {
        // 使用Callable接口实现线程，FutureTask包装线程任务对象，FutureTask对象作为线程任务对象传递到Thread类中，启动线程
        FutureTask<String> task = new FutureTask<String>(new MyCallable(100));
        // 创建线程对象
        Thread t1 = new Thread(task);
        // 启动线程
        t1.start();

        // 获取线程任务的执行结果
        try {
            // 当我们的主线程执行到这里发现支线程还没有执行完成时，会让出CPU，等待执行完毕再往下执行。
            String result = task.get();
            System.out.println(result);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

class MyCallable implements Callable<String> {
    private int n;

    public MyCallable(int n) {
        this.n = n;
    }

    @Override
    public String call() throws Exception {
        int sum = 0;
        for (int i = 0; i < n; i++) {
            sum += i;
        }
        return "sum=" + sum;
    }
}
```

**FutureTask的API**

| FutureTask提供的构造器              | 说明                               |
| ----------------------------------- | ---------------------------------- |
| public  FutureTask<>(Callable call) | 把Callable对象封装成FutureTask对象 |

| FutureTask提供的方法            | 说明                           |
| ------------------------------- | ------------------------------ |
| public V get() throws Exception | 获取线程执行call方法返回的结果 |

优点：线程任务类只是实现接口，可以继续继承类和实现接口，扩展性强；可以在线程执行完毕后去获取线程执行的结果。

缺点：编码复杂一点。

### Thread的常用方法

| Thread的常用方法                     | 说明                                          |
| ------------------------------------ | --------------------------------------------- |
| public void run()                    | 线程的任务方法                                |
| public void start()                  | 启动线程                                      |
| public String getName()              | 获取当前线程的名称，线程名称默认是Thread-索引 |
| public void setName(String name)     | 为线程设置名称                                |
| public static Thread currentThread() | 获取当前执行的线程对象                        |
| public static void sleep(long time)  | 让当前执行的线程休眠多少毫秒后再继续执行      |
| public final void join()             | 让调用当前这个方法的线程先执行完！(线程插队)  |

| Thread提供的常见构造器                     | 说明                                           |
| ------------------------------------------ | ---------------------------------------------- |
| public Thread(String name)                 | 可以为当前线程指定名称                         |
| public Thread(Runnable target)             | 封装Runnable对象成为线程对象                   |
| public Thread(Runnable target,String name) | 封装成Runnable对象成为线程对象，并指定线程名称 |

## 线程安全

```
什么是线程安全？ 线程安全指的是多线程操作共享数据时的线程安全。
```

线程安全问题发生的原因是什么？

- 多个线程，同时访问同一个共享资源，且存在修改该资源。

## 线程同步

线程同步是线程安全问题的解决方案。

**线程同步的核心思想**

- 让多个线程先后依次访问共享资源，这样就可以避免出现线程安全问题。

### 方法一：同步代码块

**作用**：把访问共享资源的**核心代码**给上锁，以此保证线程安全。

```
// 判断余额是否足够
synchronized (this) {
    if (this.money >= money) {
        // 吐出钱
        System.out.println(name + "取钱成功，吐出" + money + "元！");
        this.money -= money;
        System.out.println(name + "余额为：" + this.money);
    } else {
        // 余额不足
        System.out.println(name + "取钱失败，余额不足！");
    }
}
```

**原理**：每次只允许一个线程加锁后进入，执行完毕后自动解锁，其他线程才可以进来执行。

**同步锁的注意事项**

- 对于当前同时执行的线程来说，同步锁必须是同一把（同一个对象），否则会出bug。

锁对象的使用规范：

- 建议使用共享资源作为锁对象，对于实例方法建议使用this作为锁对象。
- 对于静态方法建议使用字节码（类名.class）对象作为锁对象。

### 方法二：同步方法

- 把访问共享资源的**核心方法**给上锁，以此保证线程安全。

```
修饰符 synchronized 返回值类型 方法名称(形参列表){

}
```

**原理**：每次只允许一个线程加锁后进入，执行完毕后自动解锁，其他线程才可以进来执行。

**同步方法底层原理：**

- 同步开发其实底层也是有隐式锁对象的，只是锁的范围是整个方法代码。
- 如果方法实例方法：同步方法默认用this作为锁的对象。
- 如果方法是静态方法：同步方法默认用类名.class作为锁的对象。

### 方法三：Lock锁

```java
public class Account {
    private String cardId;
    private double money;
    private final Lock look = new ReentrantLock();
    public void draw(double money) {
        // 获取当前线程名称
        String name = Thread.currentThread().getName();
        look.lock(); // 上锁
           try {
               // 判断余额是否足够
               if (this.money >= money) {
                   // 吐出钱
                   System.out.println(name + "取钱成功，吐出" + money + "元！");
                   this.money -= money;
                   System.out.println(name + "余额为：" + this.money);
               } else {
                   // 余额不足
                   System.out.println(name + "取钱失败，余额不足！");
               }
           }finally {
               look.unlock();// 解锁
           }
        }
}
```

- Lock锁是JDK5开始提供的一个新的锁定操作，通过它可以创建出锁对象进行加锁和解锁，更灵活，更方便，更强大。
- Lock是接口，不能直接实例化，可以采用它的实现类ReentrantLock来构建Lock锁对象。


| 构造器                 | 说明                   |
| ---------------------- | ---------------------- |
| public ReentrantLock() | 获得Lock锁的实现类对象 |

| 方法名称      | 说明   |
| ------------- | ------ |
| void lock()   | 获得锁 |
| void unlock() | 释放锁 |

## 线程池

**什么是线程池？**

线程池就是一个可以复用线程的技术。

**什么时候开始创建临时线程？**

新任务提交时发现核心线程都在忙，任务队列也满了，并且可以创建临时线程时，才会创建

**什么时候会拒绝新任务？**

核心线程和临时线程都在忙，任务队列也满了，新的任务过来时才会拒绝执行任务。

**任务拒绝策略**

| 策略                                     | 说明                                                         |
| ---------------------------------------- | ------------------------------------------------------------ |
| ThreadPoolExecutor.AbortPolicy()         | 丢弃任务并抛出RejectedExecutionException异常，这是默认的策略 |
| ThreadPoolExecutor.DiscardPolicy()       | 丢弃任务，但是不抛出异常，不推荐                             |
| ThreadPoolExecutor.DiscardOldestPolicy() | 抛弃队列中等待最久的任务，然后把当前任务加入队列中           |
| ThreadPoolExecutor.CallerRunsPolicy()    | 由主线程负责调用任务的run()方法从而绕过线程池直接执行        |

```java
package com.zheguo.Thread;

import java.util.concurrent.*;

public class Demo4 {
    public static void main(String[] args) {
        // 创建一个线程池
        // 1.使用线程池的实现类ThreadPoolExecutor声明七个参数来创建线程池对象
        ExecutorService service = new ThreadPoolExecutor(
                3,// 核心线程
                10, // 最大线程
                10, // 存活时间
                TimeUnit.SECONDS, // 时间单位
                new ArrayBlockingQueue<>(3), // 阻塞队列
                Executors.defaultThreadFactory(), // 线程工厂
                new ThreadPoolExecutor.AbortPolicy() // 拒绝策略
        );

        // 2.使用线程池来处理任务
//        Runnable target = new MyRunnable();
//        service.execute(target);
//        service.execute(target);
//        service.execute(target);
//        service.execute(target);
        // 结论：只创建了3个线程，当一个线程执行完成之后会在接着执行，而不是创建新的线程。


        // 创建Callable任务，并使用线程池处理
        Future<String> task = service.submit(new Callable<String>() {
            public String call() throws Exception {
                return "hello";
            }
        });
        // 获取线程任务的执行结果
        try {
            String result = task.get();
            System.out.println(result);
        } catch (Exception e) {
            e.printStackTrace();
        }
        service.shutdown();
    }
}

class MyRunnable implements Runnable {
    @Override
    public void run() {
        for (int i = 0; i < 4; i++) {
            System.out.println(Thread.currentThread().getName() + " " + i);
        }
    }
}
```

### 线程池工具类

| 方法名称                                                     | 说明                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| public static Executorervice newFixedThreadPool(int nThreads) | 创建固定线程数量的线程池，如果某个线程因为执行异常而结束那么线程池会补充一个新线程替代它。 |
| public static Executorervice newSingleThreadExecutor()       | 创建只有一个线程的线程池对象，如果该线程池出现异常而结束，那么线程池会补充一个新线程。 |
| public static Executorervice newCachedThreadPool(int nThreads) | 线程数量随着任务增加而增加，如果线程任务执行完毕空闲了60s则线程会被回收掉。 |
| public static ScheduledExecutorervice newScheduleThreadPool(int corePoolSize) | 创建一个线程池，可以在给定的延迟后运行任务，或者定期执行任务。 |

```java
public class Demo5 {
    public static void main(String[] args) {
        // 目的：使用Executors工具类创建线程池
        ExecutorService executorService = Executors.newFixedThreadPool(3);

        Future<String> f1 = executorService.submit(new MyCallables(10));
        Future<String> f2 = executorService.submit(new MyCallables(20));
        Future<String> f3 = executorService.submit(new MyCallables(30));
        Future<String> f4 = executorService.submit(new MyCallables(40));

        try {
            String result1 = f1.get();
            String result2 = f2.get();
            String result3 = f3.get();
            String result4 = f4.get();
            System.out.println(result1);
            System.out.println(result2);
            System.out.println(result3);
            System.out.println(result4);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

class MyCallables implements Callable<String> {
    private int n;

    public MyCallables(int n) {
        this.n = n;
    }

    @Override
    public String call() throws Exception {
        int print = 0;
        for (int i = 0; i < n; i++) {
            print += i;
        }
        return Thread.currentThread().getName() + " " + print;
    }

}
```

**Executors工具类底层基于什么方式实现的线程池对象？**

- 线程池ExecutorService的实现类：ThreadPoolExecutor

Executors是否适合做大型互联网场景的线程池方案？

- 不适合
- 建议使用ThreadPoolExecutor来指定线程池参数，这样可以明确线程池的运行桂策，规避资源耗尽的风险。

### 并发（Concurrency）

在Java中，并发是指多个线程或任务在同一时间段内交错执行的能力。这些线程可能不是真正的同时执行，而是通过操作系统或Java虚拟机（JVM）的调度，在一个时间点上只有一个线程在CPU上运行，但它们看起来是同时进行的。并发的主要目的是提高资源利用率和响应速度，特别是在处理I/O密集型任务时。

### 并行（Parallelism）

并行是指多个线程或任务在多个处理器核心上真正同时执行的能力。并行的目标是通过利用多核处理器来加速计算密集型任务。并行编程可以显著减少完成任务所需的时间，因为它允许将任务分解为多个子任务，并让这些子任务在不同的核心上同时执行。

## 抢红包案例

```java
package com.zheguo.Thread.readPacket;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class Demo {
    public static void main(String[] args) {
        // 案例：创建200个红包，其中【1-30】元占总个数的0.8，【31-70】元占总共个数的0.2，一共有100个人抢，要求打印出抢到的红包金额+姓名。

        // 第一步：创建一个List存储200个红包
        List<Integer> list = createRedPacket();

        // 第二步：创建100个线程，每个线程从list里面获取一个红包，然后打印出来。
        for (int i = 0; i < 100; i++) {
            new PeopleThread(list, "员工" + i).start();
        }
    }

    public static List<Integer> createRedPacket() {
        Random rand = new Random();
        List<Integer> list = new ArrayList<>();
        for (int i = 0; i < 160; i++) {
            list.add(rand.nextInt(30) + 1);
        }
        for (int i = 0; i < 40; i++) {
            list.add(rand.nextInt(40) + 31);
        }
        return list;
    }
}

class PeopleThread extends Thread {
    private List<Integer> list;

    public PeopleThread(List<Integer> list, String name) {
        super(name);
        this.list = list;
    }

    @Override
    public void run() {
        while (true) {
            synchronized (list) {
                if (list.size() == 0) {
                    System.out.println("红包被抢光了");
                    break;
                }
                // 随机获取一个红包
                int index = new Random().nextInt(list.size());
                Integer money = list.remove(index);
                System.out.println(getName() + "抢到了" + money + "元");
                if (list.size() == 0) {
                    System.out.println("你抢到了最后一个红包");
                    break;
                }
                // 休息一下
                try {
                    Thread.sleep(100);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }
    }
}
```

# java网络编程

## 基本的通信架构

​	CS架构（Client客户端、Server服务端），BS架构（Browser浏览器、Server服务端）

**ip命令**

​	`ipconfig`：拿到本机ip地址。

​	`ipconfig /all`：更详细的拿到本机IP地址和物理地址。

​	`ping [ip地址]`：判断本机与对方主机是否互通。

**端口的作用是什么？**

​	唯一标识正在计算机上运行的进程或者程序。

**一台设备，能否出现两个不同应用程序端口一致？？**

​	不能，会出现端口冲突错误。

## UDP通信

特点：无连接，不可靠通信。

不事先建立连接；发送端每次把要发送的数据限制在64kb以内，接收端IP等信息封装成一个数据包，发出去就不管了。

Java提供了一个`java.net.DatagramSocket`类来实现UDP通信。

