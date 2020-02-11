
exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable("entries", function(table) {
      table.increments('id').primary();
      table.string('date')
      table.integer('user_id').unsigned()
      table.foreign('user_id')
        .references('users.id')
      table.json('content');
    })
  ])
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('entries')
  ])
};
