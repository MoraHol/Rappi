'use strict'
const db = require('../db')

module.exports = {

  loginRedirectAdmin: async (req, res) => {
    res.redirect('/admin/deliveryPersons')
  },

  getDeliveryPersons: async (req, res) => {
    try {
      let delivery_persons = await db.deliveryPersonRepository.getDeliveryPersons()
      res.render('pages/admin-deliveryPerson', {
        delivery_persons: delivery_persons
      }
      )
    } catch (error) {
      res.redirect('/')
    }
  }

}
