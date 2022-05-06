import express from 'express';
import { assignmentDatabase } from './assignment_db.js';
import mongoose from 'mongoose';


const Schema = mongoose.Schema;
const assignmentSchema = new Schema({
    assignment_name: String,
    assignment_id: Number,
    class_id: Number,
    month: Number,
    day: Number,
    year: Number
});

//model
const assignmentModel = mongoose.model('Assignment', assignmentSchema);

class AssignmentServer {
  constructor(dburl) {
    this.dburl = dburl;
    this.app = express();
    this.app.use('/', express.static('client'));
  }

  async initRoutes() {
    // Note: when using arrow functions, the "this" binding is lost.
    const self = this;

    this.app.post('/createAssignment', async (req, res) => {
      try {
        const { month, day, year, name, assignment_id, class_id } = req.body;
        const asignment = await self.db.createAssignment(month, day, year, name, assignment_id, class_id);
        res.send(JSON.stringify(assignment));
      } catch (err) {
        res.status(500).send(err);
      }
    });

    this.app.get('/readDate', async (req, res) => {
      try {
        const { month, day, year } = req.body;
        const date = await self.db.readPerson(month, day, year);
        res.send(JSON.stringify(date));
      } catch (err) {
        res.status(500).send(err);
      }
    });

    this.app.put('/updateAssignment', async (req, res) => {
      try {
        const { month, day, year, name, assignment_id, class_id } = req.body;
        const asignment = await self.db.createAssignment(month, day, year, name, assignment_id, class_id);
        res.send(JSON.stringify(assignment));
      } catch (err) {
        res.status(500).send(err);
      }
    });

    this.app.delete('/deleteAssignment', async (req, res) => {
      try {
        const { assignment_id } = req.body;
        const person = await self.db.deletePerson(assignment_id);
        res.send(JSON.stringify(person));
      } catch (err) {
        res.status(500).send(err);
      }
    });

  }

  async initDb() {
    this.db = new assignmentDatabase(this.dburl);
    await this.db.connect();
  }

  async start() {
    await this.initRoutes();
    await this.initDb();
    const port = process.env.PORT || 3000;
    this.app.listen(port, () => {
      console.log(`Assignment Server listening on port ${port}!`);
    });
  }
}

const server = new AssignmentServer(process.env.DATABASE_URL);
server.start();
