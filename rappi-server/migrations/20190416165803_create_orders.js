const normalization = require('../db/normalization')

exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('orders', table => {
      table.increments('id').primary()
      table.integer('client_id').unsigned().notNullable()
      table.foreign('client_id').references('id').inTable('clients')
      table.integer('delivery_person_id').unsigned()
      table.foreign('delivery_person_id').references('id').inTable('delivery_persons')
    })
  ]).then(() => { normalization.addTimeStamps(knex, 'orders') })
}

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('orders')
  ])
}
