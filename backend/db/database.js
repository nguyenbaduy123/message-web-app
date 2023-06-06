const mysql = require("mysql2/promise");
const knexConfig = require('../knexfile');

const knex = require('knex')(knexConfig.development);

async function query(sql, params) {
  try {
    const result = await knex.raw(sql, params);
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

module.exports = query;
