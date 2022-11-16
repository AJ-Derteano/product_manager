const knex = require('knex')({
  client: 'mysql',
  version: process.env.DB_VERSION,
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB
  },
  pool: { min: 0, max: 10 }
});