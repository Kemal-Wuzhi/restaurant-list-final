const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const port = 3000
const restaurantList = require('./restaurant.json')

// template engine
app.engine("handlebars",
  exphbs({
    defaultLayoutL: "main"
  }))
app.set("view engine", "handlebars")
app.use(express.static("public"))

// routes
app.get('/', (req, res) => {
  res.render('index', {
    restaurants: restaurantList.results
  })
})

// search bar
app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim() //再研究query的用法
  const restaurantKeyword = restaurantList.results.filter((restaurant) =>
    restaurant.category.toLowerCase().includes(keyword.trim().toLowerCase()) ||
    restaurant.name.toLowerCase().includes(keyword.trim().toLowerCase()))
  res.render('index', {
    restaurants: restaurantKeyword,
    keyword
  })
})

// pagination
app.get('/restaurants/:id', (req, res) => {
  const restaurant = restaurantList.results.find((restaurant) => restaurant.id.toString() === req.params.id) //再研究params的用法
  res.render('show', {
    restaurant
  })
})

//listen the server
app.listen(port, () => {
  console.log(`This server is listening to http://localhost:${port}`)
})