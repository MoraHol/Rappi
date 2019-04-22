var db = require('./db')
var passport = require('passport')
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
var FacebokStrategy = require('passport-facebook').Strategy
var LocalStrategy = require('passport-local').Strategy
var clientController = require('./controllers/clients')
var deliveryPersonController = require('./controllers/delivery_person')

passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (obj, done) {
  done(null, obj)
})

passport.use('googleClient',
  new GoogleStrategy(
    {
      clientID: '211157800680-e3eaf3b2fjrq8iga50n240k980prniil.apps.googleusercontent.com',
      clientSecret: 'XGF0o_67kmQQlOIUdFQHCtL1',
      callbackURL: '/login/auth/google/callback',
      passReqToCallback: true
    },
    clientController.authenticateByGoogleStrategy
  )
)

passport.use('facebookClient',
  new FacebokStrategy(
    {
      clientID: '763631774020039',
      clientSecret: '880d835b71c05dae172cde96ed7eeefb',
      callbackURL: '/login/auth/facebook/callback',
      enableProof: true,
      profileFields: ['id', 'displayName', 'photos', 'email', 'address', 'friends'],
      passReqToCallback: true
    },
    clientController.authenticateByFacebookStrategy
  )
)

passport.use('googleSoyRappi', 
  new GoogleStrategy(
    {
      clientID: '211157800680-e3eaf3b2fjrq8iga50n240k980prniil.apps.googleusercontent.com',
      clientSecret: 'XGF0o_67kmQQlOIUdFQHCtL1',
      callbackURL: '/soyrappi/auth/google/callback',
      passReqToCallback: true
    }, 
    deliveryPersonController.authenticateByGoogleStrategy
  )
)

passport.use('facebookRT', 
  new FacebokStrategy(
    {
      clientID: '763631774020039',
      clientSecret: '880d835b71c05dae172cde96ed7eeefb',
      callbackURL: '/soyrappi/auth/facebook/callback',
      enableProof: true,
      profileFields: ['id', 'displayName', 'photos', 'email', 'address', 'friends'],
      passReqToCallback: true
    }, 
    deliveryPersonController.authenticateByFacebookStrategy
  )
)

passport.use('admin', new LocalStrategy(async (username, password, done) => {
  await db.admin.findOne(username).then((admin) => {
    if (admin) {
      if (admin.password === password) {
        return done(null, admin)
      } else {
        return done(null, false)
      }
    } else {
      return done(null, false)
    }
  })
}))

module.exports = passport
