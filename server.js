import express from 'express';
import { readFile, writeFile } from 'fs/promises';
import logger from 'morgan';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use('/public', express.static("public"));

const MESSAGE_FILE = 'messages.json'
const CLASS_FILE = 'classes.json'
const USER_FILE = 'user_records.json'

//CLASSES ORDERED BY ID 1-4 etc
//CHANNELS ORDERED BY ID 1.1-1.6 etc

let class_records = [{ class: 'cs326', studentcount: '187', class_id: '1', professor: 'Tim Richards' },
{ class: 'cs446', studentcount: '146', class_id: '2', professor: '' }, { class: 'cs365', studentcount: '90', class_id: '3', professor: '' },
{ class: 'econ103', studentcount: '250', class_id: '4', professor: '' }];

let user_records = [{ name: 'Joe', instructor: 'False', user_id: '1', inClasses: [1, 2, 3, 4] },
{ name: 'Jeff', instructor: "False", user_id: '2', inClasses: [1, 2, 3, 4] }];

let message_records = [];

async function reloadMessages() {
    try {
        const data = await readFile(MESSAGE_FILE, { encoding: 'utf8' });
        message_records = JSON.parse(data);
    } catch (err) {
        message_records = [];
    }
}

async function saveMessages() {
    try {
        const data = JSON.stringify(message_records);
        await writeFile(MESSAGE_FILE, data, { encoding: 'utf8' });
    } catch (err) {
        message_records = [];
    }
}

app.get('/class', async (request, response) => {
    //http://localhost:3000/class?class=cs326
    //Retrieves information of class, i.e. student count, id
    const options = request.query;
    let filteredClass = class_records.filter(item => {
        return item.class.indexOf(options.class) !== -1;
    });
    response.send(filteredClass);
});

app.get('/classes', async (request, response) => {
    //http://localhost:3000/classes
    //Retrieves all classes and info
    response.send(class_records);
})

app.get('/class/message', async (request, response) => {
    //http://localhost:3000/class/message?class=cs446
    //Retrieve all messages associated with class
    await reloadMessages();
    const options = request.query;
    let temp_messages = message_records;
    let filteredMessages = temp_messages.filter(item => {
        let this_class = item.class[0].class;
        return this_class.indexOf(options.class) !== -1;
    });
    let ret = [];
    for (const item of filteredMessages) {
        ret.push(item['message']);
    }
    response.send(ret);
});

app.get('/class/channel/message', async (request, response) => {
    //http://localhost:3000/class/channel/message?channel=1.2
    //Retrieves messages associated with channel and class
    await reloadMessages();
    const options = request.query;
    let temp_messages = message_records;
    let filteredMessages = temp_messages.filter(item => {
        return item.channel.indexOf(options.channel) !== -1;
    });
    let ret = []
    for (const item of filteredMessages) {
        ret.push(item['message']);
    }
    response.send(ret);
});


app.get('/user', async (request, response) => {
    //http://localhost:3000/user?user_id=1
    //Retrieve by ID => name not unique
    const options = request.query;
    let filteredUser = user_records.filter(item => {
        return item.user_id.indexOf(options.user_id) !== -1;
    });
    response.send(filteredUser);
});

app.post('/message', async (request, response) => {
    //http://localhost:3000/message?content=this%20is%20a%20message&userID=1&channel=1.1
    await reloadMessages();
    const options = request.query;
    const text = options.content;
    const user = user_records.filter(item => {
        return item.user_id.indexOf(options.userID) !== -1;
    });
    let num = parseFloat(options.channel);
    const name = Math.trunc(num);
    let n = class_records.filter(item => {
        return item.class_id.indexOf(name) !== -1;
    });
    const channel = options.channel;
    const message_entry = {
        user: user,
        message: text,
        class: n,
        channel: channel
    }
    message_records.push(message_entry);
    saveMessages();
    response.send(message_entry);
});

app.all('*', async (request, response) => {
    response.status(404).send(`Not found: ${request.path}`)
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});