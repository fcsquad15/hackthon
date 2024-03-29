const { Pool } = require("pg");

const knex = require("knex")({
  client: "pg",
  connection: {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB,
    password: process.env.DB_PASSWORD,
    port: 5432,
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

module.exports = knex;
