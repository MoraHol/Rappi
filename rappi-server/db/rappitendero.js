'use strict'
const knex = require('./knex')
module.exports = {
  findRappiTenderoByIdGoogleStrategy: (profile) => {
    return knex('rappitendero')
      .select()
      .where({ googleid: profile._json.sub })
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
  registerAdditionalDataGoogleStrategy: (profile) => {
    return knex('rappitendero').update({
      personal_id: profile.personal_id,
      phone_number: profile.phone_number
    }).where({
      googleid: profile._json.sub
    })
  }
}
