import * as message_crud from './message_crud.js'
 
var messCol = document.getElementById("messColumn");
var btn = document.getElementById("comment");
var con = document.getElementById("content");
var general = document.getElementById('general');
var lab = document.getElementById('lab');
var project = document.getElementById('project');
var exam = document.getElementById('exam');
var homework = document.getElementById('homework');
var off_topic = document.getElementById('off topic')
var curChannel = document.getElementById('curChannel');
var curClass = document.getElementById('curDiscussionBoard');
var u = document.getElementById('m-name');
var home = document.getElementById('home');
var out = document.getElementById('logout');
 
curClass.innerHTML = sessionStorage.getItem('class_name');
curClass.style.color = 'white';
 
 
home.addEventListener('click', async (e) => {
    window.location = '/client/dashboard.html';
});
 
async function generateClassMapping() {
    const j = await message_crud.getClasses();
    let mapping = {};
    for (const item of j) {
        mapping[item.title] = item.class_id;
    }
    return mapping;
}
 
const class_mapping = await generateClassMapping();
 
const channel_mapping = {
    'general': 0.1,
    'lab': 0.2,
    'project': 0.3,
    'exam': 0.4,
    'homework': 0.5,
    'off topic': 0.6
}
 
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
 
async function renderMembers(classID) {
    const j = await message_crud.getClassUsers(classID);
    let mem = [];
    for (const item of j) {
        mem.push(item.name);
    }
    return mem;
}
 
const memberArray = await renderMembers(sessionStorage.getItem('classId'));
 
function buildUsers() {
    removeAllChildNodes(u);
    for (const item of memberArray) {
        var userDiv = document.createElement('div');
        userDiv.innerHTML = item;
        u.appendChild(userDiv);
    }
}
 
buildUsers();
 
async function renderInitialMessages() {
    removeAllChildNodes(con);
    curChannel.innerHTML = 'general';
    const cur_class = class_mapping[curClass.innerHTML];
    const num = cur_class + channel_mapping['general'];
    const json = await message_crud.getMessages(num);
    for (const item of json) {
        var messDiv = document.createElement('div');
        messDiv.classList.add("msg-line");
        var messCon = document.createElement("div");
        messCon.classList.add("msg");
        messDiv.appendChild(messCon);
        messCon.innerHTML = item.user[0].name + ": " + item.message;
        con.appendChild(messDiv);
    }
}
 
await renderInitialMessages();
 
 
general.addEventListener('click', async (e) => {
    removeAllChildNodes(con);
    curChannel.innerHTML = 'general';
    const cur_class = class_mapping[curClass.innerHTML];
    const num = cur_class + channel_mapping['general'];
    const json = await message_crud.getMessages(num);
    for (const item of json) {
        var messDiv = document.createElement('div');
        messDiv.classList.add("msg-line");
        var messCon = document.createElement("div");
        messCon.classList.add("msg");
        messDiv.appendChild(messCon);
        messCon.innerHTML = item.user[0].name + ": " + item.message;
        con.appendChild(messDiv);
    }
});
 
lab.addEventListener('click', async (e) => {
    removeAllChildNodes(con);
    curChannel.innerHTML = 'lab';
    const cur_class = class_mapping[curClass.innerHTML];
    const num = cur_class + channel_mapping['lab'];
    const json = await message_crud.getMessages(num);
    for (const item of json) {
        var messDiv = document.createElement('div');
        messDiv.classList.add("msg-line");
        var messCon = document.createElement("div");
        messCon.classList.add("msg");
        messDiv.appendChild(messCon);
        messCon.innerHTML = item.user[0].name + ": " + item.message;
        con.appendChild(messDiv);
    }
});
 
project.addEventListener('click', async (e) => {
    removeAllChildNodes(con);
    curChannel.innerHTML = 'project';
    const cur_class = class_mapping[curClass.innerHTML];
    const num = cur_class + channel_mapping['project'];
    const json = await message_crud.getMessages(num);
    for (const item of json) {
        var messDiv = document.createElement('div');
        messDiv.classList.add("msg-line");
        var messCon = document.createElement("div");
        messCon.classList.add("msg");
        messDiv.appendChild(messCon);
        messCon.innerHTML = item.user[0].name + ": " + item.message;
        con.appendChild(messDiv);
    }
});
 
exam.addEventListener('click', async (e) => {
    removeAllChildNodes(con);
    curChannel.innerHTML = 'exam';
    const cur_class = class_mapping[curClass.innerHTML];
    const num = cur_class + channel_mapping['exam'];
    const json = await message_crud.getMessages(num);
    for (const item of json) {
        var messDiv = document.createElement('div');
        messDiv.classList.add("msg-line");
        var messCon = document.createElement("div");
        messCon.classList.add("msg");
        messDiv.appendChild(messCon);
        messCon.innerHTML = item.user[0].name + ": " + item.message;
        con.appendChild(messDiv);
    }
});
 
homework.addEventListener('click', async (e) => {
    removeAllChildNodes(con);
    curChannel.innerHTML = 'homework';
    const cur_class = class_mapping[curClass.innerHTML];
    const num = cur_class + channel_mapping['homework'];
    const json = await message_crud.getMessages(num);
    for (const item of json) {
        var messDiv = document.createElement('div');
        messDiv.classList.add("msg-line");
        var messCon = document.createElement("div");
        messCon.classList.add("msg");
        messDiv.appendChild(messCon);
        messCon.innerHTML = item.user[0].name + ": " + item.message;
        con.appendChild(messDiv);
    }
});
 
off_topic.addEventListener('click', async (e) => {
    removeAllChildNodes(con);
    curChannel.innerHTML = 'off topic';
    const cur_class = class_mapping[curClass.innerHTML];
    const num = cur_class + channel_mapping['off topic'];
    const json = await message_crud.getMessages(num);
    for (const item of json) {
        var messDiv = document.createElement('div');
        messDiv.classList.add("msg-line");
        var messCon = document.createElement("div");
        messCon.classList.add("msg");
        messDiv.appendChild(messCon);
        messCon.innerHTML = item.user[0].name + ": " + item.message;
        con.appendChild(messDiv);
    }
});
 
btn.addEventListener('click', async (e) => {
    var messDiv = document.createElement("div");
    messDiv.classList.add("msg-line");
    var messCon = document.createElement("div");
    const user_name = await message_crud.getUser(sessionStorage.getItem('userId'));
    const name = user_name.name;
    messCon.classList.add("msg");
    messDiv.appendChild(messCon);
    messCon.innerHTML = name + ": " + messCol.value;
    con.appendChild(messDiv);
    const user_id = sessionStorage.getItem('userId');
    const cur_class = class_mapping[curClass.innerHTML];
    const cur_channel = channel_mapping[curChannel.innerHTML];
    const json = await message_crud.postMessage(messCol.value, user_id, (cur_class + cur_channel));
    messCol.value = "";
});
 
out.addEventListener('click', async (e) => {
    sessionStorage.removeItem('classId');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('class_name');
    window.location = '/client/Login/login.html';
});

