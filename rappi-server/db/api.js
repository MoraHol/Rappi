var knex = require('./knex');

module.exports = {
  findUserById: function(profileId) {
    return knex('users')
      .select()
      .where({ googleid: profileId })
      .first();
  },

  createUser: function(profileId) {
    return knex('users')
      .insert({ googleid: profileId });
  }
};