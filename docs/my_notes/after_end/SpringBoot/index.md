# Spring boot

## 什么是Spring boot?

SpringBoot是由Pivotal团队提供的全新框架，其设计目的是用来简化Spring应用的初始搭建以及开发过程。该框架使用了特定的方式来进行配置，从而使开发人员不再需要定义样板化的配置。SpringBoot提供了一种新的编程范式，可以更加快速便捷地开发Spring项目，在开发过程当中可以专注于应用程序本身的功能开发，而无需在Spring配置上花太大的工夫。

SpringBoot基于Sring4进行设计，继承了原有Spring框架的优秀基因。SpringBoot准确的说并不是一个框架，而是一些类库的集合。maven或者gradle项目导入相应依赖即可使用 SpringBoot，而无需自行管理这些类库的版本。

## Spring boot的特点?

- 自动配置：SpringBoot提供自动配置功能，根据项目的依赖和环境自动设置 Spring应用程序，减少了手动配置的复杂度。
- 启动器：SpringBoot提供“启动器”依赖集合，如 spring-boot-starter-web，简化了项目的依赖管理。
- 嵌入式服务器：SpringBoot支持嵌入式服务器，如Tomcat、Jetty和Undertow，使得应用程序可以独立运行，无需外部Web服务器。
- 生产级别的特性：SpringBoot具备生产级别的功能，包括健康检查、应用监控、日志管理等。Actuator 模块可以轻松监控和管理应用程序。
- 无配置的约定：SpringBoot遵循“无配置”的原则，使用合理的默认值和约定，减少需要编写的配置代码。
- 快速开发：SpringBoot的项目结构和默认配置帮助开发者快速启动新项目。内置工具和插件支持开发、测试和部署。

## 引入依赖

使用IDEA创建Spring boot项目，找到pom.xml文件，这就是项目引依赖的文件夹。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.4.3</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    <groupId>com.example</groupId>
    <artifactId>study</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>study</name>
    <description>study</description>
    <url/>
    <licenses>
        <license/>
    </licenses>
    <developers>
        <developer/>
    </developers>
    <scm>
        <connection/>
        <developerConnection/>
        <tag/>
        <url/>
    </scm>
    <properties>
        <java.version>21</java.version>
    </properties>
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>

        <dependency>
            <groupId>com.mysql</groupId>
            <artifactId>mysql-connector-j</artifactId>
            <scope>runtime</scope>
        </dependency>

        <!-- 处理office文件的依赖-->
        <dependency>
            <groupId>org.apache.poi</groupId>
            <artifactId>poi-ooxml</artifactId>
            <version>5.2.3</version>
        </dependency>

        <dependency>
            <groupId>org.mybatis.spring.boot</groupId>
            <artifactId>mybatis-spring-boot-starter</artifactId>
            <version>3.0.3</version>
        </dependency>


        <!-- 分页插件 pagehelper-->
        <dependency>
            <groupId>com.github.pagehelper</groupId>
            <artifactId>pagehelper-spring-boot-starter</artifactId>
            <version>1.4.6</version>
            <exclusions>
                <exclusion>
                    <groupId>org.mybatis</groupId>
                    <artifactId>mybatis</artifactId>
                </exclusion>
            </exclusions>
        </dependency>
		    <!-- java工具包-->
        <dependency>
            <groupId>cn.hutool</groupId>
            <artifactId>hutool-all</artifactId>
            <version>5.8.25</version>
        </dependency>

    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>

</project>
```

## controller层

controller层是存放接口的文件夹，这里保存了前端要请求的路径，定义了传参的类型。

```java
package com.example.study.controller;

import cn.hutool.core.util.StrUtil;
import cn.hutool.poi.excel.ExcelReader;
import cn.hutool.poi.excel.ExcelUtil;
import cn.hutool.poi.excel.ExcelWriter;
import com.example.study.common.Result;
import com.example.study.entity.Admin;
import com.example.study.mapper.AdminMapper;
import com.example.study.service.AdminService;
import com.github.pagehelper.PageInfo;
import jakarta.annotation.Resource;
import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {
    @Resource
    AdminService adminService;

    @Resource
    AdminMapper AdminMapper;

    @GetMapping("/all") // 完整的请求路径是：http://localhost:9090/admin/all
    public Result selectAll(Admin admin) {
        List<Admin> admins = adminService.selectAll(admin);
        return Result.success("查询成功", admins);
    }

    /**
     * @param admin
     * @return Result
     * @Description @RequestBody就是application/json格式的数据 什么都不加就是application/x-www-form-urlencoded格式的数据
     */
    @PostMapping("/insert")
    public Result insert(@RequestBody Admin admin) {
        // 如果密码为空，则返回错误信息
        if (StrUtil.isBlank(admin.getPassword())) {
            admin.setPassword("123456");
//            设置默认密码
//            return Result.error("500", "密码不能为空");
        }
        try {
            adminService.insert(admin);
            return Result.success("插入成功");
        } catch (Exception e) {
            return Result.error("500", "插入失败");
        }
    }

    // @PathVariable注解表示路径变量，如：/delete/1，1就是路径变量，@PathVariable("id") Integer id就是接收路径变量的值
    @DeleteMapping("/delete/{id}")
    public Result delete(@PathVariable("id") Integer id) {
        try {
            adminService.deleteById(id);
            return Result.success("删除成功");
        } catch (Exception e) {
            return Result.error("500", "删除失败");
        }
    }

    @PutMapping("/update")
    public Result updateById(@RequestBody() Admin admin) {
        try {
            adminService.updateById(admin);
            return Result.success("更新成功");
        } catch (Exception e) {
            return Result.error("500", "更新失败");
        }
    }

    @PostMapping("/selectById")
    public Result selectById(Integer id) {
        Admin admin = adminService.selectById(id);
        return Result.success("查询成功", admin);
    }

    // 分页查询
    @GetMapping("/selectByPage")
    public Result selectByPage(@RequestParam(defaultValue = "1") Integer pageNum,
                               @RequestParam(defaultValue = "10") Integer pageSize,
                               Admin admin) {  // 这样写可接收前端传来的参数，参数类型可以为Admin字段里的
        try {
            PageInfo<Admin> pageInfo = adminService.selectByPage(pageNum, pageSize, admin);
            return Result.success("查询成功", pageInfo);
        } catch (Exception e) {
            return Result.error("500", "查询失败");
        }
    }

    @GetMapping("/select")
    public Result select(@RequestParam Integer id) {
        List<Admin> admins = AdminMapper.select(id);
        return Result.success("查询成功", admins);
    }


    // 批量删除数据
    @PostMapping("/deleteBatch")
    public Result deleteBatch(@RequestBody List<Admin> list) {
        // 调用mapper层, 批量删除数据
        try {
            adminService.selectBatch(list);
            return Result.success("删除成功");
        } catch (Exception e) {
            return Result.error("500", "删除失败");
        }
    }

    /**
     * @param admin
     * @param response
     * @throws Exception
     * @Description 批量导出数据，按照传的字符串ids转化为数组遍历导出
     */
    @GetMapping("/export")
    public Result exportData(Admin admin, HttpServletResponse response) throws Exception {
        try {
            String ids = admin.getIds();
            if (StrUtil.isNotBlank(ids)) {
                String[] idArray = ids.split(",");
                admin.setIdsArray(idArray);
            }
            // 调用mapper层, 导出数据
            // 1.拿到所有数据
            List<Admin> admins = adminService.selectAll(admin);

            if (admins.isEmpty()) {
                response.getWriter().write("data is null");
                return Result.error("500", "导出失败");
            }
            // 2.构建Writer对象
            ExcelWriter writer = ExcelUtil.getWriter(true);

            // 3.设置中文表头
            writer.addHeaderAlias("username", "用户名");
            writer.addHeaderAlias("phone", "电话");
            writer.addHeaderAlias("email", "邮箱");
            writer.addHeaderAlias("gender", "性别");

            // 4.把数据写到Writer对象中
            writer.write(admins);
            // 5.设置文件的名称以及输出流的头信息
            response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8");
            String fileName = URLEncoder.encode("管理员信息", StandardCharsets.UTF_8);
            response.setHeader("Content-Disposition", "attachment;filename=" + fileName + ".xlsx");

            // 6.写出到输出流
            ServletOutputStream os = response.getOutputStream();
            writer.flush(os);
            writer.close();
            os.close();

            return Result.success("导出成功");
        } catch (Exception ex) {
            return Result.error("500", "导出失败");
        }
    }

    /**
     * @param file
     * @param response
     * @throws Exception
     * @Description 批量导入数据
     */
    @PostMapping("/import")
    public Result importData(MultipartFile file) throws Exception {
        // 1.拿到输入流对象，构建reader
        InputStream inputStream = file.getInputStream();
        ExcelReader reader = ExcelUtil.getReader(inputStream);

        // 2. 通过reader读取Excel数据
        reader.addHeaderAlias("用户名", "username");
        reader.addHeaderAlias("电话", "phone");
        reader.addHeaderAlias("邮箱", "email");
        reader.addHeaderAlias("性别", "gender");
        List<Admin> admins = reader.readAll(Admin.class);
        // 3. 把读取到的数据批量插入到数据库中
        for (Admin admin : admins) {
            adminService.insert(admin);
        }
        return Result.success("导入成功");
    }
}
```

## common层

这个软件包存放项目中常规的一些配置类。比如后端响应的response数据格式和同源跨域的配置类。

```java
package com.example.study.common;

import org.springframework.context.annotation.Bean;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

public class CorsConfig {

    // 配置跨域
    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource configSource = new UrlBasedCorsConfigurationSource();
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.addAllowedHeader("*"); // 允许任何请求头
        corsConfiguration.addAllowedMethod("*"); // 允许任何请求方法
        corsConfiguration.addAllowedOrigin("*"); // 允许任何域名
        configSource.registerCorsConfiguration("/**", corsConfiguration); // 允许所有请求路径都被拦截
        // 允许跨域请求的响应头
        return new CorsFilter(configSource);
    }

}
```

```java
package com.example.study.common;

public class Result {
    private String code; // 状态码
    private String message; // 提示信息
    private Object data; // 数据

// 传data数据
    public static Result success(Object data) {
        Result result = new Result();
        result.setCode("200");
        result.setMessage("操作成功");
        result.setData(data);
        return result;
    }
// 传message信息和data数据
    public static Result success(String message, Object data){
        Result result = new Result();
        result.setCode("200");
        result.setMessage(message);
        result.setData(data);
        return result;
    }

    // 传message信息和状态码
    public static Result error(String code, String message) {
        Result result = new Result();
        result.setCode(code);
        result.setMessage(message);
        result.setData(null);
        return result;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }
}
```

## service层

 service层主要是对mapper层进行调用，存放一些业务逻辑。

```java
package com.example.study.service;

import com.example.study.entity.Admin;
import com.example.study.exception.CustomerException;
import com.example.study.mapper.AdminMapper;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

import java.util.List;
     
@Service
public class AdminService {

    @Resource
    AdminMapper adminMapper;

    // 登录
    public String login(String username, String password) {
        if ("admin".equals(username) && "123456".equals(password)) {
            return "登录成功";
        }
        throw new CustomerException("用户名或者密码错误");
    }

    // 查询所有数据
    public List<Admin> selectAll(Admin admin) {
        // 调用mapper层, 查询所有数据
        return adminMapper.selectAll(admin);
    }

    // 插入一条数据
    public void insert(Admin admin) {
        // 调用mapper层, 插入一条数据
        adminMapper.insert(admin);
    }

    // 删除一条数据
    public void deleteById(Integer id) {
        // 调用mapper层, 删除一条数据
        adminMapper.deleteById(id);
    }

    // 更新一条数据
    public void updateById(Admin admin) {
        // 调用mapper层, 更新一条数据
        adminMapper.updateById(admin);
    }

    // 根据id查询一条数据
    public Admin selectById(Integer id) {
        // 调用mapper层, 查询一条数据
        return adminMapper.selectById(id);
    }

    public PageInfo<Admin> selectByPage(Integer pageNum, Integer pageSize, Admin admin) {
        // 开启分页查询
        PageHelper.startPage(pageNum, pageSize);
        List<Admin> admins = adminMapper.selectAll(admin);
        return PageInfo.of(admins);
    }

    // 这是一条测试注解式接口的测试代码
    public List<Admin> select(Integer id) {
        return adminMapper.select(id);
    }

    public void selectBatch(List<Admin> list) {
        for (Admin admin : list) {
            this.deleteById(admin.getId());
        }
    }
}
```

## entity层

主要存储和数据库字段，类型对应的表实体。

```java
package com.example.study.entity;

/**
 * &#064;author:  折果
 * &#064;date:  2025/3/10
 * &#064;description:管理员信息实体类
 */
public class Admin {
    private Integer id;
    private String username;
    private String password;
    private String phone;
    private String email;
    private String gender;
    private String ids;

    public String[] getIdsArray() {
        return idsArray;
    }

    public void setIdsArray(String[] idsArray) {
        this.idsArray = idsArray;
    }

    public String getIds() {
        return ids;
    }

    public void setIds(String ids) {
        this.ids = ids;
    }

    private String[] idsArray;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }
}
```

## exception层

exception软件包通常用于集中管理和处理应用程序中的异常。例如自定义异常和全局异常。

```java
package com.example.study.exception;

/**
 * @author: zheguo
 * @description: 自定义异常
 */
public class CustomerException extends RuntimeException{
    private String code;
    private String message;

    public CustomerException(String code, String message) {
        this.code = code;
        this.message = message;
    }

    public CustomerException(String message) {
        this.message = message;
        this.code = "500";
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    @Override
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
```

```java
package com.example.study.exception;

import com.example.study.common.Result;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.logging.Logger;

/*
* 全局的异常捕获器
* */
@ControllerAdvice("com.example.study.controller")
public class GlobalExceptionHandler {
   // 把异常打印到控制台上面
    private static final org.slf4j.Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);
    @ExceptionHandler(Exception.class)
    @ResponseBody // 将Result对象返回成json数据
    public Result error(Exception e) {
        log.error("------------------全局系统异常---------------",e.getMessage());
        return Result.error("500", e.getMessage());
    }

    @ExceptionHandler(CustomerException.class)
    @ResponseBody
    public Result error(CustomerException e) {
        log.error("------------------自定义异常---------------",e.getMessage());
        return Result.error(e.getCode(), e.getMessage());
    }
}
```

## mapper层

和resource软件包线面AdminMapper.xml文件里面的SQL语句一一映射。

```java
package com.example.study.mapper;

import com.example.study.entity.Admin;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface AdminMapper {
    List<Admin> selectAll(Admin admin);

    // 插入一条数据的方法
    void insert(Admin admin);

    // 删除一条数据的方法
    void deleteById(Integer id);

    // 更新一条数据的方法
    void updateById(Admin admin);

    // 根据id查询一条数据的方法
    Admin selectById(Integer id);

    @Select("select * from `admin` where id = #{id}")
    List<Admin> select(Integer id);
}
```

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "https://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.example.study.mapper.AdminMapper">
    <!-- 查询所有数据-->
    <select id="selectAll" resultType="com.example.study.entity.Admin">
        <!-- 在这里写SQL语句-->
        select * from `admin`
        <!-- 实现糊查询 -->
        <where>
            <if test="username != null and username != '' ">
                username like concat('%',#{username},'%')
            </if>
            <if test="phone != null and phone != ''">
                and phone like concat('%',#{phone},'%')
            </if>
            <if test="email != null and email != ''">
                and email like concat('%',#{email},'%')
            </if>
            <if test="gender != null and gender != ''">
                and gender like concat('%',#{gender},'%')
            </if>
            <if test="ids != null and ids != ''">
                and id in
                <foreach collection="idsArray" item="id" open="(" close=")" separator=",">
                    #{id}
                </foreach>
            </if>
        </where>
        order by id desc
    </select>

    <!--插入一条数据-->
    <insert id="insert" parameterType="com.example.study.entity.Admin">
        insert into `admin`(username,password,phone,email,gender) values
        (#{username},#{password},#{phone},#{email},#{gender})
    </insert>

    <!-- 根据id删除一条数据-->
    <delete id="deleteById" parameterType="int">
        delete from `admin` where id = #{id}
    </delete>

    <!--根据id更新一条数据-->
    <update id="updateById">
        update `admin` set username = #{username},password = #{password},phone = #{phone},email = #{email},gender =
        #{gender} where id= #{id}
    </update>

    <!--根据id查一条数据-->
    <select id="selectById" parameterType="int" resultType="com.example.study.entity.Admin">
        select * from `admin` where id = #{d}
    </select>

</mapper>
```

## excel表格数据导出和批量导出

```java
/**
 * @param admin
 * @param response
 * @throws Exception
 * @Description 批量导出数据，按照传的字符串ids转化为数组遍历导出
 */
@GetMapping("/export")
public Result exportData(Admin admin, HttpServletResponse response) throws Exception {
    try {
        String ids = admin.getIds();
        if (StrUtil.isNotBlank(ids)) {
            String[] idArray = ids.split(",");
            admin.setIdsArray(idArray);
        }
        // 调用mapper层, 导出数据
        // 1.拿到所有数据
        List<Admin> admins = adminService.selectAll(admin);

        if (admins.isEmpty()) {
            response.getWriter().write("data is null");
            return Result.error("500", "导出失败");
        }
        // 2.构建Writer对象
        ExcelWriter writer = ExcelUtil.getWriter(true);

        // 3.设置中文表头
        writer.addHeaderAlias("username", "用户名");
        writer.addHeaderAlias("phone", "电话");
        writer.addHeaderAlias("email", "邮箱");
        writer.addHeaderAlias("gender", "性别");

        // 4.把数据写到Writer对象中
        writer.write(admins);
        // 5.设置文件的名称以及输出流的头信息
        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8");
        String fileName = URLEncoder.encode("管理员信息", StandardCharsets.UTF_8);
        response.setHeader("Content-Disposition", "attachment;filename=" + fileName + ".xlsx");

        // 6.写出到输出流
        ServletOutputStream os = response.getOutputStream();
        writer.flush(os);
        writer.close();
        os.close();

        return Result.success("导出成功");
    } catch (Exception ex) {
        return Result.error("500", "导出失败");
    }
}
```

## excel表格数据导入和批量导入

```java
/**
 * @param file
 * @param response
 * @throws Exception
 * @Description 批量导入数据
 */
@PostMapping("/import")
public Result importData(MultipartFile file) throws Exception {
    // 1.拿到输入流对象，构建reader
    InputStream inputStream = file.getInputStream();
    ExcelReader reader = ExcelUtil.getReader(inputStream);

    // 2. 通过reader读取Excel数据
    reader.addHeaderAlias("用户名", "username");
    reader.addHeaderAlias("电话", "phone");
    reader.addHeaderAlias("邮箱", "email");
    reader.addHeaderAlias("性别", "gender");
    List<Admin> admins = reader.readAll(Admin.class);
    // 3. 把读取到的数据批量插入到数据库中
    for (Admin admin : admins) {
        adminService.insert(admin);
    }
    return Result.success("导入成功");
}
```

![](https://cdn.jsdelivr.net/gh/ZHEGUO6/image/img/202503131047751.png)

![](https://cdn.jsdelivr.net/gh/ZHEGUO6/image/img/202503131048137.png)