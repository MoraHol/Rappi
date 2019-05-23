'use strict'
const knex = require('../knex')

// module.exports = {
//   createOrder: async (user, cart) => {
//     const id = await knex('orders')
//       .insert({
//         client_id: user.id
//       })
//       .returning('id')
//     cart.products.forEach(product => {
//       knex('products_in_orders').insert({
//         order_id: id,
//         products_in_stores_id: product.products_in_stores_id
//       })
//     })
//   }
// }

// module.exports =
//   class {
//     constructor (clientKnex) {
//       this.id = clientKnex.id
//       this.name = clientKnex.first_name + clientKnex.last_name
//       this.address = clientKnex.address
//       this.address_details = clientKnex.address_details
//       this.latitude = clientKnex.latitude
//       this.longitude = clientKnex.longitude
//     }
//   }
