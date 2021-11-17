const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

//create page
router.get('/new', (req, res) => {
  res.render('new')
})
//create function
router.post('/', (req, res) => {
  const restaurant = new Restaurant({
    name: req.body.name,
    name_en: req.body.name_en,
    category: req.body.category,
    image: req.body.image || 'https://cdn2.ettoday.net/images/1734/d1734833.jpg',
    location: req.body.location || null,
    google_map: req.body.google_map,
    rating: req.body.rating,
    phone: req.body.phone,
    description: req.body.description,
    userId: req.user._id
  })

  restaurant.save()
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//detail page
router.get('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({
      _id,
      userId
    })
    .lean()
    .then(restaurant => res.render('show', {
      restaurant
    }))
    .catch(error => console.log(error))
})

//edit page
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({
      _id,
      userId
    })
    .lean()
    .then(restaurant => res.render('edit', {
      restaurant
    }))
    .catch(error => console.log(error))
})
//edit function
router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const {
    name,
    name_en,
    category,
    image,
    location,
    phone,
    google_map,
    rating,
    description
  } = req.body

  return Restaurant.findOne({
      _id,
      userId
    })
    .then(restaurant => {
      restaurant.name = req.body.name
      restaurant.name_en = req.body.name_en
      restaurant.category = req.body.category
      restaurant.image = req.body.image
      restaurant.location = req.body.location
      restaurant.phone = req.body.phone
      restaurant.google_map = req.body.google_map
      restaurant.rating = req.body.rating
      restaurant.description = req.body.description
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(error => console.log(error))
})

// delete function
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({
      _id,
      userId
    })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router