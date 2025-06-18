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

/**
 * SELECT 함수
 */
function getNotes() {
	pool.query(
		`SELECT BIN_TO_UUID(uuid, true) AS uuid, title, contents, created FROM notes`,
		function (err, rows, fields) {
			console.log(rows);
		}
	);
}

getNotes();
