const getList = (author, keyword) => {
  return [
    {
      id: 1,
      title: '你好我是标题1',
      content: '我是内容1',
      createTime: 1609294101945,
      author: '梁又文'
    },
    {
      id: 2,
      title: '我不是标题',
      content: '我不是内容',
      createTime: 1609294148020,
      author: '梁金俊'
    }
  ]
}

module.exports = {
  getList
}
