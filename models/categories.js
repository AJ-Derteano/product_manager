const Categories = async (knex) => {
  let exists = knex.schema.hasTable('categories');

  if (!exists) {
    return knex.schema.createTable('categories', (table) => {
      table.increments('idcategory').primary();
      table.string('category').unique();
      table.datetime('date_created')
      table.string('user_created')
      table.datetime('date_updated')
      table.string('user_updated')
    })
  } else {
    return 'Table categories exists'
  }
}

module.exports = {
  Categories
}