const router = require('koa-router')()

router.prefix('/api/user')

router.post('/login', async (ctx, next) => {
  const { username, password } = ctx.request.body
  ctx.body = {
    username,
    password,
    title: '我是list',
  }
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
