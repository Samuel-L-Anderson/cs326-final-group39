import express from 'express'; 
import { readFile, writeFile } from 'fs/promises';
import logger from 'morgan';

​
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use('/public', express.static("public"));
​
const MESSAGE_FILE = 'messages.json'
const CLASS_FILE = 'classes.json'
const USER_FILE = 'users.json'

//Dashboard

let user_records = [{ name: 'Joe', instructor: 'False', id: '1', inClasses: '[1, 2]'},
{ name: 'Jeff', instructor: "False", id: '2', inClasses: '[1, 3]'}];

let class_records = [{ class: 'cs326', studentcount: '187', id: '1' },
{ class: 'cs446', studentcount: '146', id: '2' }, { class: 'cs365', studentcount: '90', id: '3' },
{ class: 'econ103', studentcount: '250', id: '4' }];
​
//Unsure if needed, are we going to add classes or is that going to be static?
async function reloadClasses() {
    try {
        const data = await readFile(CLASS_FILE, { encoding: 'utf8' });
        class_records = JSON.parse(data);
    } catch (err) {
        class_records = [];
    }
}

//Unsure if needed, are we going to add classes or is that going to be static?
async function saveClasses() {
    try {
        const data = JSON.stringify(class_records);
        await writeFile(CLASS_FILE, data, { encoding: 'utf8' });
    } catch(err) {
        class_records = [];
    }
}


app.get('/dashboard', async (request, response) => {
    const options = request.query; 
    const classesArr = options.user.inClasses;
    let userClasses = class_records.filter(item => classesArr.includes(item.id));
    console.log(userClasses);
    response.sent(userClasses);
})


//WE could use get DATE from caldnera API instead, this would make our work a lot easier and it is
//ultimately a design choice. 
app.get('/dashboard/class/calendar/nextAssignment', async(request, response) => {
    const options = request.query; 

});
​


app.all('*', async (request, response) => {
    response.status(404).send(`Not found: ${request.path}`)
});
​
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});