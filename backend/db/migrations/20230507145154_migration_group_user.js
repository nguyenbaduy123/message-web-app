exports.up = function (knex) {
  return knex.schema.createTable('group_user', function (table) {
    table.increments('id').primary()
    table
      .integer('group_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('groups')
      .onDelete('CASCADE')
    table
      .integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('group_user')
}
