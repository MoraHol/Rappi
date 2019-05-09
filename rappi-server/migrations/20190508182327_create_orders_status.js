
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('orders_status', table => {
      table.increments('id').primary()
      table.string('status')
    })
  ]).then(function () {
    return knex('orders_status').insert([
      { status: 'Created' },
      { status: 'Assigned' },
      { status: 'On Delivery' },
      { status: 'Finished' }
    ])
  })
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('orders_status')
  ])
}
