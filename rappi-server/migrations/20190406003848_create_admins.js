exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('admins', table => {
      table.increments('id').primary()
      table.string('user_name')
      table.string('password')
    })
  ])
}

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('admins')
  ])
}
