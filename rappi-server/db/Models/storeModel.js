'use strict'

const knex = require('../knex')
module.exports =
  class {
    constructor (storeKnex) {
      this.id = storeKnex.id
      this.name = storeKnex.name
      this.photo = storeKnex.photo
      this.phoneNumber = storeKnex.phone_number
      this.address = storeKnex.address
      this.address_details = storeKnex.address_details
      this.latitude = storeKnex.latitude
      this.longitude = storeKnex.longitude
      this.workingHours = storeKnex.working_hours
    }
    getProducts () {
      return knex('products_in_stores')
        .where({ store_id: this.id })
        .join('products', { 'products_in_stores.product_id': 'products.id' })
        .columns({ products_in_stores_id: 'products_in_stores.id' },
          { store_id: 'products_in_stores.store_id' },
          { product_id: 'products.id' },
          'products.name', 'products.photo',
          'products.price',
          'products_in_stores.quantity')
    }
    isOpened () {
      const today = new Date()
      var dayNumber = today.getDay() + 1
      var workingDay = this.workingHours.find(workingHour => workingHour.day_id === dayNumber)
      if (workingDay == null) {
        return false
      }
      var openFrom = new Date(workingDay.time_open)
      var closedAt = new Date(workingDay.time_closed)
      var todayNormalization = new Date(2000, 0, 1, today.getHours(), today.getMinutes())
      if (todayNormalization < openFrom || todayNormalization > closedAt) {
        return false
      }
      return true
    }
  }
