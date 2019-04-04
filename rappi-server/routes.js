'use strcit'

const express = require('express')
const path = require('path')
const router = express.Router()
const passport = require('./passport-config')

// definicion de rutas (por ahora de pruba)
// los archivos html pueden ser modificados para un motor de plantillas

router.get('/login', (req, res) => {
  res.type('html')
  res.sendFile(path.resolve(`${__dirname}/public/loginClient.html`))
})

router.get('/soyrappi', (req, res) => {
  res.type('html')
  res.sendFile(path.resolve(`${__dirname}/public/loginRT.html`))
})
router.get('/formClient', (req, res) => {
  res.type('html')
  res.sendFile(path.resolve(`${__dirname}/public/formClient.html`))
})
router.get('/formRT', (req, res) => {
  res.type('html')
  res.sendFile(path.resolve(`${__dirname}/public/formRT.html`))
})
router.get('/', (req, res) => {
  res.send('')
})
// autenticacion de boton
router.get('/login/auth/google', passport.authenticate('google', {
  scope: ['profile']
}))
// calback con informacion de usuario en google
router.get('/login/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login'
  }), (req, res) => {
    res.json(req.user)
  })

module.exports = router
