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
  }

}
