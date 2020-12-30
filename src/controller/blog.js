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
  const { title, content, author } = blogData
  const createtime = Date.now()
  console.log(title, content)
  let sql = `INSERT INTO blogs (title, content, createtime, author) values ('${title}', '${content}', '${createtime}', '${author}');`
  return exec(sql).then(insertData => {
    return {
      id: insertData.insertId
    }
  })
}

const updateBlog = (id, blogData = {}) => {
  return true
}

const delBlog = id => {
  return true
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}
