const mysql = require("mysql2/promise");
const knexConfig = require('../knexfile');

// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "cnweb",
// });

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


// function dbQuery(query, params) {
//   return new Promise((resolve, reject) => {
//     pool.getConnection((err, connection) => {
//       if (err) throw err;

//       connection.query(query, params, (err, rows) => {
//         return err ? reject(err) : resolve(rows);
//       });
//     });
//   });
// }

module.exports = query;
