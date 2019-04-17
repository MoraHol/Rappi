exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('products').del()
    .then(function () {
      // Inserts seed entries
      return knex('products').insert([
        {name: 'CocaCola 600ml', image:'', price: 3000},
        {name: 'Sprite 600ml', image:'', price: 3000},
        {name: 'Quatro 600ml', image:'', price: 3000},
        {name: 'Hamburguesa sencilla', image:'', price: 10000},
        {name: 'Hamburguesa doble', image:'', price: 15000},
        {name: 'Perro sencillo', image:'', price: 5000},
        {name: 'Perro americano', image:'', price: 10000},
        {name: 'Porción Pizza', image:'', price: 3000},
        {name: 'Alitas x 12', image:'', price: 15000},
        {name: 'Bowl mixto', image:'', price: 8000},
        {name: 'Bowl cubano', image:'', price: 8000},
        {name: 'Bowl paisa', image:'', price: 12000},
        {name: 'Limonada natural', image:'', price: 5000},
        {name: 'Limonada cerezada', image:'', price: 6000},
        {name: 'Ojo de tigre roll x12', image:'', price: 18000},
        {name: 'San francisco roll x12', image:'', price: 18000},
        {name: 'Salmon tempura roll x12', image:'', price: 21000}
      ]);
    });
};
