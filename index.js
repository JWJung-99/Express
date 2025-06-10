const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
	console.log('Middleware test 0');
	next();
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});

// app.get('/', (req, res) => {
// 	res.send('Hello World!');
// });

const data = [
	{
		id: 1,
		name: 'name-1',
		note: 'note-1',
	},
	{
		id: 2,
		name: 'name-2',
		note: 'note-2',
	},
	{
		id: 3,
		name: 'name-3',
		note: 'note-3',
	},
];

app.get(
	'/notes',
	(req, res, next) => {
		console.log('Middleware test 1');
		next();
	},
	(req, res, next) => {
		console.log('Middleware test 2');
		next();
	},
	(req, res) => {
		res.send(data);
	}
);

app.post('/notes', (req, res) => {
	console.log(req.body);
	data.push(req.body);
	res.sendStatus(201);
});

app.get('/note/:noteId', (req, res) => {
	console.log(req.params);
	const item = data.filter((item) => item.id === Number(req.params.noteId));
	res.send(item);
});
