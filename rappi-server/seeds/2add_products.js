exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('products').del()
    .then(function () {
      // Inserts seed entries
      return knex('products').insert([
        { name: 'CocaCola 600ml', photo: 'https://images.rappi.com/products/2090179993-1540219158.png', price: 3000 },
        { name: 'Sprite 600ml', photo: 'https://images.rappi.com/products/2090179996-1552586762.png', price: 3000 },
        { name: 'Fuze Tea 600ml', photo: 'https://images.rappi.com/products/2090000903-1523894048.png', price: 3000 },
        { name: 'Hamburguesa sencilla', photo: 'https://images.rappi.com/products/2089996765-1523402954.png', price: 10000 },
        { name: 'Hamburguesa doble', photo: 'https://images.rappi.com/products/2089996768-1523402965.png', price: 15000 },
        { name: 'Perro sencillo', photo: 'https://images.rappi.com/products/2090197532-1552330009.png', price: 5000 },
        { name: 'Perro americano', photo: 'https://images.rappi.com/products/2090197543-1552333401.png', price: 10000 },
        { name: 'Porción Pizza', photo: 'https://images.rappi.com/products/2089989761-1533229194.png', price: 3000 },
        { name: 'Alitas x 12', photo: 'https://images.rappi.com/products/2089932701-1502807785.png', price: 15000 },
        { name: 'Bowl mixto', photo: 'https://images.rappi.com/products/2089921799-1535405924.png', price: 8000 },
        { name: 'Bowl cubano', photo: 'https://images.rappi.com/products/2089913221-1535405954.png', price: 8000 },
        { name: 'Bowl teriyaki', photo: 'https://images.rappi.com/products/2089921812-1535405945.png', price: 12000 },
        { name: 'Limonada natural', photo: 'https://images.rappi.com/products/2089934998-1552587620.png', price: 5000 },
        { name: 'Limonada cerezada', photo: 'https://images.rappi.com/products/2089936614-1522682194.png', price: 6000 },
        { name: 'Ojo de tigre roll x12', photo: 'https://images.rappi.com/products/2090109166-1539181667.png', price: 18000 },
        { name: 'California roll x12', photo: 'https://images.rappi.com/products/2090109179-1539181651.png', price: 18000 },
        { name: 'Salmon roll x12', photo: 'https://images.rappi.com/products/2090109184-1539181647.png', price: 21000 }
      ])
    })
}
