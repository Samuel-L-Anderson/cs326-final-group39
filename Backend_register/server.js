import express from 'express';
import logger from 'morgan';
import { readFile, writeFile } from 'fs/promises';
const app =  express();
app.set('view engine', 'ejs');
// app.use(express.static(__dirname + '/Login'));
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
async function createUser(response,options) {
    if (options === undefined) {
        response.status(400).json({ error: 'Login Error' });
    } else {
        await reload(JSONfile);
        if(options.spireId in users){
            response.json({error:'spireId already exists'});
        }
        users[options.spireId] = options;
        await saveUsers();
        response.json(options);
    }
}
async function readUser(response,options) {
    if (options === undefined) {
        response.status(400).json({ error: 'Registration Error' });
    } else {
        await reload(JSONfile);
        if (options.spireId in users){
            if (options.email === users[options.spireId].email && options.password === users[options.spireId].password){
                response.json(users[options.spireId]);
            }
            else{
                response.status(400).json({error :"No users found"});
            }
        }
        else{
            response.status(400).json({error:"Incorrect spireId"});
        }
    }
}
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/client', express.static('client'));
app.post('/registration',async(request,response) =>{
    const options = request.body;
    console.log(request.body);
    createUser(response,options);
});
app.get('/login',async(request,response) =>{
    const options = request.query;
    console.log(request.query);
    readUser(response,options);
})
const port = 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
// this.app.use('/', express.static('/Registration'));

