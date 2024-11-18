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

## 案例：健康计算器

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

