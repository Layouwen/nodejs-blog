const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const router = require('koa-router')()

router.prefix('/api/user')

router.post('/login', async (ctx, next) => {
  const { username, password } = ctx.request.body
  const data = await login(username, password)
  if (data.username) {
    ctx.session.username = data.username
    ctx.session.password = data.password
    ctx.body = new SuccessModel()
    return
  }
  ctx.body = new ErrorModel('登录失败')
})

router.get('/session-test', async (ctx, next) => {
  console.log(ctx.session.viewCount)
  if (!ctx.session.viewCount) {
    ctx.session.viewCount = 0
  }

  ctx.body = {
    errno: 0,
    viewCount: ++ctx.session.viewCount,
  }
})

module.exports = router
