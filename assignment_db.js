import 'dotenv/config';
import { MongoClient, ServerApiVersion } from 'mongodb';

export class assignmentDatabase {
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
    this.db = this.client.db('assignments');

    // Init the database.
    await this.init();
  }

  async init() {
    this.collection = this.db.collection('assignments');

    const count = await this.collection.countDocuments();

  }

  // Close the pool.
  async close() {
    this.client.close();
  }

  // CREATE a user in the database.
  async createAssignment(month, day, year, name, assignment_id, class_id) {
    const res = await this.collection.insertOne({ _id: assignment_id, month, day, year, name, class_id });

    return res;
  }

  async readDate(month, day, year) {
    const res = await this.collection.find({month, day, year}).toArray();
    return res;
  }

  async updatePerson(month, day, year, name, assignment_id, class_id) {
    const res = await this.collection.updateOne(
      { _id: assignment_id },
      { $set: { month, day, year, name, class_id } }
    );
    return res;
  }

  async deleteAssignment(assignment_id) {
    const res = await this.collection.deleteOne({ _id: assignment_id });
    return res;
  }
}
