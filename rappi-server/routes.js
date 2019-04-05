'use strcit'

const express = require('express')
const router = express.Router()
const passport = require('./passport-config')

// definicion de rutas (por ahora de pruba)
// los archivos html pueden ser modificados para un motor de plantillas

router.get('/login', (req, res) => {
  res.type('html')
  res.render('pages/loginClient')
})

router.get('/soyrappi', (req, res) => {
  res.type('html')
  res.render('pages/login-rt')
})
router.get('/formClient', (req, res) => {
  res.type('html')
  res.render('pages/form-client')
})
router.get('/formRT', (req, res) => {
  res.type('html')
  res.render('pages/form-rt')
})
router.get('/', (req, res) => {
  res.render('pages/index-page')
})
// autenticacion de boton
router.get('/login/auth/google', passport.authenticate('client', {
  scope: ['profile','email']
}), () => {
})
// calback con informacion de usuario en google
router.get('/login/auth/google/callback',  passport.authenticate('client', {
    failureRedirect: '/login'
  }), (req, res) => {
    if (req.session.newuser) {
      res.render('pages/form-client', {user: req.user})
    } else {
      res.render('pages/index-page', {user: req.user})
    }
  })

  router.get('/soyrappi/auth/google', passport.authenticate('soyrappi', {
    scope: ['profile']
  }), () => {})
  
  router.get('/soyrappi/auth/google/callback',
    passport.authenticate('soyrappi', {
      failureRedirect: '/soyrappi'
    }), (req, res) => {
      res.render('pages/form-rt', {
        user: req.user
      })
    })

module.exports = router
