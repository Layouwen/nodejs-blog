const xss = require('xss')
const Blog = require('../db/models/Blog')

// 博客列表
const getList = async (author, keyword) => {
  const whereOpt = {}
  if (author) whereOpt.author = author
  if (keyword) whereOpt.keyword = new RegExp(keyword)
  const list = Blog.find(whereOpt).sort({ _id: -1 })
  if (list === null) return
  return list
}

// 博客详情
const getDetail = async id => {
  return Blog.find({ _id: id })
}

// 新建博客
const newBlog = async (blogData = {}) => {
  let { title, content, author } = blogData
  title = xss(title)
  content = xss(content)

  const blog = await Blog.create({ title, content, author })
  return {
    id: blog._id
  }
}

// 更新博客
const updateBlog = async (id, blogData = {}) => {
  let { title, content } = blogData
  title = xss(title)
  content = xss(content)

  const blog = await Blog.findOneAndUpdate(
    { _id: id, title, content },
    { new: true }
  )
  return blog !== null
}

const delBlog = async (id, author) => {
  const blog = await Blog.findOneAndDelete({ _id: id, author })
  console.log(blog)
  return blog !== null
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}
