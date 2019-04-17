
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('stores').del()
    .then(function () {
      // Inserts seed entries
      return knex('stores').insert([
        {name: 'Pizzas del carajo', phone_number: '123456', address:'Cra. 58 #129-36', address_details:'', latitude:4.718356, longitude:-74.068574},
        {name: 'Presto Usaquén', phone_number: '123456', address:'Cra. 7 #6A-92', address_details:'', latitude:4.692575, longitude:-74.033215},
        {name: 'Sushi fans Hayuelos', phone_number: '123456', address:'Cl. 20 #82-52', address_details:'Local 245', latitude:4.663881, longitude:-74.130691},
        {name: 'Delirato', phone_number: '123456', address:'Cra. 14 #90-11', address_details:'', latitude:4.674325, longitude:-74.052366},
        {name: 'Alitas colombianas Portal 80', phone_number: '123456', address:'Ac 80 #100 - 52', address_details:'Local 112', latitude:4.710792, longitude:-74.111593}
      ]);
    });
};
