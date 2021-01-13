const router = require('koa-router')()

const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog')
const loginCheck = require('../middleware/loginCheck')
const { ErrorModel, SuccessModel } = require('../model/resModel')

router.prefix('/api/blog')

router.get('/list', async (ctx, next) => {
  let author = ctx.query.author || ''
  const keyword = ctx.query.keyword || ''

  if (ctx.query.isadmin) {
    // 管理员界面
    if (ctx.session.username === undefined) {
      console.error('这是管理员页面，你未登录')
      ctx.body = new ErrorModel('未登录')
      return
    }
    // 强制查询自己内容
    author = ctx.session.username
  }

  const listData = await getList(author, keyword)
  ctx.body = new SuccessModel(listData)
})

router.get('/detail', async (ctx, next) => {
  const data = await getDetail(ctx.query.id)
  ctx.body = new SuccessModel(data)
})

router.post('/new', async (ctx, next) => {
  const body = ctx.request.body
  body.author = ctx.session.username
  const data = await newBlog(body)
  ctx.body = new SuccessModel(data)
})

module.exports = router
