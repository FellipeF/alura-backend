import 'dotenv/config';
import connect from '../config/dbConfig.js';
import { ObjectId } from 'mongodb';
const connection = await connect(process.env.STRING_CONNECTION);

export async function getAllPosts() {
    const db = connection.db("alura");
    const collection = db.collection("posts");

    return collection.find().toArray();
}

export async function createPost(newPost) {
    const db = connection.db("alura");
    const collection = db.collection("posts");

    return collection.insertOne(newPost);
}

export async function updatePost(id, updatedPost) {
    const db = connection.db("alura");
    const collection = db.collection("posts");
    const objID = ObjectId.createFromHexString(id);     //Put ID into Mongo Object

    return collection.updateOne({_id: new ObjectId(objID)}, {$set: updatedPost});
}