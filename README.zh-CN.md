# Nodejs 博客

## 介绍

用于学习 原生node 实现 或借助 express / koa2 框架, 配合 mysql / mongodb 数据库搭建的博客后端服务.

## 分支

不同分支为不同的学习内容

### master

原生 node 配合 mysql 语句拼接实现

配置 `src/conf/db.js` 的 `mysql` 和 `redis` 参数
在 `init.sql` 中创建数据库和表
安装依赖 `npm install`
执行 `npm run dev` 启动服务

### express

express 配合 mysql 语句拼接实现

进入 `blog-express` 目录
配置 `conf/db.js` 的 `mysql` 和 `redis` 参数
在 `init.sql` 中创建数据库和表
安装依赖 `npm install`
执行 `npm run dev` 启动服务