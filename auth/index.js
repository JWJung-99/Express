import express from 'express';

const app = express();
const port = 3000;

// 임시 user database
const users = [
	{
		name: 'user1',
		id: 'id1',
		password: 'password1',
	},
];

// 임시 notes database
const notes = [
	{
		id: 1,
		title: 'title1',
		contents: 'content1',
	},
];

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function authorization(req, res, next) {
	const auth = req.headers.authorization;

	if (!auth) {
		res.sendStatus(401);
		return;
	}

	const value = auth.split(' ')[1];

	// base64 decoding
	const decodedValue = Buffer.from(value, 'base64').toString('utf8');
	const [id, password] = decodedValue.split(':');

	// user를 조회했다고 가정
	const user = users[0];

	if (id !== user.id || password !== user.password) {
		res.sendStatus(401);
		return;
	}

	next();
}

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});

app.get('/notes', authorization, (req, res) => {
	const note = notes[0];

	res.send(note);
});
