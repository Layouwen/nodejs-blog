const mongoose = require('mongoose')

const url = 'mongodb://username:password@localhost:27017'
const dbName = 'nodejs-blog?authSource=admin'

mongoose.set('useFindAndModify', false)

mongoose.connect(`${url}/${dbName}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection

db.on('error', err => {
  console.error(err)
})

// db.once('open', ()=>{
//   console.log('成功')
// })

module.exports = mongoose
