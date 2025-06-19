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

/**
 * 새로운 note를 추가하는 addNote 함수
 * @param {string} title - note의 제목
 * @param {string} contents - note의 내용
 */
export async function addNote(title, contents) {
	await pool.query(
		`INSERT INTO notes (title, contents) VALUES('${title}', '${contents}')`
	);
}

/**
 * 매개변수에 전달한 uuid와 일치하는 note의 데이터를 수정하는 updateNote 함수
 * @param {string} uuid - 수정하려는 note의 uuid
 * @param {string} title - 수정한 note의 제목
 * @param {string} contents - 수정한 note의 내용
 * @returns {{fieldCount: number, affectedRows: number, insertId: number, info: string, serverStatus: number, warningStatus: number, changedRows: number}}
 */
export async function updateNote(uuid, title, contents) {
	const [rows] = await pool.query(
		`UPDATE notes SET title='${title}',contents='${contents}' WHERE uuid=UUID_TO_BIN('${uuid}', 1)`
	);

	return rows;
}

/**
 * 매개변수에 전달한 uuid와 일치하는 note의 데이터를 삭제하는 deleteNote 함수
 * @param {string} uuid - 삭제하려는 note의 uuid
 * @returns {{fieldCount: number, affectedRows: number, insertId: number, info: string, serverStatus: number, warningStatus: number}}
 */
export async function deleteNote(uuid) {
	const [rows] = await pool.query(
		`DELETE FROM notes WHERE uuid=UUID_TO_BIN('${uuid}', 1)`
	);

	return rows;
}
