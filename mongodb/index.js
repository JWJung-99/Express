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
	res.send('Hello World!');
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});

// GET /notes
app.get('/notes', async (req, res) => {
	const result = await getNotes();

	res.send(result);
});

// GET /note/:id
app.get('/note/:id', async (req, res, next) => {
	try {
		const id = req.params.id;

		if (!id) {
			const error = new Error('No Required Parameter');
			error.status = 400;
			throw error;
		}

		if (id.length !== 24) {
			const error = new Error('Wrong Parameter');
			error.status = 400;
			throw error;
		}

		const result = await getNote(id);

		if (result.length === 0) res.send({});
		res.send(result);
	} catch (err) {
		next(err);
	}
});

// POST /note
app.post('/note', async (req, res, next) => {
	try {
		const { title, contents } = req.body;

		if (!title || !contents) {
			const error = new Error('No Required Data');
			error.status = 400;
			throw error;
		}

		await addNote(title, contents);
		res.sendStatus(201);
	} catch (err) {
		next(err);
	}
});

// PUT /note/:id
app.put('/note/:id', async (req, res, next) => {
	try {
		const id = req.params.id;
		const { title, contents } = req.body;

		if (!id) {
			const error = new Error('No Required Parameter');
			error.status(400);
			throw error;
		}

		if (id.length !== 24) {
			const error = new Error('Wrong Parameter');
			error.status(400);
			throw error;
		}

		if (!title && !contents) {
			const error = new Error('No Required Data');
			error.status(400);
			throw error;
		}

		await updateNote(id, title, contents);
		res.sendStatus(204);
	} catch (err) {
		next(err);
	}
});

// DELETE /note/:id
app.delete('/note/:id', async (req, res, next) => {
	try {
		const id = req.params.id;

		if (!id) {
			const error = new Error('No Required Parameter');
			error.status(400);
			throw error;
		}

		if (id.length !== 24) {
			const error = new Error('Wrong Parameter');
			error.status(400);
			throw error;
		}

		await deleteNote(id);
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
