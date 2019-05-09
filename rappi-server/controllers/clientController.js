'use strict'
const db = require('../db')
const storesController = require('./storeController')

exports.authenticateByGoogleStrategy = (req, accessToken, refreshToken, profile, done) => {
  db.clientRepository.findByIdGoogleStrategy(profile).then((id) => {
    if (id) {
      req.session.newuser = false
      return done(null, profile)
    } else {
      db.clientRepository.createUsingGoogleStrategy(profile)
        .then(function (id) {
          req.session.newuser = true
          return done(null, profile)
        })
    }
  })
}

exports.authenticateByFacebookStrategy = (req, accessToken, refreshToken, profile, done) => {
  db.clientRepository.findByIdFacebookStrategy(profile).then((id) => {
    if (id) {
      req.session.newuser = false
      return done(null, profile)
    } else {
      db.clientRepository.createUsingFacebookStrategy(profile)
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
    await db.clientRepository.findByIdGoogleStrategy(req.user).then((row) => {
      req.session.user = row
    })
    res.redirect('/stores')
  }
}

exports.loginRedirectFacebookStrategy = async (req, res) => {
  if (req.session.newuser) {
    res.render('pages/form-client', { user: req.user })
  } else {
    await db.clientRepository.findByIdFacebookStrategy(req.user).then((row) => {
      req.session.user = row
    })
    res.redirect('/stores')
  }
}

exports.setAddressGoogleStrategy = async (req, res) => {
  req.user.address = req.body.address
  req.user.address_details = req.body.address_details
  req.user.latitude = req.body.lat
  req.user.longitude = req.body.lng
  await db.clientRepository.registerAdressUsingGoogleStrategy(req.user).then()
  await db.clientRepository.findByIdGoogleStrategy(req.user).then((user) => {
    req.session.user = user
  })
  res.redirect('/stores')
}

exports.setAddressFacebookStrategy = async (req, res) => {
  req.user.address = req.body.address
  req.user.address_details = req.body.address_details
  req.user.latitude = req.body.lat
  req.user.longitude = req.body.lng
  await db.clientRepository.registerAdressUsingFacebookStrategy(req.user).then()
  await db.clientRepository.findByIdFacebookStrategy(req.user).then((user) => {
    req.session.user = user
  })
  res.redirect('/stores')
}

//añadido para cambio de direccion
exports.setAddress = async (req, res) => {
  req.user.address = req.body.address
  req.user.address_details = req.body.address_details
  req.user.latitude = req.body.lat
  req.user.longitude = req.body.lng
  // await db.clientRepository.registerAdressUsingFacebookStrategy(req.user).then()
  // await db.clientRepository.findByIdFacebookStrategy(req.user).then((user) => {
  //   req.session.user = user
  // })
  res.redirect('/stores')
}

exports.createOrder = async (req, res) => {
  let cart = JSON.parse(req.body.cart)
  let store = await db.storeRepository.findStoreById(cart.id)
  let response = {
    sucess: false,
    message: ''
  }
  if (!store.isOpened()) {
    response.sucess = false
    response.message = 'Lo sentimos la tienda se encuentra cerrada'
    res.json(response)
    return
  }
  // req.params.cart.products.forEach(productInCart => {
  //   var actualProductInStore = productsInStore.find(productInStock =>
  //     productInStock.products_in_stores_id === productInCart.products_in_stores_id)
  //   if (actualProductInStore.quantity < productInCart.quantity) {
  //     // no hay la cantidad de producto solicitada
  //   }
  // })
  console.log(cart)
  if (req.session.user) {
    await db.orderRepository.createOrder(req.session.user, cart)
    response.sucess = true
    response.message = 'El producto se ha creado satisfactoriamete'
  } else {
    response.sucess = false
    response.message = 'Por favor inicia sesion para comprar'
  }
  res.json(response)
}
