const passport = require('passport')
const usernameAndPasswordStrategy = require('./strategies/usernameAndPassword')
const userData = require('../../../data/user')

passport.use('usernameAndPassword', usernameAndPasswordStrategy)

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  userData
    .get(Infinity, id)
    .then(user => done(null, user), error => done(error))
})

module.exports = passport
