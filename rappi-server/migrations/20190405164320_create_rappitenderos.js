
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('rappitendero', table => {
          table.increments('id').primary()
          table.string('email')
          table.string('first_name')
          table.string('last_name')
          table.string('googleid')
          table.string('facebookid')
          table.string('address')
          table.boolean ('is_valid_for_work')
          table.boolean ('phone_number')
          table.boolean ('personal_id')
        })
      ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('rappitendero')
      ])
};
