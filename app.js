const handleBlogRouter = require('./src/blog')
const handleUserRouter = require('./src/user')
const serverHandle = (req, res) => {
  // 设置返回格式
  res.setHeader('Content-type', 'application/json')

  // 处理路径
  const url = req.url
  req.path = url.split('?')[0]

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
}

module.exports = serverHandle