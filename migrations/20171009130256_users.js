exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (table)=>{
    table.increments('id').primary()
    table.string('user_name').notNullable().defaultTo('')
    table.string('first_name').notNullable().defaultTo('')
    table.string('last_name').notNullable().defaultTo('')
    table.string('email').notNullable().unique()
    table.varchar('hashed_password').notNullable()
    table.text('bio').defaultTo('')
    // table.boolean('admin').defaultTo(false)
    // table.varchar('invite_code').notNullable().defaultTo()
    // table.integer('inviter_id').notNullable().references('users.id').index()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
};
