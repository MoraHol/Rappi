'use strict'
const knex = require('../knex')

module.exports = {
  createOrder: async (user, cart) => {
    const id = await knex('orders')
      .insert({
        client_id: user.id
      })
      .returning('id')
    cart.products.forEach(product => {
      knex('products_in_orders').insert({
        order_id: id,
        products_in_stores_id: product.products_in_stores_id
      })
    })
  }
}
