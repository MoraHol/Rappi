
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', table => {
      table.increments('id').primary()
      table.string('email')
      table.string('first_name')
      table.string('last_name')
      table.string('googleid')
      table.string('facebookid')
      table.string('address')
      table.string('address_details')
    })
  ])
}

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users')
  ])
}
