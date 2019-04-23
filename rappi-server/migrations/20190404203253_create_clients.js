const normalization = require('../db/normalization')

exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('clients', table => {
      table.increments('id').primary()
      table.string('email')
      table.string('first_name')
      table.string('last_name')
      table.string('googleid')
      table.string('facebookid')
      table.string('address')
      table.string('address_details')
      table.float('latitude')
      table.float('longitude')
      table.string('photo')
    })
  ]).then(() => {normalization.addTimeStamps(knex,'clients')})
}

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('clients')
  ])
}
