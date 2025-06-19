import express from 'express';
import {
	addNote,
	deleteNote,
	getNote,
	getNotes,
	updateNote,
} from './db/database.js';

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.post('/note', async (req, res, next) => {
	const { title, contents } = req.body;

	if (!title) res.sendStatus(400);
	if (!contents) res.sendStatus(400);

	await addNote(title, contents);
	res.sendStatus(201);
});

app.put('/note/:uuid', async (req, res, next) => {
	try {
		const uuid = req.params.uuid;
		const { title, contents } = req.body;

		if (!uuid) {
			const error = new Error('No parameter');
			error.status = 400;
			throw error;
		}
		if (!title || !contents) {
			const error = new Error('No required data');
			error.status = 400;
			throw error;
		}

		const result = await updateNote(uuid, title, contents);

		if (result.affectedRows !== 1) {
			const error = new Error('Not updated');
			error.status = 400;
			throw error;
		}

		res.sendStatus(204);
	} catch (err) {
		next(err);
	}
});

app.delete('/note/:uuid', async (req, res, next) => {
	try {
		const uuid = req.params.uuid;

		if (!uuid) {
			const error = new Error('No parameter');
			error.status = 400;
			throw error;
		}

		const result = await deleteNote(uuid);

		if (result.affectedRows !== 1) {
			const error = new Error('Failed to delete');
			error.status = 400;
			throw error;
		}

		res.sendStatus(204);
	} catch (err) {
		next(err);
	}
});

// Error Handling
app.use((err, req, res, next) => {
	const status = err.status || 500;
	const message = err.message || 'Internal Server Error';

	res.status(status).send(message);
});
