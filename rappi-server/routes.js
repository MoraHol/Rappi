'use strict'

const express = require('express')
const router = express.Router()
const passport = require('./passport-config')
const clientController = require('./controllers/clientController')
const deliveryPersonController = require('./controllers/deliveryPersonController')
const storesController = require('./controllers/storeController')
const orderController = require('./controllers/orderController')
const adminController = require('./controllers/adminController')

// Cliente

router.get('/login', (req, res) => {
  if (req.statusCode === 303) {
    res.render('pages/loginClient', {
      message: 'Por favor inicie sesion'
    })
  } else {
    res.type('html')
    res.render('pages/loginClient')
  }
})

router.get('/formClient', (req, res) => {
  if (req.session.user) {
    res.type('html')
    res.render('pages/form-client', {
      user: req.session.user
    })
  } else {
    res.redirect('/login')
  }
})

router.post('/post', clientController.updateAddress)

router.get('/stores', storesController.getOpenByDistance)

router.get('/stores/:id', storesController.getStore)

router.delete('/', clientController.logout)

router.get('/', (req, res) => {
  res.render('pages/index-page', {
    user: req.session.user
  })
})

router.get('/myOrder', clientController.showOrder)

router.get('/login/auth/google',
  passport.authenticate('googleClient', {
    scope: ['profile', 'email']
  }),
  () => {}
)

router.get('/login/auth/google/callback',
  passport.authenticate('googleClient', {
    failureRedirect: '/login'
  }),
  clientController.loginRedirectGoogleStrategy
)

router.get('/login/auth/facebook',
  passport.authenticate('facebookClient', {
    scope: ['user_friends', 'manage_pages', 'email']
  }),
  () => {}
)

router.get('/login/auth/facebook/callback',
  passport.authenticate('facebookClient', {
    failureRedirect: '/login'
  }),
  clientController.loginRedirectFacebookStrategy
)

router.post('/login/auth/google/post',
  clientController.setAddressGoogleStrategy
)

router.post('/login/auth/facebook/post',
  clientController.setAddressFacebookStrategy
)

// Rappitendero
router.get('/soyrappi', deliveryPersonController.getIndexPage)

router.delete('/soyrappi', deliveryPersonController.logout)

router.get('/formRT', (req, res) => {
  res.type('html')
  res.render('pages/form-rt')
})

router.get('/soyrappi/auth/google',
  passport.authenticate('googleSoyRappi', {
    scope: ['profile', 'email']
  }),
  () => {}
)

router.get('/soyrappi/auth/google/callback',
  passport.authenticate('googleSoyRappi', {
    failureRedirect: '/soyrappi'
  }),
  deliveryPersonController.loginRedirectGoogleStrategy
)

router.get('/soyrappi/auth/facebook',
  passport.authenticate('facebookRT', {
    scope: ['user_friends', 'manage_pages', 'email']
  }),
  () => {}
)

router.get('/soyrappi/auth/facebook/callback',
  passport.authenticate('facebookRT', {
    failureRedirect: '/soyrappi'
  }),
  deliveryPersonController.loginRedirectFacebookStrategy
)

router.post('/soyrappi/auth/google/post',
  deliveryPersonController.setAdditionalDataGoogleStrategy
)

router.post('/soyrappi/auth/facebook/post',
  deliveryPersonController.setAdditionalDataFacebookStrategy
)

// API de ordenes

router.get('/api/order/:id', orderController.getOrderById)
router.put('/api/order/:id/nextstep', orderController.nextStep)
router.get('/api/order/unassigned/:lat/:lng', orderController.getOrderUnassigned)
router.post('/api/order/:id_order/assign/delivery-person/:id_delivery_person', orderController.assignOrder)
router.get('/api/order/active/user/:id', orderController.useractiveOrders)
router.post('/api/createOrder', orderController.createOrder)

// Admins
router.get('/admin', (req, res) => {
  res.render('pages/admin')
})

router.post('/admin/home',
  passport.authenticate('admin', {
    failureRedirect: '/'
  }),
  adminController.loginRedirectAdmin
)

router.get('/admin/deliveryPersons',
  adminController.getDeliveryPersons
)

router.post('/admin/deliveryPersons',
  deliveryPersonController.changeDeliveryPersonStatus
)

module.exports = router
