import express from 'express';
import { readFile, writeFile } from 'fs/promises';
import logger from 'morgan';
import mongoose from 'mongoose';
import * as path from 'path';
 
 
const app = express();
const port = 3000;
 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use('/client', express.static("client"));
 
 
//const MONGO_URI = 'mongodb+srv://39gs:ilovecoding@cluster0.1lsex.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const MONGO_URI = 'mongodb+srv://326group39:ilovecoding@cluster0.69p7f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
 
//CLASSES ORDERED BY ID 1-4 etc
//CHANNELS ORDERED BY ID 1.1-1.6 etc
//comment
 
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
 
//checking to see if mongo is connected
mongoose.connection.on('connected', () => {
    console.log('connected to mongoose....');
});
 
var Schema = mongoose.Schema;
 
const messageSchema = new Schema({
    user: [{
        name: { type: String },
        password: { type: String },
        spire_id: { type: String }
    }],
    message: String,
    class: [{
        title: { type: String },
        class_id: { type: String },
        professor: { type: String }
    }],
    channel: String
});
const message = mongoose.model("Message", messageSchema);
 
const classSchema = new Schema({
    title: String,
    class_id: Number,
    professor: String,
});
const classModel = mongoose.model('Class', classSchema);
 
const spireUserSchema = new Schema({
    spireid: Number,
    class_ids: [Number],
    name: String
});
const spireUserModel = mongoose.model('spire_user', spireUserSchema);
 
const userSchema = new Schema({
    name: String,
    password: String,
    spire_id: Number
});
const userModel = mongoose.model('user', userSchema);

const assignmentSchema = new Schema({
    name: String, 
    assignment_id: Number, 
    date: String, 
    class_id: Number, 
});
const assignmentModel = mongoose.model('assignment', assignmentSchema);


app.get('/upcomingAssignments', async (request, response) => {
    const options = request.query; 
    const userId = options.user_id;
    assignmentModel.find({spire_id: { $eq: options.user_id})
        .then((data) => {
            console.log(data);
            data.sort((a,b) =>  new Date(b.date) - new Date(a.date));
            console.log(data);
            data.slice(-5);
            response.send(data);
        }).catch((error) => {
            console.log('error:', error);
        })
})
  
app.get('/dashboard', async (request, response) => {
    classModel.find({})
        .then((data) => {
            console.log('Data: ', data);
            response.send(data);
        })
        .catch((error) => {
            console.log('error: ', error);
        });
});
  
app.get('/class', async (request, response) => {
    //http://localhost:3000/class?class=cs326
    //Retrieves information of class, i.e. student count, id
    const options = request.query;
    classModel.find({ "classid": options.classid })
        .then((data) => {
            console.log(data);
            response.send(data);
 
        })
        .catch((error) => {
            console.log(error);
 
        });
});
 
app.get('/classes', async (request, response) => {
    //http://localhost:3000/classes
    //Retrieves all classes and info
    classModel.find({})
        .then((data) => {
            console.log('Data: ', data);
            response.send(data);
        })
        .catch((error) => {
            console.log('error: ', error);
        });
});
 
app.get('/class/user', async (request, response) => {
    //get all users associated with specific class
    // /class/user?class_id=1
    const options = request.query;
    spireUserModel.find({ class_ids: options.class_id })
        .then((data) => {
            response.send(data);
        })
        .catch((error) => {
            console.log('error', error);
        });
});
 
app.get('/class/message', async (request, response) => {
    //http://localhost:3000/class/message?class_id=cs446
    //Retrieve all messages associated with class
    const options = request.query;
    message.find({ "class.class_id": { $eq: options.class_id } }, { message: 1, _id: 0 })
        .then((data) => {
            console.log("Data: ", data);
            response.send(data);
        })
        .catch((err) => {
            console.log("error", err);
        });
});
 
app.get('/class/channel/message', async (request, response) => {
    //http://localhost:3000/class/channel/message?channel=1.2
    //Retrieves messages associated with channel and class
    const options = request.query;
    message.find({ "channel": { $eq: options.channel } }, { message: 1, _id: 0 })
        .then((data) => {
            console.log("Data", data);
            response.send(data);
        })
        .catch((err) => {
            console.log("Error", err);
        });
});
 
 
app.get('/user', async (request, response) => {
    //http://localhost:3000/user?user_id=1
    //Retrieve by ID => name not unique
    const options = request.query;
    spireUserModel.findOne({ spire_id: { $eq: options.user_id } })
        .then((data) => {
            console.log("Data: ", data);
            response.send(data);
        })
        .catch((err) => {
            console.log("Error", err);
        })
});
 
app.post('/message', async (request, response) => {
    //http://localhost:3000/message?content=this%20is%20a%20message&userID=1&channel=1.1
    const options = request.query;
    const text = options.content;
    const channel = options.channel;
    let num = parseFloat(options.channel);
    const name = Math.trunc(num);
    let user = await userModel.find({ spire_id: { $eq: options.userID } });
    let c = await classModel.find({ class_id: { $eq: name } });
    const message_entry = {
        user: user,
        message: text,
        class: c,
        channel: channel
    }
    const m = new message(message_entry);
    m.save();
    response.send("OK");
});
 
app.post('/createAssignment', async (request, response) => {
    const details = request.query;
    createAssignment(response,
        parseInt(details.month),
        parseInt(details.day),
        parseInt(details.year),
        details.name,
        parseInt(details.assignment_id),
        parseInt(details.class_id));
});
 
app.get('/readDate', async (request, response) => {
    const details = request.query;
    readDate(response,
        parseInt(details.month),
        parseInt(details.day),
        parseInt(details.year));
});
 
app.put('/updateAssignment', async (request, response) => {
    const details = request.query;
    updateAssignment(response,
        parseInt(details.month),
        parseInt(details.day),
        parseInt(details.year),
        details.name,
        parseInt(details.assignment_id),
        parseInt(details.class_id));
});
 
app.delete('/deleteAssignment', async (request, response) => {
    const details = request.query;
    deleteAssignment(response, parseInt(details.assignment_id));
});
 
async function saveUsers() {
    try {
        const data = JSON.stringify(users);
        await writeFile(JSONfile, data, { encoding: 'utf8' });
    } catch (err) {
        console.log(err);
    }
}
async function createUser(response, options) {
    if (options === undefined) {
        response.status(400).json({ error: 'Login Error' });
    } else {
        await reload(JSONfile);
        if (options.spireId in users) {
            response.json({ error: 'spireId already exists' });
        }
        users[options.spireId] = options;
        await saveUsers();
        response.json(options);
    }
}
async function readUser(response, options) {
    if (options === undefined) {
        response.status(400).json({ error: 'Registration Error' });
    } else {
        await reload(JSONfile);
        if (options.spireId in users) {
            if (options.email === users[options.spireId].email && options.password === users[options.spireId].password) {
                response.json(users[options.spireId]);
            }
            else {
                response.status(400).json({ error: "No users found" });
            }
        }
        else {
            response.status(400).json({ error: "Incorrect spireId" });
        }
    }
}
app.post('/registration', async (request, response) => {
    const options = request.body;
    console.log(request.body);
    createUser(response, options);
});
app.get('/login', async (request, response) => {
    const options = request.query;
    console.log(request.query);
    readUser(response, options);
});
 
app.all('*', async (request, response) => {
    response.status(404).send(`Not found: ${request.path}`)
});
let users = [];
const JSONfile = 'users.json';
async function reload(filename) {
    try {
        const data = await readFile(filename, { encoding: 'utf8' });
        users = JSON.parse(data);
    } catch (err) {
        users = {};
    }
}
 
//app.listen(port, () => {
//    console.log(`Server started on http://localhost:${port}`);
//});
 
app.listen(process.env.PORT || 5000,
    () => console.log("Server is running..."))