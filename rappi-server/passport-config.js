var passport = require('passport')
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (obj, done) {
  done(null, obj)
})

// Use the GoogleStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a token, tokenSecret, and Google profile), and
//   invoke a callback with a user object.
passport.use(new GoogleStrategy(
  {
    clientID: '211157800680-e3eaf3b2fjrq8iga50n240k980prniil.apps.googleusercontent.com',
    clientSecret: 'XGF0o_67kmQQlOIUdFQHCtL1',
    callbackURL: 'http://localhost/login/auth/google/callback'
  },
  (accessToken, refreshToken, profile, done) => {
    console.log(profile)
    return done(null, profile)
  }
))

module.exports = passport
