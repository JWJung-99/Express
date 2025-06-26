import 'dotenv/config';

import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb';
const uri = `mongodb+srv://mongodb:${process.env.MONGODB_PASSWORD}@express-mongodb.0sbyvrc.mongodb.net/?retryWrites=true&w=majority&appName=express-mongodb`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});

await client.connect();
const db = client.db('db_test');
const collection = db.collection('notes');

/**
 * notes에 저장된 데이터를 조회하는 SELECT 함수
 * @returns {Array<{ _id: string, title: string, contents: string, created: object }>}
 */
export async function getNotes() {
	const cursor = collection.find(
		{},
		{
			projection: {
				_id: { $toString: '$_id' },
				title: 1,
				contents: 1,
				created: 1,
			},
		}
	);
	const result = await cursor.toArray();

	console.log(result);

	return result;
}

// await getNotes();

/**
 * notes에서 특정 id 값을 갖는 데이터를 검색하는 SELECT 함수
 * @param {string} id - notes에서 찾고자 하는 데이터의 id
 * @returns {Array<{ _id: string, title: string, contents: string, created: object }>}
 */
export async function getNote(id) {
	const result = await collection.findOne(
		{ _id: new ObjectId(id) },
		{
			projection: {
				_id: { $toString: '$_id' },
				title: 1,
				contents: 1,
				created: 1,
			},
		}
	);
	console.log(result);
	return result;
}

// await getNote('685c07c2f2bf41a1da48235a');

/**
 * 새로운 note를 추가하는 INSERT 함수
 * @param {string} title - 새로 추가할 note의 제목
 * @param {string} contents - 새로 추가할 note의 내용
 */
export async function addNote(title, contents) {
	await collection.insertOne({
		title,
		contents,
		created: new Date(),
	});
}

// await addNote('title2', 'content2');

/**
 * notes에서 특정 id 값을 갖는 note의 데이터를 변경하는 UPDATE 함수
 * @param {string} id - 변경할 note의 id
 * @param {string} title - 변경할 note의 제목
 * @param {string} contents - 변경할 note의 내용
 */
export async function updateNote(id, title, contents) {
	await collection.updateOne(
		{ _id: new ObjectId(id) },
		{ $set: { title: title, contents: contents } }
	);
}

// await updateNote('685c07c2f2bf41a1da48235a', 'title1', 'content1 - updated');

/**
 * notes에서 특정 id 값을 갖는 note를 삭제하는 DELETE 함수
 * @param {string} id - 삭제할 note의 id
 */
export async function deleteNote(id) {
	await collection.deleteOne({ _id: new ObjectId(id) });
}

// await deleteNote('685c14819c9f271a6c91a5b4');

// async function run() {
// 	try {
// 		// Connect the client to the server	(optional starting in v4.7)
// 		await client.connect();
// 		// Send a ping to confirm a successful connection
// 		await collection.insertOne({ title: 'title1', contents: 'contents1' });
// 		console.log(
// 			'Pinged your deployment. You successfully connected to MongoDB!'
// 		);
// 	} finally {
// 		// Ensures that the client will close when you finish/error
// 		await client.close();
// 	}
// }
// run().catch(console.dir);
