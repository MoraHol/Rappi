
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('products_in_stores').del()
    .then(function () {
      // Inserts seed entries
      return knex('products_in_stores').insert([
        { store_id: 1, product_id: 8, quantity: 100 },
        { store_id: 1, product_id: 1, quantity: 100 },
        { store_id: 1, product_id: 2, quantity: 100 },
        { store_id: 1, product_id: 3, quantity: 100 },

        { store_id: 2, product_id: 1, quantity: 100 },
        { store_id: 2, product_id: 4, quantity: 100 },
        { store_id: 2, product_id: 5, quantity: 100 },
        { store_id: 2, product_id: 6, quantity: 100 },
        { store_id: 2, product_id: 7, quantity: 100 },

        { store_id: 3, product_id: 13, quantity: 100 },
        { store_id: 3, product_id: 14, quantity: 100 },
        { store_id: 3, product_id: 15, quantity: 100 },
        { store_id: 3, product_id: 16, quantity: 100 },
        { store_id: 3, product_id: 17, quantity: 100 },

        { store_id: 4, product_id: 10, quantity: 100 },
        { store_id: 4, product_id: 11, quantity: 100 },
        { store_id: 4, product_id: 12, quantity: 100 },
        { store_id: 4, product_id: 13, quantity: 100 },
        { store_id: 4, product_id: 14, quantity: 100 },

        { store_id: 5, product_id: 9, quantity: 100 },
        { store_id: 5, product_id: 1, quantity: 100 },
        { store_id: 5, product_id: 2, quantity: 100 },
        { store_id: 5, product_id: 3, quantity: 100 }
      ])
    })
}
