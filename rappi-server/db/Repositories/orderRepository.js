const knex = require('../knex')

module.exports = {
  createOrder: async (user, cart) => {
    let id = await knex('orders')
      .insert({
        client_id: user.id,
        status_id: 1
      })
      .returning('id')
      id = id[0]
    cart.basket.forEach(product => {
      console.log(product)
      knex('products_in_orders').insert({
        order_id: id,
        products_in_stores_id: product.id_product,
        quantity: product.quantity
      }).then(result => {

      })
    })
  }
}
