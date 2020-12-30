const { ErrorModel } = require('../model/resModel')
const { getDetail, getList, newBlog, updateBlog, delBlog } = require('../controller/blog')
const { SuccessModel } = require('../model/resModel')

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

  // 新建一篇博客
  if (method === 'POST' && req.path === '/api/blog/new') {
    const data = newBlog(req.body)
    return new SuccessModel(data)
  }

  // 更新一篇博客
  if (method === 'POST' && req.path === '/api/blog/update') {
    const result = updateBlog(id, req.body)
    if (result === true) return new SuccessModel()
    return new ErrorModel('更新博客失败')
  }

  // 删除一篇博客
  if (method === 'POST' && req.path === '/api/blog/del') {
    const result = delBlog(id)
    if (result === true) return new SuccessModel()
    return new ErrorModel()
  }
}

module.exports = handleBlogRouter
