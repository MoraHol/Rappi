'use strict'
const db = require('../db')

module.exports = {
  
  loginRedirectAdmin: async (req, res) => {
    console.log('esta en el adminController loginRedicectAdmin')
    // if (req.session.newuser) {
    // res.render('pages/admin-home', {
    //     user: req.user
    // })
    res.redirect('/admin/deliveryPersons')
  },


    
  getDeliveryPersons: async (req, res) => {
    console.log('esta en el router.get admin/deliveryPerson')
    try {
      let delivery_persons = await db.deliveryPersonRepository.getDeliveryPersons()
      console.log(delivery_persons)
      res.render('pages/admin-deliveryPerson', {
        delivery_persons: delivery_persons
      }
      )
    } catch (error) {
      res.redirect('/')
    }
  },

  
  //admin-deliveryPerson

}