const { ErrorModel, SuccessModel } = require('../model/resModel')
const { loginCheck } = require('../controller/user')

const handleUserRouter = (req, res) => {
  const method = req.method

  // 登录
  if (method === 'POST' && req.path === '/api/user/login') {
    // 解构 用户名 和 密码
    const { username, password } = req.body

    const result = loginCheck(username, password)
    return result.then(data => {
      if (data.username) { return new SuccessModel() }
      return new ErrorModel('登录失败')
    })
  }
}

module.exports = handleUserRouter
