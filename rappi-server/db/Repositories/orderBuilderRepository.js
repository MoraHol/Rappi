'use strict'
const knex = require('../knex')

class products_in_orders {
  constructor (orderID, productsInStoresID, quantity) {
    this.order_id = orderID
    this.products_in_stores_id = productsInStoresID
    this.quantity = quantity
  }
}

class response {
  constructor (status, message) {
    this.sucess = status,
    this.message = message
  }
}

module.exports = {
  createOrderOnDB: async (user, cart) => {
    await knex.transaction(async function (transaction) {
      try {
        let id = await knex('orders')
          .transacting(transaction)
          .insert({
            client_id: user.id,
            status_id: 1
          })
          .returning('id')

        id = id[0]
        let arrayForInsert = []

        for (let index = 0; index < cart.basket.length; index++) {
          const product = cart.basket[index]
          arrayForInsert.push(new products_in_orders(id, product.id_product, product.quantity))
        }

        await knex('products_in_orders')
          .transacting(transaction)
          .insert(arrayForInsert)

        await transaction.commit
      } catch (error) {
        transaction.rollback
        throw error
      }
    })
      .catch(function () {
        let status = false
        let message = 'La orden no pudo ser creada, intente de nuevo'
        throw new response(status, message)
      })
  }
}
