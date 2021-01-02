const redis = require('redis')
const { REDIS_CONF } = require('../conf/db')

// 创建客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)
redisClient.on('error', err => {
  console.error('err', err)
})

function set (key, val) {
  if (typeof val === 'object') {
    val = JSON.stringify(val)
  }
  redisClient.set(key, val, redis.print)
}

function get (key) {
  return new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      // 有报错返回
      if (err) {
        reject()
        return
      }
      // 传了空值返回
      if (val === null) {
        resolve(val)
        return
      }
      try {
        // 尝试转为对象
        resolve(JSON.parse(val))
      } catch (ex) {
        // 如果不能转对象直接返回
        resolve(val)
      }
    })
  })
}

module.exports = { set, get }
