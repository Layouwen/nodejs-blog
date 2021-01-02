// 环境变量
const env = process.env.NODE_ENV

// 配置
let MYSQL_CONF
if (env === 'dev') {
  // mysql
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'layouwen',
    port: '3306',
    database: 'myblog'
  }
  // redis
  REDIS_CONF = {
    port: 6389,
    host: '127.0.0.1'
  }
}
if (env === 'production') {
  // mysql
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'layouwen',
    port: '3306',
    database: 'myblog'
  }

  // redis
  REDIS_CONF = {
    port: 6389,
    host: '127.0.0.1'
  }
}
module.exports = {
  MYSQL_CONF
}
