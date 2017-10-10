
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table){
    table.increments();
    table.string('user_name').notNullable().unique();
    table.specificType('hashed_password', 'char(60)').notNullable();
    table.string('email').notNullable().unique();
    table.specificType('bio', 'varchar(150)');
    table.boolean('admin');
    table.string('my_invite_code');
    table.string('inviter_code');
  })

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');

};
