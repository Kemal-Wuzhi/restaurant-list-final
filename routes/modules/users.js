const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')
const bcrypt = require('bcryptjs')

router.get('login', (req, res) => {
  res.render('login')
})

// use authentication to check the register status
router.posy('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login',
  failureFlash: true
}))

//register
router.post('/register', (req, res) => {
  const {
    name,
    email,
    password,
    confirmPassword
  } = req.body
  const errors = []

  if (!email || !password || !confirmPassword) {
    error.push({
      message: '請填寫必填欄位！'
    })
  }
  if (password !== confirmPassword) {
    errors.push({
      message: '密碼與確認密碼不符！'
    })
  }
  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }
  // check if it's registered
  User.findOne({
      email
    })
    .then(user => {
      if (user) {
        errors.push({
          message: '此 email 已註冊'
        })
        res.render('register', {
          errors,
          name,
          email,
          password,
          confirmPassword
        })
      }
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => User.create({
          neme,
          email,
          password: hash
        }))
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
    })
})
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已成功登出!')
  res.redirect('/users/login')
})
moudle.exports = router