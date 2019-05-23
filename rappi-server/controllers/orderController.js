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
    if (req.session.user) {
      let flag = await db.orderRepository.UserActiveOrders(req.session.user.id)
      if (flag) {
        response.sucess = false
        response.message = 'Ya tienes una orden creada'
      } else {
        await db.orderRepository.createOrder(req.session.user, cart)
        response.sucess = true
        response.message = 'El producto se ha creado satisfactoriamente'
      }
    } else {
      response.sucess = false
      response.message = 'Por favor inicia sesion para comprar'
    }
    res.json(response)
  },
  getOrderById: async (req, res) => {
    let order = await db.orderRepository.getOrder(req.params.id)
    res.json(order)
  },
  nextStep: async (req, res) => {
    let order = await db.orderRepository.getOrder(req.params.id)
    await db.orderRepository.moveOrderToNextStatus(order)
    order = await db.orderRepository.getOrder(req.params.id)
    res.json(order)
  },
  getOrderUnassigned: async (req, res) => {
    var lat = req.params.lat
    var long = req.params.lng

    let test = await db.orderRepository.getCloserOrderToLocation(lat, long)
    res.json(test)
  },
  assignOrder: async (req, res) => {
    let idDeliveryPerson = req.params.id_delivery_person
    let idOrder = req.params.id_order
    await db.orderRepository.assignOrderToDeliveryPerson(idOrder, idDeliveryPerson)
    let order = await db.orderRepository.getOrder(idOrder)
    res.json(order)
  },
  useractiveOrders: async (req, res) => {
    let response = {}
    response.flag = await db.orderRepository.UserActiveOrders(req.params.id)
    res.json(response)
  }
}
