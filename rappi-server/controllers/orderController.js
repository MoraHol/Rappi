'use strict'
const db = require('../db')
module.exports = {
  createOrder: async (req, res) => {
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
}
