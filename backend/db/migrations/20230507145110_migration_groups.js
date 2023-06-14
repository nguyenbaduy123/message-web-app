exports.up = function (knex) {
  return knex.schema.createTable("groups", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.integer("number_member");
    table.string("image_url");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("groups");
};
