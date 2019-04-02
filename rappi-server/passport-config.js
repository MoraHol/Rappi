var passport = require('passport')
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (obj, done) {
  done(null, obj)
})

// configuracion de modulo passport para el logeo con google
passport.use(new GoogleStrategy(
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
passport.use(new GoogleStrategy(
  {
    // la configuracion es de prueba
    clientID: '211157800680-r36gikrh7m9ph8offk85i1f7dp23v9e1.apps.googleusercontent.com',
    clientSecret: 'GIDtHIprEl2i35oJSZV32S6g',
    callbackURL: '/soyrappi/auth/google/callback'
  },
  (accessToken, refreshToken, profile, done) => {
    // aqui se define el guardado o busqueda en la base de datos de este usuario 
    // por ahora solo mostrara información 
    console.log(profile)
    return done(null, profile)
  }
))

module.exports = passport
