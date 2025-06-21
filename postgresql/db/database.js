import { Pool } from 'pg';
import 'dotenv/config';

const pool = new Pool({
	host: process.env.POSTGRESQL_RDS_ENDPOINT,
	user: process.env.POSTGRESQL_RDS_USERNAME,
	password: process.env.POSTGRESQL_RDS_PASSWORD,
	port: 5432,
});

const client = await pool.connect();
const res = await client.query(`SELECT NOW()`);
console.log(res);
client.release();
