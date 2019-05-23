
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('orders', table => {
      table.integer('status_id').unsigned()
      table.foreign('status_id').references('id').inTable('orders_status')
    })
  ])
}

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('orders', table => {
      table.dropForeign('status_id')
      table.dropColumn('status_id')
    })
  ])
}
