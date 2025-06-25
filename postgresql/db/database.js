import { Pool } from 'pg';
import 'dotenv/config';

const pool = new Pool({
	host: process.env.POSTGRESQL_RDS_ENDPOINT,
	user: process.env.POSTGRESQL_RDS_USERNAME,
	password: process.env.POSTGRESQL_RDS_PASSWORD,
	port: 5432,
	database: 'db_test',
});

// const res = await client.query(`CREATE DATABASE db_test WITH ENCODING='UTF-8'`);

/**
 * notes 테이블에 있는 모든 데이터를 가져오는 SELECT 함수
 * @returns {Array<{ uuid: string, title: string, contents: string, created: string }>}
 */
async function getNotes() {
	const client = await pool.connect();
	const res = await client.query(`SELECT * FROM notes`);
	console.log(res.rows);
	client.release();
	return res.rows;
}

// await getNotes();

/**
 * notes 테이블에서 uuid가 일치하는 데이터를 가져오는 SELECT 함수
 * @param {string} uuid - 원하는 note의 uuid
 * @returns {Array<{ uuid: string, title: string, contents: string, created: string }>}
 */
async function getNote(uuid) {
	const client = await pool.connect();
	const res = await client.query(`SELECT * FROM notes WHERE uuid='${uuid}'`);
	console.log(res.rows);
	client.release();
	return res.rows;
}

// await getNote('6dff6f2f-72e4-4185-befc-e930f137d589');

/**
 * notes 테이블에 데이터를 추가하는 INSERT 함수
 * @param {string} title - 새로 추가할 note의 제목
 * @param {string} contents - 새로 추가할 note의 내용
 */
async function addNote(title, contents) {
	const client = await pool.connect();
	const res = await client.query(
		`INSERT INTO notes (title, contents) VALUES('${title}', '${contents}')`
	);
	console.log(res.rows);
	client.release();
}

// await addNote('title3', 'content3');

/**
 * notes 테이블에서 uuid가 일치하는 데이터를 수정하는 UPDATE 함수
 * @param {string} uuid - 변경하고자 하는 note의 uuid
 * @param {string} title - note의 변경될 제목
 * @param {string} contents - note의 변경될 내용
 */
async function updateNote(uuid, title, contents) {
	const client = await pool.connect();
	const res = await client.query(
		`UPDATE notes SET title='${title}',contents='${contents}' WHERE uuid='${uuid}'`
	);
	console.log(res.rows);
	client.release();
}

// await updateNote(
// 	'89e7e683-b526-4516-b930-d626d737b4bd',
// 	'title3',
// 	'content3 - updated'
// );

/**
 * notes 테이블에서 uuid가 일치하는 데이터를 삭제하는 DELETE 함수
 * @param {string} uuid - 삭제하고자 하는 note의 uuid
 */
async function deleteNote(uuid) {
	const client = await pool.connect();
	const res = await client.query(`DELETE FROM notes WHERE uuid='${uuid}'`);
	console.log(res.rows);
	client.release();
}

// await deleteNote('0e719215-9c4e-4ef0-b694-469f44a8f037');

await getNotes();
