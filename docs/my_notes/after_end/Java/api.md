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

<Drawer src="https://cdn.jsdelivr.net/gh/ZHEGUO6/image/img/202411201904073.png"/>

