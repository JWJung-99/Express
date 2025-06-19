import express from 'express';
import { getNote, getNotes } from './db/database.js';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
	res.send('Hello Server!');
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});

app.get('/notes', async (req, res) => {
	const result = await getNotes();
	res.send(result);
});

app.get('/note/:uuid', async (req, res, next) => {
	try {
		const uuid = req.params.uuid;

		if (!uuid) throw new Error('400@No path parameter');

		const result = await getNote(uuid);

		if (!result) res.send({});
		if (result.length === 0) res.send({});

		res.send(result[0]);
	} catch (err) {
		next(err);
	}
});

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send('Something broke!');
});
