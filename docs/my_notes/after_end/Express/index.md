# express

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