'use strict'

const knex = require('../knex')
module.exports =
  class {
    constructor (productKnex) {
      this.product_id = productKnex.product_id
      this.store_id = productKnex.store_id
      this.products_in_stores_id = productKnex.products_in_stores_id
      this.name = productKnex.name
      this.price = productKnex.price
      this.photo = productKnex.photo
      this.quantity_available = productKnex.quantity_available
    }
    canSupply (units) {
      if (this.quantity_available < units) {
        return false
      }
      else{
        return true
      }
    }    
}
