
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('stores_working_hours').del()
    .then(function () {
      // Inserts seed entries
      return knex('stores_working_hours').insert([
        { store_id: 1, day_id: 1, time_open: '2000-01-01 12:00:00-05', time_closed: '2000-01-01 22:00:00-05' },
        { store_id: 1, day_id: 2, time_open: '2000-01-01 12:00:00-05', time_closed: '2000-01-01 22:00:00-05' },
        { store_id: 1, day_id: 3, time_open: '2000-01-01 12:00:00-05', time_closed: '2000-01-01 22:00:00-05' },
        { store_id: 1, day_id: 4, time_open: '2000-01-01 12:00:00-05', time_closed: '2000-01-01 22:00:00-05' },
        { store_id: 1, day_id: 5, time_open: '2000-01-01 12:00:00-05', time_closed: '2000-01-01 22:00:00-05' },
        { store_id: 1, day_id: 6, time_open: '2000-01-01 12:00:00-05', time_closed: '2000-01-01 22:00:00-05' },
        { store_id: 1, day_id: 7, time_open: '2000-01-01 12:00:00-05', time_closed: '2000-01-01 22:00:00-05' },

        { store_id: 2, day_id: 2, time_open: '2000-01-01 08:00:00-05', time_closed: '2000-01-01 23:59:00-05' },
        { store_id: 2, day_id: 3, time_open: '2000-01-01 08:00:00-05', time_closed: '2000-01-01 23:59:00-05' },
        { store_id: 2, day_id: 4, time_open: '2000-01-01 08:00:00-05', time_closed: '2000-01-01 23:59:00-05' },
        { store_id: 2, day_id: 5, time_open: '2000-01-01 08:00:00-05', time_closed: '2000-01-01 23:59:00-05' },
        { store_id: 2, day_id: 6, time_open: '2000-01-01 08:00:00-05', time_closed: '2000-01-01 23:59:00-05' },
        { store_id: 2, day_id: 7, time_open: '2000-01-01 12:00:00-05', time_closed: '2000-01-01 23:59:00-05' },
        { store_id: 2, day_id: 1, time_open: '2000-01-01 12:00:00-05', time_closed: '2000-01-01 23:59:00-05' },

        { store_id: 3, day_id: 1, time_open: '2000-01-01 12:00:00-05', time_closed: '2000-01-01 19:00:00-05' },
        { store_id: 3, day_id: 2, time_open: '2000-01-01 12:00:00-05', time_closed: '2000-01-01 19:00:00-05' },
        { store_id: 3, day_id: 3, time_open: '2000-01-01 12:00:00-05', time_closed: '2000-01-01 19:00:00-05' },
        { store_id: 3, day_id: 4, time_open: '2000-01-01 12:00:00-05', time_closed: '2000-01-01 19:00:00-05' },
        { store_id: 3, day_id: 5, time_open: '2000-01-01 12:00:00-05', time_closed: '2000-01-01 19:00:00-05' },
        { store_id: 3, day_id: 6, time_open: '2000-01-01 12:00:00-05', time_closed: '2000-01-01 19:00:00-05' },
        { store_id: 3, day_id: 7, time_open: '2000-01-01 12:00:00-05', time_closed: '2000-01-01 19:00:00-05' },

        { store_id: 4, day_id: 2, time_open: '2000-01-01 12:00:00-05', time_closed: '2000-01-01 18:00:00-05' },
        { store_id: 4, day_id: 3, time_open: '2000-01-01 12:00:00-05', time_closed: '2000-01-01 18:00:00-05' },
        { store_id: 4, day_id: 4, time_open: '2000-01-01 12:00:00-05', time_closed: '2000-01-01 18:00:00-05' },
        { store_id: 4, day_id: 5, time_open: '2000-01-01 12:00:00-05', time_closed: '2000-01-01 18:00:00-05' },
        { store_id: 4, day_id: 6, time_open: '2000-01-01 12:00:00-05', time_closed: '2000-01-01 18:00:00-05' },

        { store_id: 5, day_id: 2, time_open: '2000-01-01 12:00:00-05', time_closed: '2000-01-01 22:00:00-05' },
        { store_id: 5, day_id: 3, time_open: '2000-01-01 12:00:00-05', time_closed: '2000-01-01 22:00:00-05' },
        { store_id: 5, day_id: 4, time_open: '2000-01-01 12:00:00-05', time_closed: '2000-01-01 22:00:00-05' },
        { store_id: 5, day_id: 5, time_open: '2000-01-01 12:00:00-05', time_closed: '2000-01-01 22:00:00-05' },
        { store_id: 5, day_id: 6, time_open: '2000-01-01 12:00:00-05', time_closed: '2000-01-01 22:00:00-05' },
        { store_id: 5, day_id: 7, time_open: '2000-01-01 12:00:00-05', time_closed: '2000-01-01 23:59:00-05' },
        { store_id: 5, day_id: 1, time_open: '2000-01-01 12:00:00-05', time_closed: '2000-01-01 23:59:00-05' }

      ])
    })
}
