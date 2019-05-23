'use strict'
const db = require('../db')

module.exports = {
  getOpenByDistance: async (req, res) => {
    if (!req.session.user) {
      res.redirect(303, '/login')
    } else {
      var opened = await db.storeRepository.findAllStoresOpened()
      for (let i = 0; i < opened.length; i++) {
        var store = opened[i]
        store.distance = db.addressRepository.getDistanceFromLatLonInKm(store.latitude, store.longitude, req.session.user.latitude, req.session.user.longitude)
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
      res.render('pages/stores', {
        user: req.session.user,
        stores: opened
      })
    }
  },
  getStore: async (req, res) => {
    try {
      let store = await db.storeRepository.findStoreById(req.params.id)
      let products = await store.getProducts()
      console.log(products)
      console.log(products[0].canSupply(10))
      console.log(products[0].canSupply(102))
      res.render('pages/store', {
        user: req.session.user,
        products,
        store
      })
    } catch (error) {
      res.redirect('/login')
    }
  }
}
