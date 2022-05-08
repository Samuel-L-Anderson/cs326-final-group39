import 'dotenv/config';
import { MongoClient, ServerApiVersion } from 'mongodb';

export class GameDatabase {
  constructor(dburl) {
    this.dburl = dburl;
  }

  async connect() {
    this.client = await MongoClient.connect(this.dburl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverApi: ServerApiVersion.v1,
    });

    // Get the database.
    this.db = this.client.db('myFirstDatabase');

    // Init the database.
    await this.init();
  }

  async init() {
    this.collection = this.db.collection('Users');
    const count = await this.collection.countDocuments();
  }

  // Close the pool.
  async close() {
    this.client.close();
  }

  // CREATE a user in the database.
  async createEntry(value) {
    console.log(value);
    console.log("..........");
    const res = await this.collection.insertOne(value);
    // Note: the result received back from MongoDB does not contain the
    // entire document that was inserted into the database. Instead, it
    // only contains the _id of the document (and an acknowledged field).
    console.log(res);
    return res;
  }

  // READ a user from the database.
  async readEntry(id) {
    const res = await this.collection.find(id).toArray();
    console.log(res);
    return res;
  }

  // UPDATE a user in the database.
  async updateEntry(id,value) {
    const res = await this.collection.updateOne(
     id,
      { $set: value }
    );
    return res;
  }

  // DELETE a user from the database.
  async deleteEntry(id) {
    // Note: the result received back from MongoDB does not contain the
    // entire document that was deleted from the database. Instead, it
    // only contains the 'deletedCount' (and an acknowledged field).
    const res = await this.collection.deleteOne(id);
    return res;
  }

  // READ all people from the database.
  async readAllEntries() {
    const res = await this.collection.find({}).toArray();
    return res;
  }
}
