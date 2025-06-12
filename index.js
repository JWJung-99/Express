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

// Path Parameter
app.get('/note/:noteId', (req, res) => {
	console.log(req.params);
	const item = data.find((item) => item.id === Number(req.params.noteId));
	res.send(item);
});

// Query Parameter
app.get('/note', (req, res) => {
	console.log(req.query);
	const { id } = req.query;

	if (!id) res.send({});

	const item = data.filter((item) => item.id === Number(id));
	res.send(item);
});

// PUT
app.put('/note', (req, res) => {
	const { id, note, name } = req.body;

	if (!id) res.sendStatus(400);
	if (!note) res.sendStatus(400);
	if (!name) res.sendStatus(400);

	// 1. Array.findIndex를 이용해 같은 id 값을 찾는다.
	const index = data.findIndex((item) => item.id === id);
	// 2. 찾은 id 값을 이용해 원하는 데이터를 변경한다.
	data[index].note = note;
	console.log(data);
	res.sendStatus(204);
});

// DELETE
app.delete('/note/:noteId', (req, res) => {
	const noteId = Number(req.params.noteId);
	const index = data.findIndex((item) => item.id === noteId);
	// 찾는 데이터가 없다면 404 응답
	if (index === -1) res.sendStatus(404);

	// data 배열에서 데이터를 삭제하고 삭제한 배열을 반환
	const deletedItem = data.splice(index, 1)[0];
	console.log(deletedItem);

	res.status(200).json({
		message: 'Deleted Successfully!',
		deletedItem,
	});
});
