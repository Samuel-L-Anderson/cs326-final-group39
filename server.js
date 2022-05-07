import express from 'express';
import logger from 'morgan';
import mongoose from 'mongoose';
import dotenv from 'dotenv'

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use('/client', express.static("client"));

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

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

app.get('/dashboard', async (request, response) => {
    classModel.find({})
        .then((data) => {
            response.send(data);
        })
        .catch((error) => {
            console.log('error: ', error);
        });
})


app.get('/class', async (request, response) => {
    //http://localhost:3000/class?class=cs326
    //Retrieves information of class, i.e. student count, id
    const options = request.query;
    classModel.find({ "classid": options.classid })
        .then((data) => {
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
})

app.get('/class/message', async (request, response) => {
    //http://localhost:3000/class/message?class_id=cs446
    //Retrieve all messages associated with class
    const options = request.query;
    message.find({ "class.class_id": { $eq: options.class_id } }, { message: 1, _id: 0 })
        .then((data) => {
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
    message.find({ "channel": { $eq: options.channel } })
        .then((data) => {
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

app.all('*', async (request, response) => {
    response.status(404).send(`Not found: ${request.path}`)
});

app.listen(process.env.PORT || 5000,
    () => console.log("Server is running..."));
