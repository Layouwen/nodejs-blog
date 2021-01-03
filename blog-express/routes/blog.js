const express = require('express')
const router = express.Router()

router.get('/list', function(req, res, next) {
  res.json({
    errno: 0,
    data: ['A8Ys2w6z', 'j69', '8DfBS', '4zNubg', '7aTdAwe']
  })
})

router.get('/detail', function(req, res, next) {
  res.json({
    errno: 0,
    data: [298, 672, 888, 590, 678]
  })
})

module.exports = router
