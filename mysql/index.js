const mysql = require('mysql2');
require('dotenv').config();

// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
	host: process.env.MYSQL_RDS_ENDPOINT,
	user: process.env.MYSQL_RDS_USERNAME,
	password: process.env.MYSQL_RDS_PASSWORD,
	port: 3306,
	database: 'db_test',
});

pool.query(`SELECT * FROM notes`, function (err, rows, fields) {
	console.log(rows);
});
