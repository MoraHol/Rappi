
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('stores', table => {
          table.increments('id').primary()
          table.string('name').notNullable()
          table.string('phone_number')
          table.string('address')
          table.string('address_details')
          table.float('latitude')
          table.float('longitude')
          table.string('photo')
        })
      ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTableIfExists('stores')
      ])
};
