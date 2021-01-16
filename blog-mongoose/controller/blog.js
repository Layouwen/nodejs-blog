const xss = require('xss')
const { exec } = require('../db/mysql')

// 博客列表
const getList = async (author, keyword) => {
  let sql = 'SELECT * FROM blogs WHERE 1=1 '
  if (author) {
    sql += `AND author='${author}' `
  }
  if (keyword) {
    sql += `AND title LIKE '%${keyword}%' `
  }
  sql += 'ORDER BY createtime DESC;'
  return await exec(sql)
}

// 博客详情
const getDetail = async id => {
  let sql = `SELECT * FROM blogs WHERE id='${id}';`
  const rows = await exec(sql)
  return rows[0]
}

// 新建博客
const newBlog = async (blogData = {}) => {
  let { title, content, author } = blogData
  title = xss(title)
  const createtime = Date.now()

  let sql = `INSERT INTO blogs (title, content, createtime, author) values ('${title}', '${content}', '${createtime}', '${author}');`

  const insertData = exec(sql)
  return {
    id: insertData.insertId,
  }
}

// 更新博客
const updateBlog = async (id, blogData = {}) => {
  const { title, content } = blogData
  let sql = `UPDATE blogs SET title='${title}', content='${content}' WHERE id=${id}`

  const updateDate = exec(sql)
  if (updateDate.affectedRows > 0) {
    return true
  }
  return false
}

const delBlog = async (id, author) => {
  const sql = `DELETE FROM blogs WHERE id='${id}' AND author='${author}'`

  const delData = exec(sql)

  if (delData.affectedRows > 0) {
    return true
  }
  return false
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog,
}
