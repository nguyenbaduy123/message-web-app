exports.up = function (knex) {
  return knex.schema.createTable('groups', (table) => {
    table.increments('id').primary()
    table.integer('number_member')
    table.timestamp('created_at').defaultTo(knex.fn.now())
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('groups')
}
