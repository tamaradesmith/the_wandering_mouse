
exports.up = function(knex) {
  return knex.schema.createTable('scores', t =>{
    t.bigIncrements('id');
    t.string('name');
    t.integer('level');
    t.timestamp("createdAt").defaultTo(knex.fn.now());
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('scores')
};
