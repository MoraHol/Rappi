'use strict'

const knex = require('../knex')
const ProductModel = require('../Models/productModel')

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
    async getProducts () {
      var dbproducts = await knex('products_in_stores')
        .where({ store_id: this.id })
        .join('products', { 'products_in_stores.product_id': 'products.id' })
        .columns({ products_in_stores_id: 'products_in_stores.id' },
          { store_id: 'products_in_stores.store_id' },
          { product_id: 'products.id' },
          'products.name', 'products.photo',
          'products.price',
          { quantity_available: 'products_in_stores.quantity' })

      let products = []
      for (let i = 0; i < dbproducts.length; i++) {
        products.push(new ProductModel(dbproducts[i]))
      }
      return products
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
