const express = require('express')
const router = express.Router()

router.post('/login', function(req, res, next) {
  const { username, password } = req.body
  console.log(username, password, 'login interface')
  res.json({
    errno: 0,
    data: {
      username,
      password
    }
  })
})

module.exports = router
