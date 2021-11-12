const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

// search
router.get('/', (req, res) => {
  const userId = req.user._id
  const keyword = req.query.keyword.trim().toLowerCase()
  const keywordRegex = new RegExp(keyword, 'i')
  Restaurant.find({
      userId,
      $or: [{
        category: {
          $regex: keywordRegex
        }
      }, {
        name: {
          $regex: keywordRegex
        }
      }]
    })
    .lean()
    .then(restaurants => {
      res.render('index', {
        restaurants,
        keyword
      })
    })
})

module.exports = router