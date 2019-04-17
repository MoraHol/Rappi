const normalization = require('../db/normalization')

exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('products_in_stores', table => {
      table.increments('id').primary()
      table.integer('store_id').unsigned().notNullable()
      table.foreign('store_id').references('id').inTable('stores')
      table.integer('product_id').unsigned().notNullable()
      table.foreign('product_id').references('id').inTable('products')
      table.integer('quantity').unsigned().notNullable()
    })
  ]).then(() => { normalization.addTimeStamps(knex, 'products_in_stores') })
}

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('products_in_stores')
  ])
}
