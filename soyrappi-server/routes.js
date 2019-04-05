'use strcit'

const express = require('express')
const router = express.Router()
const passport = require('./passport-config')

// definicion de rutas (por ahora de pruba)
// los archivos html pueden ser modificados para un motor de plantillas

router.get('/soyrappi', (req, res) => {
  res.type('html')
  res.render('pages/login-rt')
})
router.get('/formRT', (req, res) => {
  res.type('html')
  res.render('pages/form-rt')
})
router.get('/', (req, res) => {
  res.render('pages/index-page')
})

router.get('/soyrappi/auth/google', passport.authenticate('google', {
  scope: ['profile']
}), () => {})

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
