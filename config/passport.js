const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const User = require('../models/user')
const bcrypt = require('bcryptjs')

module.exports = app => {
  //init passport
  app.use(passport.initialize())
  app.use(passport.session())
}
passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallBack: true
  },
  (req,
    email,
    password,
    done
  ) => {
    Use.findOne({
        email
      })
      .then(user => {
        if (!user) {
          return done(null, false, req.flash('errors_msg', "This email haven't registered yet!"))
        }
        return bcrypt.compare(password, user.password)
          .then(isMatch => {
            if (!isMatch) {
              return done(null, false, req.flash('errors_msg', "Email or Password isn't correct"))
            }
            return done(null, user)
          })
      })
      .catch(error => done(error, false))
  }))
//Facebook
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_ID,
  clientSecret: process.env.FACEBOOK_SECRET,
  callbackURL: process.env.FACEBOOK_BACK,
  profileFiled: ['email', 'displayName']
}, (accessToken, refreshToken, profile, done) => {
  const {
    name,
    email
  } = profile._json
  User.findOne({
      email
    })
    .then(user => {
      if (user) return done(null, user)
      const randomPassword = Math.random().toString(36).slice(-8)
      bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(randomPassword, salt))
        .then(hash => User.create({
          name,
          email,
          password: hash
        }))
        .then(user => done(null, user))
        .catch(error => done(error, false))
    })
}))
passport.serializeUser((user, done) => {
  done(null, user.id)
})
passport.deserializeUser((id, done) => {
  User.findById(id)
    .lean()
    .then(user => done(null, user))
    .catch(error => done(error, null))
})