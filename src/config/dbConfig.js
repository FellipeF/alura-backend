import { MongoClient } from "mongodb";

export default async function connect(connectionString) {
    let mongoClient;

    try {
        mongoClient = new MongoClient(connectionString);
        console.log('Connecting to database cluster....');
        await mongoClient.connect();
        console.log('Connected succesfully to MongoDB Atlas');

        return mongoClient;
    } catch (error) {
        console.error('Error with database connection', error);
        process.exit();
    }
}