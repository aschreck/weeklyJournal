
exports.up = function(knex) {
  knex.schema.createTable("users", function(table) {
    table.increments('id')
  })
};

exports.down = function(knex) {

};
