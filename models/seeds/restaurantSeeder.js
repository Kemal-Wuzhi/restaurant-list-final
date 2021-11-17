const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const restaurantList = require('../../restaurant.json').results
const Restaurant = require('../restaurant')
const User = require('../user')
const db = require('../../config/mongoose')

const SEED_USER = [{
    email: 'user1@example.com',
    password: '12345678',
    restaurantList_index: [0, 1, 2]
  },
  {
    email: 'user2@example.com',
    password: '12345678',
    restaurantList_index: [3, 4, 5]
  }
]

db.once('open', () => {
  Promise.all(
      Array.from(SEED_USER, SEED_USER => {
        return bcrypt
          .genSalt(10)
          .then(salt => bcrypt.hash(SEED_USER.password, salt))
          .then(hash => User.create({
            name: SEED_USER.name,
            email: SEED_USER.email,
            password: hash
          }))
          .then(user => {
            const userId = user._id
            const restaurant = []
            Array.from(SEED_USER.restaurantList_index, index => {
              restaurantList[index].userId = userId
              restaurant.push(restaurantList[index])
            })
            return Restaurant.create(restaurant)
          })
      })
    )
    .then(() => {
      console.log('done.')
      process.exit()
    })
})