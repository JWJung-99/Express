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

// getNotes();

function getNote(uuid) {
	pool.query(
		`SELECT BIN_TO_UUID(uuid, true) AS uuid, title, contents, created FROM notes WHERE uuid=UUID_TO_BIN('${uuid}', 1)`,
		function (err, rows, fields) {
			console.log(rows);
		}
	);
}

getNote('7e1b5bf6-4d04-11f0-adb9-06ecff2d3aa3');

/**
 * INSERT 함수
 */
function addNote(title, contents) {
	pool.query(
		`INSERT INTO notes (title, contents) VALUES('${title}', '${contents}')`,
		function (err, rows, fields) {
			console.log(rows);
		}
	);
}

// addNote('My Third Note', 'Note-3');

/**
 * UPDATE 함수
 */
function updateNote(uuid, title, contents) {
	pool.query(
		`UPDATE notes SET title='${title}',contents='${contents}' WHERE uuid=UUID_TO_BIN('${uuid}', 1)`,
		function (err, rows, fields) {
			console.log(rows);
		}
	);
}

// updateNote(
// 	'4c26c6ee-4cff-11f0-adb9-06ecff2d3aa3',
// 	'Updated - My Third Note',
// 	'Updated - A note about something else'
// );

/**
 * DELETE 함수
 */
function deleteNote(uuid) {
	pool.query(
		`DELETE FROM notes WHERE uuid=UUID_TO_BIN('${uuid}', 1)`,
		function (err, rows, fields) {
			console.log(rows);
		}
	);
}

// deleteNote('468c026e-4d04-11f0-adb9-06ecff2d3aa3');

// getNotes();
