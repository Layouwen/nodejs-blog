const { exec } = require('../db/mysql')

const login = (username, password) => {
  const sql = `SELECT username, realname FROM users WHERE username='${username}' AND password='${password}'`
  console.log(username, password)
  return exec(sql).then(rows => {
    return rows[0] || {}
  })
}

module.exports = { login }
