exports.seed = function (knex) {
  return knex('students')
    .del()
    .then(function () {
      return knex('students').insert([
        {
          name: 'João Silva',
          email: 'joao@example.com',
          ra: '123456',
          cpf: '12345678901',
        },
        {
          name: 'Maria Souza',
          email: 'maria@example.com',
          ra: '654321',
          cpf: '10987654321',
        },
      ]);
    });
};
