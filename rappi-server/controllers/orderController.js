'use strict'
const db = require('../db')
module.exports = {
  createOrder: async (req, res) => {
    let cart = JSON.parse(req.body.cart)
    let response = {
      sucess: false,
      message: ''
    }
    try {
      await db.orderValidityChecker.isValidOrder(req.session.user, cart)
      await db.orderBuilder.createOrderOnDB(req.session.user, cart)
      response.sucess = true
      response.message = 'El producto se ha creado satisfactoriamente'
      return
    } catch (error) {
      response = error
    } finally {
      res.json(response)
    }
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
