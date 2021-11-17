const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  const userId = req.user._id
  Restaurant.find(userId)
    .lean()
    .then(restaurants => res.render('index', {
      restaurants
    }))
    .catch(error => console.error(error))
})

//search function
router.get('/search', (req, res) => {

  const keyword = req.query.keyword
  return Restaurant.find()
    .lean()
    .then(restaurants => restaurants.filter(restaurants => {
      return restaurants.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()) || restaurants.category.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())
    }))

    .then((restaurants) => res.render('index', {
      restaurants,
      keyword
    }))
    .catch(error => console.log(error))

})

module.exports = router