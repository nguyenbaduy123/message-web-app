exports.up = function (knex) {
  return knex.schema.createTable("group_message", (table) => {
    table.increments("id").primary();
    table
      .integer("group_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("groups")
      .onDelete("CASCADE");
    table
      .integer("user_id")
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
