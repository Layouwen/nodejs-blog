const mongoose = require('mongoose')

const url = 'mongodb://localhost:27017'
const dbName = 'myblog'

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
