var passport = require('passport')
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (obj, done) {
  done(null, obj)
})

// configuracion de modulo passport para el logeo con google
passport.use('client', new GoogleStrategy(
  {
    // la configuracion es de prueba
    clientID: '211157800680-e3eaf3b2fjrq8iga50n240k980prniil.apps.googleusercontent.com',
    clientSecret: 'XGF0o_67kmQQlOIUdFQHCtL1',
    callbackURL: '/login/auth/google/callback'
  },
  (accessToken, refreshToken, profile, done) => {
    // aqui se define el guardado o busqueda en la base de datos de este usuario
    // por ahora solo mostrara información
    console.log(profile)
    return done(null, profile)
  }
))
passport.use('soyrappi',new GoogleStrategy(
  {
    // la configuracion es de prueba
    clientID: '211157800680-e3eaf3b2fjrq8iga50n240k980prniil.apps.googleusercontent.com',
    clientSecret: 'XGF0o_67kmQQlOIUdFQHCtL1',
    callbackURL: '/soyrappi/auth/google/callback'
  },
  (accessToken, refreshToken, profile, done) => {
    // aqui se define el guardado o busqueda en la base de datos de este usuario
    // por ahora solo mostrara información
    // console.log(profile)
    return done(null, profile)
  }
))

module.exports = passport
