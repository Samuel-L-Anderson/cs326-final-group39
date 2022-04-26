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
var class_1_btn = document.getElementById('class-1');
var class_2_btn = document.getElementById('class-2');
var class_3_btn = document.getElementById('class-3');
var class_4_btn = document.getElementById('class-4');



// async function renderClasses(user) {
//     let filteredUser = await message_crud.getUser(user)
//     let class_records = await message_crud.getClasses();
//     let class_id_1 = class_records.filter(item => {
//         return item.class_id.indexOf(filteredUser[0].inClasses[0]) !== -1;
//     });
//     let class_id_2 = class_records.filter(item => {
//         return item.class_id.indexOf(filteredUser[0].inClasses[1]) !== -1;
//     });
//     let class_id_3 = class_records.filter(item => {
//         return item.class_id.indexOf(filteredUser[0].inClasses[2]) !== -1;
//     });
//     let class_id_4 = class_records.filter(item => {
//         return item.class_id.indexOf(filteredUser[0].inClasses[3]) !== -1;
//     });
//     class_1_btn.innerHTML = class_id_1[0].class;
//     class_2_btn.innerHTML = class_id_2[0].class;
//     class_3_btn.innerHTML = class_id_3[0].class;
//     class_4_btn.innerHTML = class_id_4[0].class;
// }

// renderClasses(1);


//FAKE CURRENTLY UNTIL ALL CLASSES ADDED TO DB
const class_mapping = {
    'cs326': 1,
    'cs446': 2,
    'cs365': 3,
    'econ103': 4
}

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

class_1_btn.addEventListener('click', function () {
    curClass.innerHTML = class_1_btn.innerHTML;
    removeAllChildNodes(con);
});

class_2_btn.addEventListener('click', function () {
    curClass.innerHTML = class_2_btn.innerHTML;
    removeAllChildNodes(con);
});

class_3_btn.addEventListener('click', function () {
    curClass.innerHTML = class_3_btn.innerHTML;
    removeAllChildNodes(con);
});

class_4_btn.addEventListener('click', function () {
    curClass.innerHTML = class_4_btn.innerHTML;
    removeAllChildNodes(con);
});


general.addEventListener('click', async (e) => {
    removeAllChildNodes(con);
    curChannel.innerHTML = 'general';
    const cur_class = class_mapping[curClass.innerHTML];
    const num = cur_class + channel_mapping['general'];
    const json = await message_crud.getMessages(num);
    for (const item of json) {
        var messDiv = document.createElement('div');
        // messDiv.setAttribute("style", "width:100%;height:50px;border:1px solid #808080;margin-bottom:5px;");
        messDiv.classList.add("msg-line");
        var messCon = document.createElement("div");
        // messCon.setAttribute("style", "float:left;width:100%;height=30px;overflow:auto;");
        messCon.classList.add("msg");
        messDiv.appendChild(messCon);
        messCon.innerHTML = item;
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
        // messDiv.setAttribute("style", "width:100%%;height:50px;border:1px solid green;margin-bottom:5px;");
        var messCon = document.createElement("div");
        // messCon.setAttribute("style", "float:left;width:100%;height=30px;overflow:auto;");
        messCon.classList.add("msg");
        messDiv.appendChild(messCon);
        messCon.innerHTML = item;
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
        // messDiv.setAttribute("style", "width:100%%;height:50px;border:1px solid #808080;margin-bottom:5px;");
        var messCon = document.createElement("div");
        // messCon.setAttribute("style", "float:left;width:100%;height=30px;overflow:auto;");
        messCon.classList.add("msg");
        messDiv.appendChild(messCon);
        messCon.innerHTML = item;
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
        // messDiv.setAttribute("style", "width:100%%;height:50px;border:1px solid #808080;margin-bottom:5px;");
        var messCon = document.createElement("div");
        // messCon.setAttribute("style", "float:left;width:100%;height=30px;overflow:auto;");
        messCon.classList.add("msg");
        messDiv.appendChild(messCon);
        messCon.innerHTML = item;
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
        // messDiv.setAttribute("style", "width:100%%;height:50px;border:1px solid #808080;margin-bottom:5px;");
        var messCon = document.createElement("div");
        // messCon.setAttribute("style", "float:left;width:100%;height=30px;overflow:auto;");
        messCon.classList.add("msg");
        messDiv.appendChild(messCon);
        messCon.innerHTML = item;
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
        // messDiv.setAttribute("style", "width:100%%;height:50px;border:1px solid #808080;margin-bottom:5px;");
        var messCon = document.createElement("div");
        // messCon.setAttribute("style", "float:left;width:100%;height=30px;overflow:auto;");
        messCon.classList.add("msg");
        messDiv.appendChild(messCon);
        messCon.innerHTML = item;
        con.appendChild(messDiv);
    }
});

btn.addEventListener('click', async (e) => {
    var messDiv = document.createElement("div");
    messDiv.classList.add("msg-line");
    // messDiv.setAttribute("style", "width:100%%;height:50px;border:1px solid #808080;margin-bottom:5px;");
    var messCon = document.createElement("div");
    // messCon.setAttribute("style", "float:left;width:100%;height=30px;overflow:auto;");
    messCon.classList.add("msg");
    messDiv.appendChild(messCon);
    messCon.innerHTML = messCol.value;
    con.appendChild(messDiv);
    const fake_user_ID = 1;
    const cur_class = class_mapping[curClass.innerHTML];
    const cur_channel = channel_mapping[curChannel.innerHTML];
    const json = await message_crud.postMessage(messCol.value, fake_user_ID, (cur_class + cur_channel));
    messCol.value = "";
});