const queryString = require('querystring')
const { get, set } = require('./src/db/redis')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

const serverHandle = (req, res) => {
  // 设置返回格式
  res.setHeader('Content-type', 'application/json')

  // 解析 path 处理路径
  const url = req.url
  req.path = url.split('?')[0]

  // 解析 query 格式化 get 参数
  req.query = queryString.parse(url.split('?')[1])

  // 解析 cookie
  req.cookie = {}
  const cookieStr = req.headers.cookie || ''
  // 遍历获取到的 cookie
  cookieStr.split(';').forEach(item => {
    if (!item) return
    const arr = item.trim().split('=')
    const key = arr[0]
    const val = arr[1]

    // 将 cookie 的 key 和 value 保存到 req.cookie 的对象中
    req.cookie[key] = val
  })

  // 使用 redis 解析 session
  let needSetCookie = false
  let userId = req.cookie.userid
  if (!userId) {
    needSetCookie = true
    userId = `${Date.now()}_${Math.random()}`
    // 初始化 redis 中的 session 值
    set(userId, {})
  }
  // 获取 session
  req.sessionId = userId
  console.log('req.sessionId', req.sessionId)
  get(req.sessionId).then(sessionData => {
    console.log('sessionData', sessionData)
    if (sessionData === null) {
      // 初始化 redis 中的 session 值
      set(req.sessionId, {})
      // 设置 session
      req.session = {}
    } else {
      // 设置 session
      req.session = sessionData
    }
    console.log('req.session', req.session)
    return getPostData(req)
  }).then(postData => {
    // 将 post 数据保存到 body 中
    req.body = postData

    const blogResult = handleBlogRouter(req, res)
    if (blogResult) {
      blogResult.then(blogData => {
        if (needSetCookie) {
          res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
        }
        res.end(JSON.stringify(blogData))
      })
      return
    }

    const userResult = handleUserRouter(req, res)
    if (userResult) {
      userResult.then(userData => {
        if (needSetCookie) {
          res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
        }
        res.end(JSON.stringify(userData))
      })
      return
    }
    res.writeHead(404, 'Content-type', 'text/plain')
    res.write('404 Not Found\n')
    res.end()
  })
}

module.exports = serverHandle

// 处理 post 请求
const getPostData = req => {
  return new Promise((resolve, reject) => {
    if (req.method !== 'POST') {
      resolve({})
      return
    }

    if (req.headers['content-type'] !== 'application/json') {
      resolve({})
      return
    }

    let postData = ''
    req.on('data', chuck => {
      postData += chuck
    })
    req.on('end', () => {
      if (!postData) {
        resolve({})
        return
      }
      resolve(JSON.parse(postData))
    })
  })
}

// 计算 cookie 过期时间
const getCookieExpires = () => {
  const d = new Date()
  d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
  return d.toGMTString()
}
