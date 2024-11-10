# 简单介绍 Mysql

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