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

module.exports = router
