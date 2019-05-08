'use strict'
const knex = require('../knex')
const StoreModel = require('../Models/storeModel')

module.exports = {
  findAll: () => {
    return knex.raw(
      `SELECT id, name, phone_number, address, address_details, latitude, longitude, photo,
            (SELECT array_to_json(array_agg(row_to_json(working_hours_table)))  
                FROM (SELECT day_id, time_open, time_closed FROM stores_working_hours WHERE store_id = stores.id) AS working_hours_table
            ) AS working_hours
        FROM stores`
    ).then(result => {
      let stores = []
      result.rows.forEach(store => {
        stores.push(new StoreModel(store))
      })
      return stores
    })
  },
  findStoreById: async (id) => {
    return knex.raw(
      `SELECT id, name, phone_number, address, address_details, latitude, longitude, photo,
            (SELECT array_to_json(array_agg(row_to_json(working_hours_table)))  
                FROM (SELECT day_id, time_open, time_closed FROM stores_working_hours WHERE store_id = stores.id) AS working_hours_table
            ) AS working_hours
        FROM stores WHERE id = ?`, id).then(result => {
      return new StoreModel(result.rows[0])
    })
  },
  findAllStoresOpened: async () => {
    const stores = await module.exports.findAll()
    let storesOpened = []
    stores.forEach((store) => {
      if (store.isOpened()) {
        storesOpened.push(store)
      }
    })
    return storesOpened
  }
}
