import mysql from 'mysql2/promise';
import 'dotenv/config';

// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
	host: process.env.MYSQL_RDS_ENDPOINT,
	user: process.env.MYSQL_RDS_USERNAME,
	password: process.env.MYSQL_RDS_PASSWORD,
	port: 3306,
	database: 'db_test',
});

/**
 * 전체 note 목록을 가져오는 getNotes 함수
 * @returns {Array<{ uuid: string, title: string, contents: string, created: string }>}
 */
export async function getNotes() {
	const [rows] = await pool.query(
		`SELECT BIN_TO_UUID(uuid, true) AS uuid, title, contents, created FROM notes`
	);

	return rows;
}

/**
 * 매개변수에 전달한 uuid와 일치하는 note 한 개를 가져오는 getNote 함수
 * @param {string} uuid - note의 uuid
 * @returns {Array<{ uuid: string, title: string, contents: string, created: string }>}
 */
export async function getNote(uuid) {
	const [rows] = await pool.query(
		`SELECT BIN_TO_UUID(uuid, true) AS uuid, title, contents, created FROM notes WHERE uuid=UUID_TO_BIN('${uuid}', 1)`
	);

	return rows;
}
