# Node
- 本篇文章主要介绍如何使用express框架搭配`sequelize`ORM模型+mysql数据库搭建服务器以及创建接口。

## express

| 命令                         | 说明                       |
| ---------------------------- | -------------------------- |
| npm i -g express-generator@4 | 全局安装express脚手架      |
| express --no-view 项目名     | 创建项目（不创建视图目录） |

```js
// app.js
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// 静态目录 public
app.use(express.static(path.join(__dirname, 'public')));

// 路由路径
app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;

```

```js
// index.js 路由文件
const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

```



## 简单介绍 Mysql

```sql
// 插入数据
// 格式：insert into 表名(字段...) values(字段内容);
INSERT into articles(title,content,time)
VALUES('登高','风急天高猿啸哀，渚清沙白鸟飞回',NOW()),
('草','离离原上草，一岁一枯荣',NOW());

// 修改数据
// 格式：update 表名 set 要修改的字段名='修改后的数据' where 条件;
UPDATE articles SET content='君不见，长江之水天际来，奔流到海不复回' WHERE id=4;

// 删除数据
// 格式：delete from 表名 where 条件;
DELETE FROM articles WHERE id = 9;

// 查询数据
// 格式：select 列名（*） from 表名 where 条件 order by id desc(倒序) or asc(正序);
SELECT title,content,id from articles WHERE id=4;
```



## 使用sequelize ORM

1. 全局安装 **sequelize** `npm i -g sequelize-cli` 
2. 引入依赖 `npm i sequelize mysql2`
3. 创建配置目录和文件 `sequelize init`

```js
// 查询Articles表所有数据
Article.all()

// 查询Articles表id为index的数据,前提id字段为主键(primary key)
Article.findByPk(index)
```

**创建数据库表模型**

```js
// 第一步  
// 这表示创建一个1表名Article 字段title string类型 content text类型
命令: sequelize model:generate --name Article --attributes title:string,content:text

// 创建之后内容是这样的
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Article.init({
    title: DataTypes.STRING,
    content: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Article',
  });
  return Article;
};

// 第二步 执行命令在数据库里面创建表(迁移文件)
命令: sequelize db:migrate
// 这时候打开数据库会发现多了两个表，一个是你创建的Article表，一个是sequelizemeta表，这个表保存的是你迁移过的文件，下次执行sequelize db:migrate时，不会再次迁移已经迁移过的表了


// 第三步 添加种子文件
// 我们在开发过程当中需要大量的数据来进行测试，一条一条插入数据效率太低，这时候使用种子文件可以避免这个问题，
命令: sequelize seed:generate --name article
// 下面就是添加成功的种子文件
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // 插入一百条数据 类似于事务管理
  async up (queryInterface, Sequelize) {
    const articles = [];
    const counts = 100;

    for (let i = 1; i <= counts; i++) {
      const article = {
        title: `文章的标题 ${i}`,
        content: `文章的内容 ${i}`,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      articles.push(article);
    }

    await queryInterface.bulkInsert('Articles', articles, {});
  },
    
  async down (queryInterface, Sequelize) {
  await queryInterface.bulkDelete('Articles', null, {});
}
};

// 第四步 运行种子
// 开始运行种子，注意最后面这里，需要填写上你的种子文件的文件名。大家每个人都是不一样的，千万不要直接照抄。
命令: sequelize db:seed --seed xxx-article
```

**创建文章路由**

```js
// 在app.js 文件配置路由信息

// 后台路由文件
const articlesRouter = require('./routes/admin/article');
app.use('/admin', articlesRouter);
```

### **查询文章接口**

```js
// 在routes文件夹下面新建一个admin目录，添加article.js文件
const express = require('express');
const router = express.Router();
const {Article} = require('../../models');

/**
 * 获取文章列表
 * GET /admin/article
 *  api: 模型名.findAll
 */
router.get('/article', async function (req, res) {
    try {
        // findAll({order(排序):[['id','DESC(倒序)，ASC(正序)']]}) 查询所有数据 ，不光可以根据 id 排序，还可以根据其他字段排序，例如 createdAt
        const articleList = await Article.findAll({
            order: [['id', 'DESC']]
        });
        res.json({
            code: 200,
            detail: '文章查询接口',
            msg: 'success',
            data: articleList
        });
    } catch (error) {
        console.error('Error fetching articles:', error);
        res.status(500).json({
            code: 500,
            msg: '服务端发生错误，请管理员检查代码',
            error: error.message
        });
    }
});
```

### 新增文章接口

```js
/*
*  新增文章
*  POST /admin/article
* */

router.post('/', async function (req, res) {
    try {
        const {title, content} = req.body;
        const newArticle = await Article.create({
            title,
            content
        });
        res.json({
            code: 200,
            msg: 'success',
            detail: '新增文章接口',
            data: newArticle
        })
    } catch (error) {
        console.error('Error creating article:', error);
        res.status(500).json({
            code: 500,
            msg: '服务端发生错误，请管理员检查代码',
            error: error.message
        });
    }
})
```



### **查询文章详情**

```js
/*
*  通过id查询文章详情
*  GET /admin/article/:id
*  api: 模型名.findByPk
* */
router.get('/article/:id', async function (req, res) {
    try {
        const articleId = req.params.id;
        const article = await Article.findByPk(articleId);
        if (!article) {
            return res.status(404).json({
                code: 404,
                msg: '文章不存在'
            });
        }
        res.json({
            code: 200,
            detail: '文章详情接口',
            msg: 'success',
            data: article
        })
    }catch (error){
        console.error('Error fetching article:', error);
        res.status(500).json({
            code: 500,
            msg: '服务端发生错误，请管理员检查代码',
            error: error.message
        });
    }
})
```

### **删除文章接口**

```js
/*
*  删除文章
*  DELETE /admin/article/:id
*  api: 模型名.destroy
* */
router.delete('/:id', async function (req, res) {
    try {
        const articleId = req.params.id;
        const article = await Article.findByPk(articleId);
        if (!article) {
            return res.status(404).json({
                code: 404,
                msg: '文章不存在'
            });
        }
        await Article.destroy({
            where: {
                id: articleId
            }
        });
        res.json({
            code: 200,
            msg: 'success',
            detail: '删除文章接口',
        })
    } catch (error) {
        console.error('Error deleting article:', error);
        res.status(500).json({
            code: 500,
        })
    }
})
```

### **更新文章接口**

```js
/*
*  更新文章
*  PUT  /admin/article/:id
*  api: 模型名.update
* */

router.put('/', async function (req, res) {
    try {
        const {id, title, content} = req.body;
        const article = await Article.findByPk(id);
        if (!article) {
            return res.status(404).json({
                code: 404,
                msg: '文章不存在'
            });
        }
        const updatedArticle = await Article.update({
            title,
            content
        }, {
            where: {
                id
            }
        });
        res.json({
            code: 200,
            msg: 'success',
            detail: '更新文章接口',
            data:`已更新${updatedArticle}条数据`
        })
    } catch (error) {
        console.error('Error updating article:', error);
        res.status(500).json({
            code: 500,
            msg: '服务端发生错误，请管理员检查代码',
            error: error.message
        });
    }
})
```

### 模糊搜索

```js
/**
 * 获取文章列表
 * GET /admin/article
 * query参数: title(文章标题)
 */
router.get('/', async function (req, res) {
    try {
        // findAll({order(排序):[['id','DESC(倒序)，ASC(正序)']]}) 查询所有数据 ，不光可以根据 id 排序，还可以根据其他字段排序，例如 createdAt
        const condition = {
            order: [['id', 'DESC']]
        };
        const query = req.query;
        if (query.title) {
            condition.where = {
                title: {
                    [Op.like]: `%${query.title}%`
                }
            }
        }
        const articleList = await Article.findAll(condition);
        res.json({
            code: 200,
            msg: 'success',
            detail: '文章查询接口',
            data: articleList
        });
    } catch (error) {
        console.error('Error fetching articles:', error);
        res.status(500).json({
            code: 500,
            msg: '服务端发生错误，请管理员检查代码',
            error: error.message
        });
    }
});
```

### 分页查询

```js
/**
 * 分页获取文章列表
 * GET /admin/article
 * query参数: title(文章标题)，currentPage(当前页)，pageSize(每页查询数据量)
 */
router.get('/', async function (req, res) {
    try {
        // findAll({order(排序):[['id','DESC(倒序)，ASC(正序)']]}) 查询所有数据 ，不光可以根据 id 排序，还可以根据其他字段排序，例如 createdAt
        const query = req.query;
        // 当前是第几页，如果不传就是第一页
        const currentPage = Math.abs(Number(query.currentPage)) || 1;
        // 每页显示的条数，如果不传就是10
        const pageSize = Math.abs(Number(query.pageSize)) || 10;
        // 计算offset 表示要跳过多少条数据，从多少条数据开始
        const offset = (currentPage - 1) * pageSize;
        const condition = {
            limit: pageSize,
            offset: offset
        };
        if (query.title) {
            condition.where = {
                title: {
                    [Op.like]: `%${query.title}%`
                }
            }
        }
        // count 查询总数，rows查询到的数据
        const {count, rows} = await Article.findAndCountAll(condition)
        res.json({
            code: 200,
            msg: 'success',
            detail: '文章查询接口',
            data: {
                articles: rows,
                pagination: {
                    total: count,
                    currentPage,
                    pageSize
                }
            }
        });
    } catch (error) {
        console.error('Error fetching articles:', error);
        res.status(500).json({
            code: 500,
            msg: '服务端发生错误，请管理员检查代码',
            error: error.message
        });
    }
});
```



### 白名单过滤表单数据

> 在我们编程圈子里流传着一句话，永远不要相信用户提交的数据。

```js
/*
*  新增文章接口
*  POST /admin/article
* */

router.post('/', async function (req, res) {
    try {
        // 在这里如果直接Article.create(req.body),这样如果用户传来一个id，那么数据库里面对应的id也会变成对应的数据，这是我们不想看到的，所以我们需要把数据过滤一下，只传我们需要的值，比如title,content.新手尤其注意这一点。
        const {title, content} = req.body;
        const newArticle = await Article.create({
            title,
            content
        });
        res.json({
            code: 200,
            msg: 'success',
            detail: '新增文章接口',
            data: newArticle
        })
    } catch (error) {
        console.error('Error creating article:', error);
        res.status(500).json({
            code: 500,
            msg: '服务端发生错误，请管理员检查代码',
            error: error.message
        });
    }
})
```

### 封装公共方法

> 在我们写代码的时候，对于一些重复度高的代码。我们可以封装公用方法，在使用的时候直接调用就可以了，提升了代码可读性，减少了代码量。

```js
// 公用方法 根据id查找文章是否存在
async function checkArticleExist(id) {
    id = Number(id)
    const article = await Article.findByPk(id);
    if (!article) {
        throw new NotFoundError(`ID:id为${id}的文章不存在！！！`)
    }
    return article
}

// 调用
 const article = await checkArticleExist(id)
```

```js
/*
* 自定义 404 错误类
* */

class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NotFoundError';
    }
}

/*
* 自定义成功响应类
* */

function SuccessResponse(res, message, data = {}, code = 200) {
    res.status(code).json({
        status: true,
        message,
        data,
    })
}


/*
* 自定义错误响应类
* */

function ErrorResponse(res, error) {
    if (error.name === 'SequelizeValidationError') {
        return res.status(400).json({
            code: 400,
            msg: '参数错误',
            error: error.errors.map(err => err.message)
        });
    }

    if (error.name === 'NotFoundError') {
        return res.status(404).json({
            status: false,
            msg: '未找到相关资源',
            error: error.message
        });
    }
    res.status(500).json({
        status: false,
        msg: '服务端发生错误，请管理员检查代码',
        error: error.message
    });
}

module.exports = {
    NotFoundError,
    SuccessResponse,
    ErrorResponse
}

// 按需导入
const {
    NotFoundError,
    SuccessResponse,
    ErrorResponse
} = require('../../utils/response');
```

### 回滚迁移

> 在我们建表完成后如果想要修改字段，如果表内没有重要数据的话，可以直接用回滚迁移命令。直接删除表。

`sequelize db:migrate:undo`

### 增加字段

> `当我们在执行完sequelize db:migrate` 迁移命令的时候，如果发现少写一个字段，可以使用迁移创建命令,创建一个新的迁移文件。重新执行迁移命令`sequelize db:migrate`，数据表里面就会新增一个字段。

```js
// 具体流程 sequelize migration:create --name add-avatar-to-user，创建迁移文件
// 20240923092146-add-avatar-to-user.js

// 内容：'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('Users', 'avatar', {type: Sequelize.STRING})
    },

    async down(queryInterface, Sequelize) {
       await queryInterface.removeColumn('Users', 'avatar')
    }
};


// 执行迁移命令 sequelize db:migrate
// 字段新增完成 √
```

### 使用 `bcryptjs` 进行加密

> users数据表里面的password字段直接暴露给别人，很容易泄露用户的隐私信息，缺乏安全性。

```js
// 在模型目录的users.js文件里面 对password字段进行加密
password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: '密码不能为空'
                },
                notNull: {
                    msg: '密码不能为空'
                },
                set(value) {
                    if (value.length >= 6 && value.length <= 20) {
                        this.setDataValue('password', bcrypt.hashSync(value, 10))
                    } else {
                        throw new NotFoundError('密码长度为6-20位')
                    }
                }
            }
        },
```

### 课程关联模型

```js
static associate(models) {
            // 课程关联模型
            models.Courses.belongsTo(models.Users, {
                foreignKey: 'userId',
                as: 'user'
            });
            models.Courses.belongsTo(models.Categories, {
                foreignKey: 'categorieId',
                as: 'category'
            });
            models.Courses.hasMany(models.Chapters, {as: 'chapters', foreignKey: 'courseId'})
        }

// 课程路由里面
/**
 * 获取课程列表
 * GET /admin/courses
 * query参数: name(课程标题),categorieId(课程id),userId(用户id)，recommended，introductory
 */
router.get('/', async function (req, res) {
    try {
        const query = req.query;
        // 当前是第几页，如果不传就是第一页
        const currentPage = Math.abs(Number(query.currentPage)) || 1;
        // 每页显示的条数，如果不传就是10
        const pageSize = Math.abs(Number(query.pageSize)) || 10;
        // 计算offset 表示要跳过多少条数据，从多少条数据开始
        const offset = (currentPage - 1) * pageSize;
        const condition = {
             // 排除掉categorieId，userId两个字段，不显示
            attributes: {exclude: ['categorieId', 'userId']},
            // 课程关联模型
            include: [{
                model: Users,
                // 取别名
                as: 'user',
                attributes: ['id', 'username', 'avatar']
            },
                {
                    model: Categories,
                    as: 'category',
                    // 前端需要的字段数据
                    attributes: ['id', 'name']
                }
            ],
            limit: pageSize,
            offset: offset
        };
        if (query.categorieId) {
            condition.where = {
                categorieId: {
                    [Op.eq]: query.categorieId
                }
            }
        }
        if (query.userId) {
            condition.where = {
                userId: {
                    [Op.eq]: query.userId
                }
            }
        }
        if (query.name) {
            condition.where = {
                title: {
                    [Op.like]: `%${query.name}%`
                }
            }
        }
        if (query.recommended) {
            condition.where = {
                recommended: {
                    [Op.eq]: query.recommended === 'true'
                }
            }
        }
        if (query.introductory) {
            condition.where = {
                introductory: {
                    [Op.eq]: query.introductory === 'true'
                }
            }
        }
        // count 查询总数，rows查询到的数据
        const {count, rows} = await Courses.findAndCountAll(condition)
        SuccessResponse(res, '课程查找成功', {
            courses: rows,
            pagination: {
                total: count,
                currentPage,
                pageSize
            }
        })
    } catch (error) {
        console.error('Error fetching courses:', error);
        ErrorResponse(res, error)
    }
});
```

### 使用原生SQL语句进行查询

```js
**
 * 统计用户注册时间
 * GET /api/v1/admin/users/registered_time
 */
router.get('/users/registered_time', async (req, res) => {
    try {
        // 使用sequelize的query方法执行原生SQL查询
        const [result] = await sequelize.query(
            "SELECT DATE_FORMAT(`createdAt`,'%Y-%m') AS `month`,COUNT(*) AS `value` FROM `users` GROUP BY `month` ORDER BY `month` ASC;"
        );
        const data = {
            months: result.map(item => item.month),
            values: result.map(item => item.value)
        }
        SuccessResponse(res, '用户注册时间统计成功', data)
    } catch (error) {
        console.error('Error fetching registered time:', error);
        ErrorResponse(res, error)
    }
});
```

### JWT实现管理员登录

```js
const express = require('express');
const router = express.Router();
const {Users} = require('../../models');
const {Op} = require('sequelize');
const {
    SuccessResponse,
    ErrorResponse
} = require('../../utils/responses');
const {BadRequestError, NotFoundError, UnauthorizedError} = require("../../utils/errors");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

/**
 * 管理员登录接口
 * POST /admin/auth/login
 */
router.post('/login', async (req, res) => {
    try {
        const {login, password} = req.body;
        if (!login) {
            throw new BadRequestError('账号/邮箱不能为空');
        }
        if (!password) {
            throw new BadRequestError('密码不能为空');
        }
        const condition = {
            where: {
                // login可以使username也可以是email
                [Op.or]: [
                    {username: login},
                    {email: login}
                ]
            }
        };
        const user = await Users.findOne(condition);
        if (!user) {
            throw new NotFoundError('账号不存在,无法登录');
        }
        if (!bcrypt.compareSync(password, user.password)) {
            throw new UnauthorizedError('密码错误');
        }
        if (user.role !== 100) {
            throw new UnauthorizedError('您没有管理员权限');
        }
        // 生成token身份验证令牌
        // process.env.SECRET 使用dotenv配置密钥到环境变量中，密钥存储在.env文件中
        // 对于密钥可以使用node.js内置的crypto模块生成随机字符串，也可以使用第三方库如uuid生成随机字符串
        const token = jwt.sign({
            userId: user.id
        }, process.env.SECRET, {expiresIn: '30d'});

        SuccessResponse(res, '登录成功', {token})

    } catch (error) {
        console.error('Error logging in:', error);
        ErrorResponse(res, error)
    }
});

module.exports = router;
```

### 中间件及token认证

```js
const jwt = require('jsonwebtoken');
const {UnauthorizedError} = require('../utils/errors');
const {SuccessResponse, ErrorResponse} = require('../utils/responses');
const {Users} = require('../models');
module.exports = async (req, res, next) => {
    // 验证token的中间件，只有在请求头里面有token的时候才会能访问后面的接口
    try {
        const token = req.headers.token;
        if (!token) {
            throw new UnauthorizedError('token不存在,没有权限访问接口');
        }
        // 验证token  process.env.SECRET(.env文件里面的密钥)
        const decoded = jwt.verify(token, process.env.SECRET);

        const {userId} = decoded;
        const user = await Users.findByPk(userId);
        if (!user) {
            throw new UnauthorizedError('token无效,没有找到该用户');
        }
        if (user.role !== 100) {
            throw new UnauthorizedError('您没有管理员权限');
        }

        // 验证成功，将用户信息挂载到req上，以后需要获取用户信息时就可以直接通过req.user来获取了，不用再去数据库里面查询了
        req.user = user;
        // 进行下一步
        next();
    } catch (error) {
        ErrorResponse(res, error)
    }
};

// app.js

// 中间件
const adminAuth = require('./middleWares/admin-auth');
// 文章接口
app.use('/admin/article', adminAuth, articlesRouter);

```

### 多对多关联查询

```js
// models/courses.js
// 多对多关联
models.Courses.belongsToMany(models.Users,{through: models.likes, foreignKey: 'courseId', as: 'likeCourses'})

// models/users.js
// 一门课程可以被很多个用户点赞，一个用户可以点赞很多门课程，这种多对多的关系需在两个表中建立中间表（likes）
models.Users.belongsToMany(models.Courses,{through: models.likes, foreignKey: 'userId', as: 'likeCourses'})
```

```js
const express = require('express');
const router = express.Router();
const {Courses, likes, Users} = require('../../models');
const {Op} = require('sequelize');
const {
    SuccessResponse,
    ErrorResponse
} = require('../../utils/responses');

/**
 * 点赞接口
 * POST /web/likes
 */
router.post('/', async (req, res) => {
    try {
        const userId = req.userId;
        const {courseId} = req.body;
        const course = await Courses.findByPk(courseId)
        if (!course) {
            throw new Error('课程不存在,请选择其他课程')
        }

        // 检查课程是否已点赞
        const existingLike = await likes.findOne({
            where: {
                courseId,
                userId,
            }
        });
        if (!existingLike) {
            // 创建点赞记录
            await likes.create({courseId, userId,});
            // 给课程表的点赞数加一
            await course.increment('likesCount');
            SuccessResponse(res, '点赞成功')
        } else {
            // 如果点赞过了就删除点赞记录
            await existingLike.destroy();
            // 给课程表的点赞数减一
            await course.decrement('likesCount');
            SuccessResponse(res, '取消点赞成功')
        }

    } catch (error) {
        console.error('Error fetching likes:', error);
        ErrorResponse(res, error.message);
    }
});


/**
 * 查询用户点赞的课程列表
 * GET /web/likes
 */
router.get('/', async (req, res) => {
    try {
        const userId = req.userId;
        const query = req.query
        const currentPage = Math.abs(Number(query.currentPage)) || 1;
        const pageSize = Math.abs(Number(query.pageSize)) || 10;
        const offset = (currentPage - 1) * pageSize;

        // 查询当前用户
        const user = await Users.findByPk(userId)
        // 查询当前用户点赞的课程列表
        const courses = await user.getLikeCourses({
            // 关联表只查询点赞时间
            joinTableAttributes: ['createdAt'],
            attributes: {exclude: ['CategoriesId', 'UserId', 'content']},
            order: [['id', 'ASC']],
            limit: pageSize,
            offset: offset,
        })
        // 点赞的课程总数
        const totalCount = await user.countLikeCourses();
        SuccessResponse(res, '用户点赞的课程列表返回成功', {
            courses,
            pagination: {
                totalCount,
                currentPage,
                pageSize
            }
        })
    } catch (error) {
        console.error('Error fetching likes:', error);
        ErrorResponse(res, error)
    }
});
module.exports = router;
```



### CORS 同源跨域限制

> 所谓同源跨域是指，请求地址和你自身地址的（协议，域名，端口）只要有一个不同就会受到浏览器的请求限制。常见的解决办法是反向代理，cors，jsonp。

```js
// 先安装cors依赖 npm i cors
const cors = require('cors')

// 配置允许访问的跨域请求，可以多个域名
 const corsOptions = {
    origin: ['https://zheguo.com'],
}
 
// 配置cors 也可以允许任意域名访问
app.use(cors)
```

