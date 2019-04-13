'use strict'
const knex = require('./knex')
module.exports = {
  findRappiTenderoByIdGoogleStrategy: (profile) => {
    return knex('rappitendero')
      .select()
      .where({ googleid: profile._json.sub })
      .first()
  },
  findRappiTenderoByIdFacebookStrategy: (profile) => {
    return knex('rappitendero')
      .select()
      .where({ facebookid: profile._json.id })
      .first()
  },
  createRappiTenderoGoogleStrategy: (profile) => {
    return knex('rappitendero')
      .insert({
        googleid: profile._json.sub,
        email: profile._json.email,
        first_name: profile._json.given_name,
        last_name: profile._json.family_name,
        photo: profile._json.picture
      })
  },
  createRappiTenderoFacebookStrategy: (profile) => {
    let name = profile._json.name.split(' ')
    return knex('rappitendero').insert({
      facebookid: profile._json.id,
      email: profile._json.email,
      first_name: name[0],
      last_name: name[1],
      photo: profile.photos[0].value
    })
  },
  registerAdditionalDataGoogleStrategy: (profile) => {
    return knex('rappitendero').update({
      personal_id: profile.personal_id,
      phone_number: profile.phone_number
    }).where({
      googleid: profile._json.sub
    })
  },
  registerAdditionalDataFacebookStrategy: (profile) => {
    return knex('rappitendero').update({
      personal_id: profile.personal_id,
      phone_number: profile.phone_number
    }).where({
      facebookid: profile._json.id
    })
  }
}
