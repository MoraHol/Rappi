'use strcit'

const express = require('express')
const path = require('path')
const router = express.Router()
const passport = require('./passport-config')

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
router.get('/login/auth/google', passport.authenticate('google', {
  scope: ['profile']
}))
router.get('/login/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login'
  }), (req, res) => {
    res.json(req.user)
  })

module.exports = router
