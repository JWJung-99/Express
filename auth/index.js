import express from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

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

function authorizationJWT(req, res, next) {
	const auth = req.headers.authorization;

	if (!auth) {
		res.sendStatus(401);
		return;
	}

	const value = auth.split(' ')[1];

	// Bearer 처리
	const decoded = jwt.verify(value, 'secret');
	const user = users[0];

	if (decoded.id !== user.id) {
		res.sendStatus(401);
		return;
	}

	if (decoded.name !== user.name) {
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

app.post('/token', (req, res, next) => {
	try {
		const { id, password } = req.body;
		const user = users[0];

		if (id !== user.id) {
			const error = new Error('존재하지 않는 아이디입니다.');
			error.status = 401;
			throw error;
		}

		if (password !== user.password) {
			const error = new Error('비밀번호를 확인해주세요.');
			error.status = 401;
			throw error;
		}

		const token = jwt.sign({ id, name: user.name }, 'secret', {
			expiresIn: '1h',
		});

		res.send({ token });
	} catch (err) {
		next(err);
	}
});

app.get('/notes', authorizationJWT, (req, res) => {
	const note = notes[0];

	res.send(note);
});

// Error Handling
app.use((err, req, res, next) => {
	const status = err.status || 500;
	const message = err.message || 'Internal Server Error';

	res.status(status).send(message);
});
