const { ErrorModel, SuccessModel } = require('../model/resModel')
const { loginCheck } = require('../controller/user')

const handleUserRouter = (req, res) => {
  const method = req.method

  // 解构 用户名 和 密码
  const { username, password } = req.body

  // 登录
  if (method === 'POST' && req.path === '/api/user/login') {
    const result = loginCheck(username, password)
    if (result === true) return new SuccessModel()
    return new ErrorModel('登录失败')
  }
}

module.exports = handleUserRouter
