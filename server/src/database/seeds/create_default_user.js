exports.seed = function(knex) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert([
        {
          username: 'admin',
          email: 'admin@edtech.com',
          password: '$2a$10$N9qo8uLOickgx2ZMRZoMy.Mrq4H3d7Q7QZR6.byX5W2l/3YV1nXJK', // senha: admin123
          role: 'admin',
          created_at: new Date(),
          updated_at: new Date()
        }
      ]);
    });
};