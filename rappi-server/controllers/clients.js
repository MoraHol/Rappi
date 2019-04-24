'use strict'
const db = require('../db')
const storesController = require('./stores')

exports.authenticateByGoogleStrategy = (req, accessToken, refreshToken, profile, done) => {
  db.client.findByIdGoogleStrategy(profile).then((id) => {
    if (id) {
      req.session.newuser = false
      return done(null, profile)
    } else {
      db.client.createUsingGoogleStrategy(profile)
        .then(function (id) {
          req.session.newuser = true
          return done(null, profile)
        })
    }
  })
}

exports.authenticateByFacebookStrategy = (req, accessToken, refreshToken, profile, done) => {
  db.client.findByIdFacebookStrategy(profile).then((id) => {
    if (id) {
      req.session.newuser = false
      return done(null, profile)
    } else {
      db.client.createUsingFacebookStrategy(profile)
        .then(function (id) {
          req.session.newuser = true
          return done(null, profile)
        })
    }
  })
}

exports.loginRedirectGoogleStrategy = async (req, res) => {
  if (req.session.newuser) {
    res.render('pages/form-client', { user: req.user })
  } else {
    await db.client.findByIdGoogleStrategy(req.user).then((row) => {
      req.session.user = row
    })
    res.redirect('/')
  }
}

exports.loginRedirectFacebookStrategy = async (req, res) => {
  if (req.session.newuser) {
    res.render('pages/form-client', { user: req.user })
  } else {
    await db.client.findByIdFacebookStrategy(req.user).then((row) => {
      req.session.user = row
    })
    res.redirect('/')
  }
}

exports.setAddressGoogleStrategy = async (req, res) => {
  req.user.address = req.body.address
  req.user.address_details = req.body.address_details
  req.user.latitude = req.body.lat
  req.user.longitude = req.body.lng
  await db.client.registerAdressUsingGoogleStrategy(req.user).then()
  await db.client.findByIdGoogleStrategy(req.user).then((user) => {
    req.session.user = user
  })
  res.redirect('/')
}

exports.setAddressFacebookStrategy = async (req, res) => {
  req.user.address = req.body.address
  req.user.address_details = req.body.address_details
  req.user.latitude = req.body.lat
  req.user.longitude = req.body.lng
  await db.client.registerAdressUsingFacebookStrategy(req.user).then()
  await db.client.findByIdFacebookStrategy(req.user).then((user) => {
    req.session.user = user
  })
  res.redirect('/')
}

exports.createOrder = async (req, res) => {
  const today = new Date()
  if (!storesController.isOpen(req.params.cart.store, today)) {
    // La tienda esta cerrada
  }

  var productsInStore = await db.stores.getProductsFromOne(req.params.cart.store)
  req.params.cart.products.forEach(productInCart => {
    var actualProductInStore = productsInStore.find(productInStock =>
      productInStock.products_in_stores_id === productInCart.products_in_stores_id)
    if (actualProductInStore.quantity < productInCart.quantity) {
      // no hay la cantidad de producto solicitada
    }
  })

  db.client.createOrder(req.params.user, req.params.cart).then(
    storesController.updateProductQuantities(req.params.cart.products)
  )
}
