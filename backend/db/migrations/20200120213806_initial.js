
exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable("users", function(table) {
      table.increments('id').primary();
      table.string('name');
      table.string('surname');
      table.json('weeklyPrompts')
      table.json('dailyPrompts');
      table.string('googleID');

      table.timestamps(true, true);
    })
  ])
};

exports.down = function(knex) {
  return Promise.all(
    [knex.schema.dropTable('users')]
  )
};
