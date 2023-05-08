exports.seed = function(knex) {
  return knex('roles').del()
    .then(function () {
      return knex('roles').insert([
        {id: 1, role_name: 'ADMIN', code: '111'},
        {id: 2, role_name: 'USER', code: '222'}
      ]);
    });
};
