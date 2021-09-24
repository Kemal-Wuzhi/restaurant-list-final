const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/s2-3_restaurant', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection
//failed
db.on('error', () => {
  console.log('mongodb error!')
})
//succeed
db.once('open', () => {
  console.log('mongodb connected!')
})

module.exports = db