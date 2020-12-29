const serverHandle = (req, res) => {
  // 设置返回格式
  res.setHeader('Content-type', 'application/json')

  const resData = {
    name: '梁又文',
    site: '我是标题'
  }

  res.end(JSON.stringify(resData))
}

module.exports = serverHandle
