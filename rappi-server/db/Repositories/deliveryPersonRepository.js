'use strict'
const knex = require('../knex')
module.exports = {
  getDeliveryPersons: () => {
    return knex('delivery_persons')
      .select()
  },

  // findById:(id)=>{
  //   return knex('delivery-persons')
  //   .select()
  //   .where({ id: id })    
  // },

  changeDeliveryPersonStatus:(id)=>{
    console.log('esta en el delivery person repository antes del update')
    return knex.raw(
      `UPDATE delivery_persons SET is_valid_for_work = NOT is_valid_for_work WHERE id = ?`, id).then(result => {
        console.log('esta en el .then del delivery person repository en el result del update')
        return //new StoreModel(result.rows[0])
      }),
    console.log('el id fue: ' + id + 'y esta en el delivery person repository despues del update')
  },


  // findStoreById: async (id) => {
  //   return knex.raw(
  //     `SELECT id, name, phone_number, address, address_details, latitude, longitude, photo,
  //           (SELECT array_to_json(array_agg(row_to_json(working_hours_table)))  
  //               FROM (SELECT day_id, time_open, time_closed FROM stores_working_hours WHERE store_id = stores.id) AS working_hours_table
  //           ) AS working_hours
  //       FROM stores WHERE id = ?`, id).then(result => {
  //     return new StoreModel(result.rows[0])
  //   })
  // },


  findByIdGoogleStrategy: (profile) => {
    return knex('delivery_persons')
      .select()
      .where({ googleid: profile._json.sub })
      .first()
  },
  findByIdFacebookStrategy: (profile) => {
    return knex('delivery_persons')
      .select()
      .where({ facebookid: profile._json.id })
      .first()
  },
  createUsingGoogleStrategy: (profile) => {
    return knex('delivery_persons')
      .insert({
        googleid: profile._json.sub,
        email: profile._json.email,
        first_name: profile._json.given_name,
        last_name: profile._json.family_name,
        photo: profile._json.picture
      })
  },
  createUsingFacebookStrategy: (profile) => {
    let name = profile._json.name.split(' ')
    return knex('delivery_persons').insert({
      facebookid: profile._json.id,
      email: profile._json.email,
      first_name: name[0],
      last_name: name[1],
      photo: profile.photos[0].value
    })
  },
  registerAdditionalDataUsingGoogleStrategy: (profile) => {
    return knex('delivery_persons').update({
      personal_id: profile.personal_id,
      phone_number: profile.phone_number
    }).where({
      googleid: profile._json.sub
    })
  },
  registerAdditionalDataUsingFacebookStrategy: (profile) => {
    return knex('delivery_persons').update({
      personal_id: profile.personal_id,
      phone_number: profile.phone_number
    }).where({
      facebookid: profile._json.id
    })
  }
}
