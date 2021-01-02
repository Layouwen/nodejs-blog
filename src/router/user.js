const { ErrorModel, SuccessModel } = require('../model/resModel')
const { login } = require('../controller/user')
const { set } = require('../db/redis')

const getCookieExpires = () => {
  const d = new Date()
  d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
  return d.toGMTString()
}

const handleUserRouter = (req, res) => {
  const method = req.method

  // 登录
  if (method === 'GET' && req.path === '/api/user/login') {
    // 解构 用户名 和 密码
    //    const { username, password } = req.body

    const { username, password } = req.query

    const result = login(username, password)
    return result.then(data => {
      if (data.username) {
        // 登录成功后设置 session
        req.session.username = data.username
        req.session.realname = data.realname
        // 保存 session 到 redis 中
        set(req.sessionId, req.session)
        console.log('session is:', { id: req.sessionId, session: req.session })

        return new SuccessModel()
      }
      return new ErrorModel('登录失败')
    })
  }

  // 登录测试
  if (method === 'GET' && req.path === '/api/user/login-test') {
    console.log(req.session)
    if (req.session.username) {
      return Promise.resolve(new SuccessModel({
        session: req.session
      }))
    }
    return Promise.resolve(new ErrorModel('尚未登录'))
  }
}

module.exports = handleUserRouter
