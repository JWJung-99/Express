import { Pool } from 'pg';
import 'dotenv/config';

const pool = new Pool({
	host: process.env.POSTGRESQL_RDS_ENDPOINT,
	user: process.env.POSTGRESQL_RDS_USERNAME,
	password: process.env.POSTGRESQL_RDS_PASSWORD,
	port: 5432,
	database: 'db_test',
});

const client = await pool.connect();
// const res = await client.query(`CREATE DATABASE db_test WITH ENCODING='UTF-8'`);
const res = await client.query(`SELECT * FROM notes`);
console.log(res.rows);
client.release();
