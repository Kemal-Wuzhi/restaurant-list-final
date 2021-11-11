moudle.exports = {
  authenticator: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    req.flash('warning_msg', 'login please !')
    res.redirect('/users/login')
  }
}