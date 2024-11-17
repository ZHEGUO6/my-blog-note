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

