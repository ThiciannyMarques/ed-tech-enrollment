exports.up = function(knex) {
  return knex.schema.table('users', function(table) {
    table.string('password_reset_token').nullable();
    table.datetime('password_reset_expires').nullable();
  });
};

exports.down = function(knex) {
  return knex.schema.table('users', function(table) {
    table.dropColumn('password_reset_token');
    table.dropColumn('password_reset_expires');
  });
};