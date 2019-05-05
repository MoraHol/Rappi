const normalization = require('../db/normalization')

exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('products_in_orders', table => {
      table.increments('id').primary()
      table.integer('products_in_stores_id').unsigned().notNullable()
      table.foreign('products_in_stores_id').references('id').inTable('products_in_stores')
      table.integer('order_id').unsigned().notNullable()
      table.foreign('order_id').references('id').inTable('orders')
      table.integer('quantity').unsigned().notNullable()
    })
  ]).then(() => { normalization.addTimeStamps(knex, 'products_in_orders') })
}

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('products_in_orders')
  ])
}
