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

  // testorder: async (req, res) =>{
  //   var lat =  4.7007205
  //   var long = -74.0358761
    
  //   //let test =  await db.orderRepository.getCloserOrderToLocation(lat,long)
    
  //   await db.orderRepository.assignOrderToDeliveryPerson(1,1)
  //   let test =  await db.orderRepository.getOrder(1)
  //   console.log(await test.getTotalPrice())
  //   res.json(test)
  // }
}
