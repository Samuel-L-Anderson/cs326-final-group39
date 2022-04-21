import express from 'express';
import { readFile, writeFile } from 'fs/promises';
import logger from 'morgan';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use('/client', express.static("client"));

const MESSAGE_FILE = 'messages.json'
const CLASS_FILE = 'classes.json'
const USER_FILE = 'user_records.json'

//CLASSES ORDERED BY ID 1-4 etc
//CHANNELS ORDERED BY ID 1.1-1.6 etc

let class_records = [{ class: 'cs326', studentcount: '187', class_id: '1', professor: 'Tim Richards' },
{ class: 'cs446', studentcount: '146', class_id: '2', professor: "Tom Brady" }, { class: 'cs365', studentcount: '90', class_id: '3', professor: "Bobby Oar" },
{ class: 'econ103', studentcount: '250', class_id: '4', professor: "Mac Jones" }];

let user_records = [{ name: 'Joe', instructor: 'False', user_id: '1', inClasses: [1, 2, 3, 4] },
{ name: 'Jeff', instructor: "False", user_id: '2', inClasses: [1, 2, 3, 4] }];

let assignment_records = [{ class_id: '3', day: '20', month: '3', year: '2022', assignment_name: 'homework 5', assignment_id: '7' }];

let message_records = [];

app.get('/dashboard', async (request, response) => {
    console.log("hello from server");
    const options = request.query;
    const user = options.user;
    let tempUserRecords = user_records;
    let tempClassRecords = class_records;
    const classesArr = tempUserRecords.filter(item => item.user_id === user)[0].inClasses;
    console.log(classesArr);
    let userClasses = class_records;
    console.log(userClasses);
    response.send(userClasses);
})

app.get('/dueToday', async (request, response) => {
    const options = request.query;
    const class_id = options.id;
    const current = new Date();
    let dueToday = assignment_records.filter(item => (
        class_id === item.class_id &&
        item.day === current.getDay() &&
        item.month === current.getMonth() &&
        item.year === current.getFullYear()
    ));
    const returnVal = (dueToday.length > 0) ? dueToday[0].assignment_name : "N/A";
    console.log(returnVal);
    response.send(returnVal);
});

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

let assignments = [];

const assignmentFiles = 'assignment.json';

async function reloadAssignments(filename) {
    try {
        const data = await readFile(filename, { encoding: 'utf8' });
        assignments = JSON.parse(data);
    } catch (err) {
        assignments = [];
    }
}

async function saveAssignments() {
    try {
        const data = JSON.stringify(assignments);
        await writeFile(assignmentFiles, data, { encoding: 'utf8' });
    } catch (err) {
        console.log(err);
    }
}

async function assignmentExists(assignment_id) {
    if (assignments.filter(x => x['assignment_id'] === assignment_id).length > 0) {
    }
}

function getAssignmentIndex(assignment_id) {
    const index = assignments.map(object => object['assignment_id']).indexOf(assignment_id);
    return index;
}


async function createAssignment(response, month, day, year, name, assignment_id, class_id) {
    if (assignment_id === undefined) {
        // 400 - Bad Request
        response.status(404).json({ error: `Assignment could not be created` });
    }
    else {
        await reloadAssignments(assignmentFiles);
        let newAssignment = {
            "month": month,
            "day": day,
            "year": year,
            "name": name,
            "assignment_id": assignment_id,
            "class_id": class_id
        };
        assignments.push(newAssignment);
        await saveAssignments();
        response.json({ month: month, day: day, year: year, name: name, assignment_id: assignment_id, class_id: class_id });
    }
}

async function readDate(response, month, day, year) {
    await reloadAssignments(assignmentFiles);
    let assignmentDates = [];
    if (!(month === undefined || day === undefined || year === undefined)) {
        for (let i = 0; i < assignments.length; i++) {
            assignmentDates = assignments.filter(x => x['day'] === day &&
                x['month'] === month &&
                x['year'] === year);
        }
        response.json({ day: day, month: month, year: year, assignments: assignmentDates });
    } else {
        // 404 - Not Found
        response.json({ error: `No Assignments on '${month}' ${day}, ${year}` });
    }
}

async function updateAssignment(response, month, day, year, name, assignment_id, class_id) {
    await reloadAssignments(assignmentFiles);
    if (assignmentExists(assignment_id)) {
        const index = getAssignmentIndex(assignment_id);
        assignments[index] = {
            "month": month,
            "day": day,
            "year": year,
            "name": name,
            "assignment_id": assignment_id,
            "class_id": class_id
        };
        await saveAssignments();
        response.json({ month: month, day: day, year: year, name: name, assignment_id: assignment_id, class_id: class_id });
    } else {
        // 404 - Not Found
        response.status(404).json({ error: `Assignment '${name}' Not Found` });
    }
}

async function deleteAssignment(response, assignment_id) {
    await reloadAssignments(assignmentFiles);
    if (assignmentExists(assignment_id)) {
        const index = getAssignmentIndex(assignment_id);
        assignments.splice(index, 1);
        await saveAssignments();
        response.json({ id: assignment_id });
    } else {
        // 404 - Not Found
        response.status(404).json({ error: `Assignment '${assignment_id}' Not Found` });
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

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
