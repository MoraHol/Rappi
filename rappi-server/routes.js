'use strict'

const express = require('express')
const router = express.Router()
const passport = require('./passport-config')
const clientController = require('./controllers/clientController')
const deliveryPersonController = require('./controllers/deliveryPersonController')
const storesController = require('./controllers/storeController')

router.get('/login', (req, res) => {
  if (req.statusCode === 303) {
    res.render('pages/loginClient', { message: 'Por favor inicie sesion' })
  } else {
    res.type('html')
    res.render('pages/loginClient')
  }
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
  res.render('pages/index-page', { user: req.session.user })
})

// TEST
router.get('/stores', storesController.getOpenByDistance)
router.get('/stores/:id', storesController.getStore)
//

// Clients
router.get('/login/auth/google',
  passport.authenticate('googleClient', { scope: ['profile', 'email'] }),
  () => {
  }
)

router.get('/login/auth/google/callback',
  passport.authenticate('googleClient', { failureRedirect: '/login' }),
  clientController.loginRedirectGoogleStrategy
)

router.get('/login/auth/facebook',
  passport.authenticate('facebookClient', { scope: ['user_friends', 'manage_pages', 'email'] }),
  () => {
  }
)

router.get('/login/auth/facebook/callback',
  passport.authenticate('facebookClient', { failureRedirect: '/login' }),
  clientController.loginRedirectFacebookStrategy
)

router.post('/login/auth/google/post',
  clientController.setAddressGoogleStrategy
)

router.post('/login/auth/facebook/post',
  clientController.setAddressFacebookStrategy
)

// Delivery persons
router.get('/soyrappi/auth/google',
  passport.authenticate('googleSoyRappi', { scope: ['profile', 'email'] }),
  () => {
  }
)

router.get('/soyrappi/auth/google/callback',
  passport.authenticate('googleSoyRappi', { failureRedirect: '/soyrappi' }),
  deliveryPersonController.loginRedirectGoogleStrategy
)

router.get('/soyrappi/auth/facebook',
  passport.authenticate('facebookRT', { scope: ['user_friends', 'manage_pages', 'email'] }),
  () => {
  }
)

router.get('/soyrappi/auth/facebook/callback',
  passport.authenticate('facebookRT', { failureRedirect: '/soyrappi' }),
  deliveryPersonController.loginRedirectFacebookStrategy
)

router.post('/soyrappi/auth/google/post',
  deliveryPersonController.setAdditionalDataGoogleStrategy
)

router.post('/soyrappi/auth/facebook/post',
  deliveryPersonController.setAdditionalDataFacebookStrategy
)

// Admins
router.get('/admin', (req, res) => {
  res.render('pages/admin')
})

router.post('/admin/home',
  passport.authenticate('admin', { failureFlash: true }),
  (req, res) => {
    res.send('hola administrador ' + req.user.user_name)
  }
)
router.post('/api/createOrder', clientController.createOrder)

module.exports = router
