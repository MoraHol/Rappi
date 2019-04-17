
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('days_of_week', table => {
      table.increments('id').primary()
      table.string('day_name')
    })
  ]).then(function () {
    return knex('days_of_week').insert([
      { day_name: 'Monday' },
      { day_name: 'Tuesday' },
      { day_name: 'Wednesday' },
      { day_name: 'Thursday' },
      { day_name: 'Friday' },
      { day_name: 'Saturday' },
      { day_name: 'Sunday' }
    ])
  })
}

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('days_of_week')
  ])
}
