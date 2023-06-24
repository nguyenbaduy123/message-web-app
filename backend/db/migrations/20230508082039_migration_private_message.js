exports.up = function (knex) {
  return knex.schema.createTable("private_message", (table) => {
    table.increments("id").primary();
    table
      .integer("from_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");

    table
      .integer("to_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");

    table.string("message");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    table.string("message_img");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("group_message");
};
