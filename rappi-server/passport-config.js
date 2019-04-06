var db = require('./db')
var passport = require('passport')
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const FacebokStrategy = require('passport-facebook').Strategy
const LocalStrategy = require('passport-local').Strategy

passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (obj, done) {
  done(null, obj)
})

// configuracion de modulo passport para el logeo con google de cliente
passport.use('googleClient', new GoogleStrategy(
  {
    // la configuracion es de prueba
    clientID: '211157800680-e3eaf3b2fjrq8iga50n240k980prniil.apps.googleusercontent.com',
    clientSecret: 'XGF0o_67kmQQlOIUdFQHCtL1',
    callbackURL: '/login/auth/google/callback',
    passReqToCallback: true
  },
  (req, accessToken, refreshToken, profile, done) => {
    // aqui se define el guardado o busqueda en la base de datos de este usuario
    db.user.findUserByIdGoogleStrategy(profile).then((id) => {
      if (id) {
        req.session.newuser = false
        return done(null, profile)
      } else {
        db.user.createUserGoogleStrategy(profile)
          .then(function (id) {
            req.session.newuser = true
            return done(null, profile)
          })
      }
    })
  }
))
// configuracion de modulo passport para el logeo con google de RappiTendero
passport.use('googleSoyRappi', new GoogleStrategy(
  {
    // la configuracion es de prueba
    clientID: '211157800680-e3eaf3b2fjrq8iga50n240k980prniil.apps.googleusercontent.com',
    clientSecret: 'XGF0o_67kmQQlOIUdFQHCtL1',
    callbackURL: '/soyrappi/auth/google/callback',
    passReqToCallback: true
  },
  (req, accessToken, refreshToken, profile, done) => {
    // aqui se define el guardado o busqueda en la base de datos de este usuario
    db.rappiTendero.findRappiTenderoByIdGoogleStrategy(profile).then((id) => {
      if (id) {
        req.session.newuser = false
        return done(null, profile)
      } else {
        db.rappiTendero.createRappiTenderoGoogleStrategy(profile).then((id) => {
          req.session.newuser = true
          return done(null, profile)
        })
      }
    })
  }
))
// configuracion de modulo passport para el logeo con facebook de cliente
passport.use('facebookClient', new FacebokStrategy(
  {
    clientID: '763631774020039',
    clientSecret: '880d835b71c05dae172cde96ed7eeefb',
    callbackURL: '/login/auth/facebook/callback',
    enableProof: true,
    profileFields: ['id', 'displayName', 'photos', 'email', 'address', 'friends'],
    passReqToCallback: true
  },
  (req, accessToken, refreshToken, profile, done) => {
    // aqui se define el guardado o busqueda en la base de datos de este usuario
    db.user.findUserByIdFacebookStrategy(profile).then((id) => {
      if (id) {
        req.session.newuser = false
        return done(null, profile)
      } else {
        db.user.createUserFacebookStrategy(profile)
          .then(function (id) {
            req.session.newuser = true
            return done(null, profile)
          })
      }
    })
  }))
// configuracion de modulo passport para el logeo con facebook de Rappitendero
passport.use('facebookRT', new FacebokStrategy(
  {
    clientID: '763631774020039',
    clientSecret: '880d835b71c05dae172cde96ed7eeefb',
    callbackURL: '/soyrappi/auth/facebook/callback',
    enableProof: true,
    profileFields: ['id', 'displayName', 'photos', 'email', 'address', 'friends']
  },
  (accessToken, refreshToken, profile, done) => {
    // aqui se define el guardado o busqueda en la base de datos de este usuario
    // por ahora solo mostrara información
    console.log(profile)
    return done(null, profile)
  }))

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
