const router = require('koa-router')()

router.prefix('/api/blog')

router.get('/list', async (ctx, next) => {
  ctx.body = {
    title: '我是list',
  }
})

router.get('/detail', async (ctx, next) => {
  ctx.body = {
    title: '我是detail',
  }
})

module.exports = router
