
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('rappitendero', table => {
      table.increments('id').primary()
      table.string('email').notNullable()
      table.string('first_name').notNullable()
      table.string('last_name')
      table.string('googleid')
      table.string('facebookid')
      table.boolean('is_valid_for_work').defaultTo(false)
      table.string('phone_number')
      table.string('personal_id')
      table.string('photo')
    })
  ])
}

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('rappitendero')
  ])
}
