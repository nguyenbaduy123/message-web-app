exports.up = function (knex) {
  return knex.schema.createTable('users', function (table) {
    table.increments('id').primary()
    table.string('username').notNullable()
    table.string('email').notNullable().unique()
    table.string('fullname').notNullable()
    table.string('password').notNullable()
    table.string('image_url')
    table
      .integer('role_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('roles')
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.string('refreshToken')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('users')
}
