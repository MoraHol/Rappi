const normalization = require('../db/normalization')

exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('stores_working_hours', table => {
          table.increments('id').primary()
          table.integer('store_id').unsigned().notNullable()
          table.foreign('store_id').references('id').inTable('stores')
          table.integer('day_id').unsigned().notNullable()
          table.foreign('day_id').references('id').inTable('days_of_week')
          table.timestamp('time_open').notNullable()
          table.timestamp('time_closed').notNullable()
        })
      ]).then(() => {normalization.addTimeStamps(knex,'stores_working_hours')})
}

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTableIfExists('stores_working_hours')
      ])
}
