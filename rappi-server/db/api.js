var knex = require('./knex');

module.exports = {
  findUserById: function(profile) {
    return knex('users')
      .select()
      .where({ googleid: profile.id })
      .first();
  },

  createUser: function(profile) {
    return knex('users')
      .insert({ googleid: profile.id, email: profile.email.value});
  }
};