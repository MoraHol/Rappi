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
router.get('/login/auth/google', passport.authenticate('google', {
  scope: ['profile']
}), () => {
  process.env.CB_AUTH_GOOGLE = '/login/auth/google/callback'
})
// calback con informacion de usuario en google
router.get('/login/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login'
  }), (req, res) => {
    res.render('pages/form-client', {
      user: req.user
    })
  })

router.get('/soyrappi/auth/google', passport.authenticate('google', {
  scope: ['profile']
}), () => {
  process.env.CB_AUTH_GOOGLE = '/soyrappi/auth/google/callback'
})

router.get('/soyrappi/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/soyrappi'
  }), (req, res) => {
    console.log(req)
    res.render('pages/form-rt', {
      user: req.user
    })
  })

module.exports = router
