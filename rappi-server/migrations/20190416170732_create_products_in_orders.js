
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('products_in_orders', table => {
          table.increments('id').primary()
          table.integer('product_id').unsigned().notNullable()
          table.foreign('product_id').references('id').inTable('products')
          table.integer('order_id').unsigned().notNullable()
          table.foreign('order_id').references('id').inTable('orders')
          table.integer('quantity').unsigned().notNullable()
        })
      ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTableIfExists('products_in_orders')
      ])
};
