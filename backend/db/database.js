const mysql = require("mysql2/promise");

// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "cnweb",
// });

async function query(sql, params) {
  const con = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "cnweb",
  });

  await con.connect();

  try {
    const [rows] = await con.execute(sql, params);
    console.log(rows);

    return rows;
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    con.end();
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
