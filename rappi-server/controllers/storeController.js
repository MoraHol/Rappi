'use strict'
const db = require('../db')

function getDistanceFromLatLonInKm (lat1, lon1, lat2, lon2) {
  var R = 6371 // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1) // deg2rad below
  var dLon = deg2rad(lon2 - lon1)
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)

  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  var d = R * c // Distance in km
  return d
}

function deg2rad (deg) {
  return deg * (Math.PI / 180)
}

exports.getOpenByDistance = async (req, res) => {
  if (req.session.user) {
    var opened = await db.storeRepository.findAllStoresOpened()
    for (let i = 0; i < opened.length; i++) {
      var store = opened[i]
      store.distance = getDistanceFromLatLonInKm(store.latitude, store.longitude, req.session.user.latitude, req.session.user.longitude)
      store.distance = Math.round(store.distance * 10) / 10
      store.deliveryTime = 20 + (Math.round(store.distance) * 3) // tiempo es 20 minutos mas 3 minutos por kilometro
      store.deliveryPrice = store.deliveryTime * 100 // precio es 100 pesos por minuto
      opened[i] = store
    }
    opened.sort((a, b) => {
      if (a.distance > b.distance) {
        return 1
      }
      if (a.distance < b.distance) {
        return -1
      }
      return 0
    })
    res.render('pages/stores', { user: req.session.user, stores: opened })
  } else {
    res.redirect(303, '/login')
  }
}

exports.getStore = async (req, res) => {
  try {
    let store = await db.storeRepository.findStoreById(req.params.id)
    let products = await store.getProducts()
    res.render('pages/store', { user: req.session.user, products, store })
  } catch (error) {
    res.redirect('/login')
  }
}
