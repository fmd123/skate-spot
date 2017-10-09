'use strict'
exports.up = function(knex, Promise) {
  return knex.schema.createTable('spots', (table)=>{
    table.increments('id').primary()
    table.decimal('lat').notNullable().defaultTo()
    table.decimal('lon').notNullable().defaultTo()
    table.string('name').notNullable().defaultTo('')
    table.string('location').notNullable().defaultTo('')
    table.string('bust').notNullable().defaultTo('')
    table.text('difficulty').notNullable().defaultTo('')
    table.text('photo_url').notNullable().defaultTo('')
    table.text('description').notNullable().defaultTo('')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('spots')
};
