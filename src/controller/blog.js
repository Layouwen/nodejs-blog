const xss = require('xss')
const { exec } = require('../db/mysql')

// 博客列表
const getList = (author, keyword) => {
  let sql = 'SELECT * FROM blogs WHERE 1=1 '
  if (author) {
    sql += `AND author='${author}' `
  }
  if (keyword) {
    sql += `AND title LIKE '%${keyword}%' `
  }
  sql += 'ORDER BY createtime DESC;'
  return exec(sql)
}

// 博客详情
const getDetail = id => {
  let sql = `SELECT * FROM blogs WHERE id='${id}';`
  return exec(sql).then(rows => {
    return rows
  })
}

// 新建博客
const newBlog = (blogData = {}) => {
  let { title, content, author } = blogData
  title = xss(title)
  const createtime = Date.now()

  let sql = `INSERT INTO blogs (title, content, createtime, author) values ('${title}', '${content}', '${createtime}', '${author}');`
  return exec(sql).then(insertData => {
    return {
      id: insertData.insertId
    }
  })
}

// 更新博客
const updateBlog = (id, blogData = {}) => {
  const { title, content } = blogData
  let sql = `UPDATE blogs SET title='${title}', content='${content}' WHERE id=${id}`

  return exec(sql).then(updateDate => {
    if (updateDate.affectedRows > 0) { return true }
    return false
  })
}

const delBlog = (id, author) => {
  const sql = `DELETE FROM blogs WHERE id='${id}' AND author='${author}'`

  return exec(sql).then(delData => {
    if (delData.affectedRows > 0) { return true }
    return false
  })
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}
