'use strict'
const knex = require('../knex')
const clientModel = require('../Models/clientModel')

module.exports = {
  findByIdGoogleStrategy: (profile) => {
    return knex('clients')
      .select()
      .where({
        googleid: profile._json.sub
      })
      .first()
  },

  findById: async (client_id) => {
    return knex('clients')
      .select()
      .where({ id: client_id })
      .first()
      // .then(result =>{
      //   return new clientModel(result)
      // })
  },

  createUsingGoogleStrategy: (profile) => {
    return knex('clients')
      .insert({
        googleid: profile._json.sub,
        email: profile._json.email,
        first_name: profile._json.given_name,
        last_name: profile._json.family_name,
        photo: profile._json.picture
      })
  },
  registerAdressUsingGoogleStrategy: (profile) => {
    return knex('clients').update({
      address: profile.address,
      address_details: profile.address_details,
      latitude: profile.latitude,
      longitude: profile.longitude
    }).where({
      googleid: profile._json.sub
    })
  },
  findByIdFacebookStrategy: (profile) => {
    return knex('clients')
      .select()
      .where({
        facebookid: profile.id
      })
      .first()
  },
  registerAdressUsingFacebookStrategy: (profile) => {
    return knex('clients').update({
      address: profile.address,
      address_details: profile.address_details,
      latitude: profile.latitude,
      longitude: profile.longitude
    }).where({
      facebookid: profile._json.id
    })
  },
  createUsingFacebookStrategy: (profile) => {
    let name = profile._json.name.split(' ')
    const givenName = name[0]
    const familyName = name[1]
    return knex('clients')
      .insert({
        facebookid: profile._json.id,
        email: profile._json.email,
        first_name: givenName,
        last_name: familyName,
        photo: profile._json.picture.data.url
      })
  },
  findById: (id) => {
    return knex('clients')
      .select()
      .where({
        id: id
      })
      .first()
  },
  updateAddress: (client) => {
    return knex('clients').where({
      id: client.id
    }).update({
      address: client.address,
      address_details: client.address_details,
      latitude: client.latitude,
      longitude: client.longitude
    })
  }
}