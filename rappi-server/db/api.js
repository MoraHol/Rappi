var knex = require('./knex')

module.exports = {
  findUserById: (profile) => {
    return knex('users')
      .select()
      .where({ googleid: profile._json.sub })
      .first()
  },

  createUser: (profile) => {
    return knex('users')
      .insert({
        googleid: profile._json.sub,
        email: profile._json.email,
        first_name: profile._json.given_name,
        last_name: profile._json.family_name,
        photo: profile._json.picture
      })
  },
  registerAdress: (profile) => {
    return knex('users').update({
      address: profile.address,
      address_details: profile.address_details
    }).where({
      googleid: profile._json.sub
    })
  }
}
