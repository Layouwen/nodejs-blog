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

  // 处理路径
  const url = req.url
  req.path = url.split('?')[0]

  // 格式化 get 参数
  req.query = queryString.parse(url.split('?')[0])

  getPostData(req).then(postData => {
    // 将 post 数据保存到 body 中
    req.body = postData

    const blogData = handleBlogRouter(req, res)
    if (blogData) {
      res.end(JSON.stringify(blogData))
      return
    }

    const userData = handleUserRouter(req, res)
    if (userData) {
      res.end(JSON.stringify(userData))
      return
    }
    res.writeHead(404, 'Content-type', 'text/plain')
    res.write('404 Not Found\n')
    res.end()
  })
}

module.exports = serverHandle
