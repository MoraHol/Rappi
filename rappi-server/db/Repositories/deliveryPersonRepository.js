'use strict'
const knex = require('../knex')
module.exports = {
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
