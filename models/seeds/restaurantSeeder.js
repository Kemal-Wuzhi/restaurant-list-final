// mongoose
const mongoose = require('mongoose')
const Restaurant = require('../restaurant')
const data = require('../../restaurant.json')
const restaurantList = data.results

//avoid deprecation warning
mongoose.connect('mongodb://localhost/restaurant-list', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection
// failed
db.on('error', () => {
  console.log('mongodb error!')
})
// succeed
db.once('open', () => {
  console.log('mongodb connected')
  restaurantList.forEach((restaurant) => {
    Restaurant.create({
      name: restaurant.name,
      name_en: restaurant.name_en,
      category: restaurant.category,
      image: restaurant.image,
      location: restaurant.location,
      phone: restaurant.phone,
      google_map: restaurant.google_map,
      rating: restaurant.rating,
      description: restaurant.description
    })
  })
  console.log('restaurantSeeder done!')
})