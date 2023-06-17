exports.up = function (knex) {
  return knex.schema.createTable("friend", (table) => {
    table.increments("id").primary();
    table
      .integer("user_id_1")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");

    table
      .integer("user_id_2")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("friend");
};
