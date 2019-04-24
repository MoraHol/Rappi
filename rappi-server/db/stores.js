'use strict'

const knex = require('./knex')

module.exports = {
  getAll: () => {
    return knex.raw(
      `SELECT id, name, phone_number, address, address_details, latitude, longitude,
            (SELECT array_to_json(array_agg(row_to_json(working_hours_table)))  
                FROM (SELECT day_id, time_open, time_closed FROM stores_working_hours WHERE store_id = stores.id) AS working_hours_table
            ) AS working_hours
        FROM stores`
    ).then(result => { return result.rows })
  },

  getProductsFromOne: (store) => {
    return knex('products_in_stores')
      .where({ store_id: store.id })
      .join('products', { 'products_in_stores.product_id': 'products.id' })
      .columns({ products_in_stores_id: 'products_in_stores.id' },
        { store_id: 'products_in_stores.store_id' },
        { product_id: 'products.id' },
        'products.name', 'products.image',
        'products.price',
        'products_in_stores.quantity')
  },

  updateQuantityOfProduct: (product) => {
    return knex('products_in_stores')
      .where({ id: product.products_in_stores_id })
      .decrement({ quantity: product.quantity })
  }

}
