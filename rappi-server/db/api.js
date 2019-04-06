var knex = require('./knex')

module.exports = {
  findUserById: function (profile) {
    return knex('users')
      .select()
      .where({ googleid: profile._json.sub })
      .first()
  },

  createUser: function (profile) {
    return knex('users')
      .insert({
        googleid: profile._json.sub,
        email: profile._json.email,
        first_name: profile._json.given_name,
        last_name: profile._json.family_name
      })
  }
}
