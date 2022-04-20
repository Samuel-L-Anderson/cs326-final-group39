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
const USER_FILE = 'user_records.json'

//Dashboard

let user_records = [{ name: 'Joe', instructor: 'False', user_id: '1', inClasses: [1, 2]},
{ name: 'Jeff', instructor: "False", user_id: '2', inClasses: [1, 3]}];

let class_records = [{ class: 'cs326', studentcount: '187', class_id: '1' , professor: 'Tim Richards'},
{ class: 'cs446', studentcount: '146', class_id: '2' }, { class: 'cs365', studentcount: '90', id: '3' },
{ class: 'econ103', studentcount: '250', id: '4' }];

let assignment_records = [{class_id: '3', day: '20', month: '3', year: '2022', assignment_name: 'homework 5', assignment_id: '7'}];
​

/*
WILL BE USED ONCE DATA BASE IS BEING USED
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
*/

app.get('/dashboard', async (request, response) => {
    const options = request.query; 
    const user = options.user;
    const classesArr = user_records.filter(item => item.user_id === user)[0].inClasses;
    let userClasses = class_records.filter(item => classesArr.includes(item.class_id));
    console.log(userClasses);
    response.send(userClasses);
})

app.get('/dueToday', async (request, response) =>{
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



app.all('*', async (request, response) => {
    response.status(404).send(`Not found: ${request.path}`)
});
​
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});