import express from 'express';
import {
	getNotes,
	getNote,
	addNote,
	updateNote,
	deleteNote,
} from './db/database.js';

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});

// GET /notes
app.get('/notes', async (req, res) => {
	const notes = await getNotes();
	res.send(notes);
});

// GET /note/:uuid
app.get('/note/:uuid', async (req, res) => {
	const uuid = req.params.uuid;

	if (!uuid || uuid.length !== 36) {
		const error = new Error('No / Wrong parameter');
		error.status = 400;
		throw error;
	}

	const note = await getNote(uuid);

	if (note.length === 0) res.send({});

	res.send(note[0]);
});

// POST /note
app.post('/note', async (req, res) => {
	const { title, contents } = req.body;

	if (!title || !contents) {
		const error = new Error('No required data');
		error.status = 400;
		throw error;
	}

	await addNote(title, contents);
	res.sendStatus(201);
});

// PUT /note/:uuid
app.put('/note/:uuid', async (req, res) => {
	const uuid = req.params.uuid;
	const { title, contents } = req.body;

	if (!uuid || uuid.length !== 36) {
		const error = new Error('No / Wrong parameter');
		error.status = 400;
		throw error;
	}

	if (!title || !contents) {
		const error = new Error('No required data');
		error.status = 400;
		throw error;
	}

	await updateNote(uuid, title, contents);

	const updatedNote = await getNote(uuid);

	res.send(updatedNote);
});

// DELETE /note/:uuid
app.delete('/note/:uuid', async (req, res) => {
	const uuid = req.params.uuid;

	if (!uuid || uuid.length !== 36) {
		const error = new Error('No / Wrong parameter');
		error.status = 400;
		throw error;
	}

	await deleteNote(uuid);
	res.sendStatus(204);
});

// Error Handling
app.use((err, req, res, next) => {
	const status = err.status || 500;
	const message = err.message || 'Internal Server Error';

	res.status(status).send(message);
});
