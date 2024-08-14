# Node.js Blog

English | [简体中文](./README.zh-CN.md)

## Introduction

This project is intended for learning how to build a blog backend service using native Node.js or with the help of frameworks like Express or Koa2, in combination with MySQL or MongoDB databases.

## Branches

Different branches correspond to different learning topics. The default port for the server is 8080.

For example:
POST `http://localhost:8080/api/user/login`
BODY `{ "username": "layouwen", "password": "layouwen" }`

### master

Implementation using native Node.js with MySQL query string concatenation.

- Configure the `mysql` and `redis` parameters in `src/conf/db.js`.
- Create the database and tables using `init.sql`.
- Install dependencies with `npm install`.
- Start the service with `npm run dev`.

### express

Implementation using Express with MySQL query string concatenation.

- Navigate to the `blog-express` directory.
- Configure the `mysql` and `redis` parameters in `conf/db.js`.
- Create the database and tables using `init.sql`.
- Install dependencies with `npm install`.
- Start the service with `npm run dev`.

### koa2

Implementation using Koa2 with MySQL query string concatenation.

- Navigate to the `blog-koa2` directory.
- Configure the `mysql` and `redis` parameters in `conf/db.js`.
- Create the database and tables using `init.sql`.
- Install dependencies with `npm install`.
- Start the service with `npm run dev`.

### mongoose

Implementation using Koa2 with MongoDB.

- Navigate to the `blog-mongoose` directory.
- Configure the `mongodb` parameters in `db/db.js`.
- After connecting to the database with `mongodb-compass`, create a document in the `user` collection: `{ "username": "layouwen", "password": "c6657f3bd287f6092c91a759ca3f5011" }`.
- Install dependencies with `npm install`.
- Start the service with `npm run dev`.