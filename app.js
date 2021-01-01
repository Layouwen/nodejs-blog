const queryString = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

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
  console.log(req.cookie)

  getPostData(req).then(postData => {
    // 将 post 数据保存到 body 中
    req.body = postData

    const blogResult = handleBlogRouter(req, res)
    if (blogResult) {
      blogResult.then(blogData => {
        res.end(JSON.stringify(blogData))
      })
      return
    }

    const userResult = handleUserRouter(req, res)
    if (userResult) {
      userResult.then(userData => {
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
