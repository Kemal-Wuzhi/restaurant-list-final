const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const PORT = process.env.PORT
// const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const routes = require('./routes')
require('./config/mongoose')

const userPassport = require('./config/passport')


// template engine
app.engine('handlebars', exphbs({
  defaultLayout: 'main',
}))
app.set('view engine', 'handlebars')

// body parser
// app.use(bodyParser.urlencoded({
//   extended: true
// }))

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

// static files
app.use(express.static('public'))
app.use(express.urlencoded({
  extended: true
}))

// methodOverride
app.use(methodOverride('_method'))

usePassport(app)
app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  res.locals.errors_msg = req.flash('errors_msg')
})

// routes
app.use(routes)

// start the server
app.listen(PORT, () => {
  console.log(`express is listening on http://localhost:${PORT}`)
})