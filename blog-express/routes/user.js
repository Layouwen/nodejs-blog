const express = require('express')
const { ErrorModel, SuccessModel } = require('../model/resModel')
const { login } = require('../controller/user')
const router = express.Router()

router.post('/login', function(req, res, next) {
  // 解构 用户名 和 密码
  const { username, password } = req.body

  const result = login(username, password)
  return result.then(data => {
    console.log(data)
    if (data.username) {
      // 登录成功后设置 session
      req.session.username = data.username
      req.session.realname = data.realname
      console.log('session is:', { id: req.sessionId, session: req.session })

      res.json(
        new SuccessModel()
      )
    }
    res.json(
      new ErrorModel('登录失败')
    )
  })
})

//router.get('/login-test', (req, res, next) => {
//  if (req.session.username) {
//    res.json({
//      msg: '已登录'
//    })
//  }
//  res.json({
//    msg: '未登录'
//  })
//})

//router.get('/session-test', (req, res, next) => {
//  const session = req.session
//  console.log(session)
//  if (session.viewNum == null) {
//    session.viewNum = 0
//  }
//  session.viewNum++
//  res.json({
//    viewNum: session.viewNum
//  })
//})

module.exports = router
