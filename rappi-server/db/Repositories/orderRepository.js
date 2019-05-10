const knex = require('../knex')
const OrderModel = require('../Models/orderModel')

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
  },

  getOrdersForAssign: async () =>{
    var orders = await knex('orders').select()
                .where('status_id', 1)
    let OrdersForAssign = []
    orders.forEach(order => {
      OrdersForAssign.push(new OrderModel(order))
    })
    return OrdersForAssign
  }
}
