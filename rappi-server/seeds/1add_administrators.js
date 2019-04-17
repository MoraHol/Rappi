exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('administrators').del()
    .then(function () {
      // Inserts seed entries
      return knex('administrators').insert([
        { user_name: 'root', password: 'root' },
        { user_name: 'admin', password: 'admin' },
        { user_name: 'admin', password: '123' }
      ])
    })
}
