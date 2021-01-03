const { exec, escape } = require('../db/mysql')

const login = (username, password) => {
  console.log('注入前', username, password)
  // 防止 sql 注入
  username = escape(username)
  password = escape(password)
  console.log('注入后', username, password)

  const sql = `SELECT username, realname FROM users WHERE username=${username} AND password=${password}`
  console.log(sql)
  return exec(sql).then(rows => {
    return rows[0] || {}
  })
}

module.exports = { login }
