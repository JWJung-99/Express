import 'dotenv/config';

import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = `mongodb+srv://mongodb:${process.env.MONGODB_PASSWORD}@express-mongodb.0sbyvrc.mongodb.net/?retryWrites=true&w=majority&appName=express-mongodb`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});

async function run() {
	try {
		// Connect the client to the server	(optional starting in v4.7)
		await client.connect();
		// Send a ping to confirm a successful connection
		const db = client.db('db_test');
		const collection = db.collection('notes');
		await collection.insertOne({ title: 'title1', contents: 'contents1' });
		console.log(
			'Pinged your deployment. You successfully connected to MongoDB!'
		);
	} finally {
		// Ensures that the client will close when you finish/error
		await client.close();
	}
}
run().catch(console.dir);
