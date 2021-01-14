const { exec, escape } = require('../db/mysql')
const { genPassword } = require('../utils/cryp')

const login = async (username, password) => {
  // 防止 sql 注入
  username = escape(username)

  // 生成加密密码
  password = genPassword(password)
  password = escape(password)

  const sql = `SELECT username, realname FROM users WHERE username=${username} AND password=${password}`

  const rows = await exec(sql)
  return rows[0] || {}
}

module.exports = { login }