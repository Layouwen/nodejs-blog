# Nodejs 博客

[English](./README.md) | 简体中文

## 介绍

用于学习 原生node 实现 或借助 express / koa2 框架, 配合 mysql / mongodb 数据库搭建的博客后端服务.

## 分支

不同分支为不同的学习内容
端口默认都为 8080

例如:
POST `http://localhost:8080/api/user/login`
BODY `{ "username": "layouwen", "password": "layouwen" }`

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

### koa2

koa2 配合 mysql 语句拼接实现

进入 `blog-koa2` 目录
配置 `conf/db.js` 的 `mysql` 和 `redis` 参数
在 `init.sql` 中创建数据库和表
安装依赖 `npm install`
执行 `npm run dev` 启动服务

### mongoose

使用 koa2 配合 mongodb 实现

进入 `blog-mongoose` 目录
配置 `db/db.js` 的 `mongodb` 参数
使用 `mongodb-compass` 连接数据库后, 进入 user 集合创建 `{ "username": "layouwen", "password": "c6657f3bd287f6092c91a759ca3f5011" }`
安装依赖 `npm install`
执行 `npm run dev` 启动服务