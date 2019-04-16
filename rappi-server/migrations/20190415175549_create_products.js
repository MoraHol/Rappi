
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('products', table => {
          table.increments('id').primary()
          table.string('name').notNullable()
          table.text('image')
          table.integer('price').notNullable()
        })
      ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTableIfExists('products')
      ])
};
