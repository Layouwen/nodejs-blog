const { genPassword } = require('../utils/cryp')
const User = require('../db/models/User')

const login = async (username, password) => {
  // 生成加密密码
  password = genPassword(password)
  const user = await User.findOne({ username, password })
  if (user === null) return
  return user
}

module.exports = { login }
