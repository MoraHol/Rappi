var knex = require('./knex')

module.exports = {
  findUserByIdGoogleStrategy: (profile) => {
    return knex('users')
      .select()
      .where({ googleid: profile._json.sub })
      .first()
  },
  createUserGoogleStrategy: (profile) => {
    return knex('users')
      .insert({
        googleid: profile._json.sub,
        email: profile._json.email,
        first_name: profile._json.given_name,
        last_name: profile._json.family_name,
        photo: profile._json.picture
      })
  },
  registerAdressGoogleStrategy: (profile) => {
    return knex('users').update({
      address: profile.address,
      address_details: profile.address_details
    }).where({
      googleid: profile._json.sub
    })
  },
  findUserByIdFacebookStrategy: (profile) => {
    return knex('users')
      .select()
      .where({ facebookid: profile.id })
      .first()
  },
  registerAdressFacebookStrategy: (profile) => {
    return knex('users').update({
      address: profile.address,
      address_details: profile.address_details
    }).where({
      facebookid: profile._json.id
    })
  },
  createUserFacebookStrategy: (profile) => {
    let name = profile._json.name.split(' ')
    const givenName = name[0]
    const familyName = name[1]
    return knex('users')
      .insert({
        facebookid: profile._json.id,
        email: profile._json.email,
        first_name: givenName,
        last_name: familyName,
        photo: profile._json.picture.data.url
      })
  }
}
