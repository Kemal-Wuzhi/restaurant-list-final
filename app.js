const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const port = 3000
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const routes = require('./routes')
require('./config/mongoose')

// template engine
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')

// body parser
app.use(bodyParser.urlencoded({
  extended: true
}))

// static files
app.use(express.static('public'))

// methodOverride
app.use(methodOverride('_method'))

// routes
app.use(routes)

// start the server
app.listen(port, () => {
  console.log(`Express on localhost:${port}`)
})