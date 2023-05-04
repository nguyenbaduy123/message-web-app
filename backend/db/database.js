const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit : 100,
    host            : 'localhost',
    user            : 'root',
    password        : '',
    database        : 'cnweb',
})

async function dbQuery(query, params, callback) {
    pool.getConnection((err, connection) => {
        if(err) throw err;
        
        connection.query(query, params, (err, rows) => {
            if(err) {
                console.log("Error");
                connection.release();
                throw err;
            }

            callback(rows);
            // console.log('Ok');
            connection.release();

            return rows;
        })    
    })
  }
  
  
  module.exports = dbQuery;