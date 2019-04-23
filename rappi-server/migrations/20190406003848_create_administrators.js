const normalization = require('../db/normalization')

exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('administrators', table => {
      table.increments('id').primary()
      table.string('user_name')
      table.string('password')
    })
  ]).then(() => {normalization.addTimeStamps(knex,'administrators')})
}

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('administrators')
  ])
}
