'use strict'

const knex = require('../knex')

module.exports =
  class {
    constructor (generalInfo, products) {
      this.generalInfo = generalInfo
      this.products = products
    }

    getTotalPrice () {
      let totalPrice = 0
      for (let i = 0; i < this.products.length; i++) {
        const product = this.products[i]
        totalPrice += (product.quantity * product.unitPrice)
      }
      return totalPrice
    }
  }
