const { ErrorModel } = require('../model/resModel')
const { getDetail, getList, newBlog, updateBlog, delBlog } = require('../controller/blog')
const { SuccessModel } = require('../model/resModel')

// 登录验证函数
const loginCheck = (req) => {
  if (!req.session.username) {
    return Promise.resolve(
      new ErrorModel('尚未登录')
    )
  }
  return Promise.resolve(
    new SuccessModel({ session: req.session })
  )
}

const handleBlogRouter = (req, res) => {
  // 判断请求类型
  const method = req.method

  // 获取 id
  const id = req.query.id || ''

  // 获取博客列表
  if (method === 'GET' && req.path === '/api/blog/list') {
    const author = req.query.author || ''
    const keyword = req.query.keyword || ''

    const result = getList(author, keyword)
    return result.then(listData => {
      return new SuccessModel(listData)
    })
  }

  // 获取博客详情
  if (method === 'GET' && req.path === '/api/blog/detail') {
    const result = getDetail(id)
    return result.then(data => {
      if (data.length < 1) return new SuccessModel('没有对应数据')
      return new SuccessModel(data)
    })
  }

  // 新建博客
  if (method === 'POST' && req.path === '/api/blog/new') {
    // 判断是否登录
    const loginCheckResult = loginCheck(req)
    if (loginCheckResult) return loginCheck

    req.body.author = req.session.username
    const result = newBlog(req.body)
    return result.then(data => {
      return new SuccessModel(data)
    })
  }

  // 更新一篇博客
  if (method === 'POST' && req.path === '/api/blog/update') {
    // 判断是否登录
    const loginCheckResult = loginCheck(req)
    if (loginCheckResult) return loginCheck

    const result = updateBlog(id, req.body)

    return result.then(val => {
      if (val) { return new SuccessModel() }
      return new ErrorModel('更新博客失败')
    })
  }

  // 删除一篇博客
  if (method === 'POST' && req.path === '/api/blog/del') {
    // 判断是否登录
    const loginCheckResult = loginCheck(req)
    if (loginCheckResult) return loginCheck

    const author = req.session.username
    const result = delBlog(id, author)

    return result.then(val => {
      if (val) { return new SuccessModel() }
      return new ErrorModel('删除博客失败')
    })
  }
}

module.exports = handleBlogRouter
