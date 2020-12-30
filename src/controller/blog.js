const { exec } = require('../db/mysql')

const getList = (author, keyword) => {
  let sql = 'SELECT * FROM blogs WHERE 1=1 '
  if (author) {
    sql += `AND author=${author} `
  }
  if (keyword) {
    sql += `AND keyword=${keyword} `
  }
  sql += 'ORDER BY createtime DESC;'
  return exec(sql)
}

const getDetail = id => {
  return [
    {
      id: 1,
      title: '我是标题',
      content: '我是内容',
      createTime: 1609295081027,
      author: '梁又文'
    }
  ]
}

const newBlog = (blogData = {}) => {
  return { id: 1 }
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
