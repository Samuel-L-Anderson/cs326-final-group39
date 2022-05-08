
import * as crud from './dashboard_crud.js';

//getting current userId
const userId = sessionStorage.getItem("userId");
const id  = await crud.spireID(1234);
console.log(id);
const spireUserData = await crud.fetchClassIds(id);
const classIdArr = spireUserData.class_ids;

//load in class data from database
const classesData = [];
for (let i = 0; i < classIdArr.length; i++) {
    const elem = await crud.fetchClass(classIdArr[i]);
    classesData.push(elem);
}
const numClasses = classesData.length;

console.log(classesData);

//load in upcoming assignments from database 
const upcoming = await crud.fetchUpcomingAssignments(id);


//establish card deck as element for appening to 
const cardDeck = document.getElementById('dashDeck');

//finding class from class id
function getClassName(id) {
    for (let i = 0; i < numClasses; i++) {
        if (classesData[i].class_id === id) {
            return classesData[i].title; 
        }
    }
}

function getDueToday(id) {
    const curDate = new Date()
    curDate.setHours(0, 0, 0, 0);
    for (let i = 0; i < upcoming.length; i++) {
        if (new Date(upcoming[i].date).toDateString() == curDate.toDateString() && upcoming[i].class_id === id) {
            return upcoming[i].name;
        } 
    }
}

//dyanmically create card deck;
for (let i = 0; i < numClasses; i++) {
    const card = document.createElement("div");
    card.id = i + 1; 
    cardDeck.appendChild(card);
    const a = "<div id='class" + (i+1) + "' class='card text-white bg-dark mb-3' style='max-width: 18rem; padding: 10px;'>";
    const b = "<div id = 'class_name' class='card-header style='border-color: white;'> Class Name: " + classesData[i].title + "</div>";
    const c = "<div class='card-body'></div>";
    const d = "<h6 id='class_professor' class='card-title ml-2'>Professor: " + classesData[i].professor+ "</h6>";
    const dt = (getDueToday(classesData[i].class_id) === undefined) ? "N/A" : getDueToday(classesData[i].class_id);
    const e = "<h6 id='class_dueToday' class='card-title ml-2'>Due Today: " + dt + "</h6>";
    const f = "<button id='chat" + (i + 1) + "'class='btn btn-outline-light'> Class Chat</button>"
    const g = "</div>";
    card.innerHTML = a + b + c + d + e + f + g;
}

//Add event listeners for chat buttons 
for (let i = 0; i < numClasses; i++) {
    const id = "chat" + (i+1);
    const chatBut = document.getElementById(id);
    chatBut.addEventListener('click', async(e) => {
        window.location = "/message-board";
        sessionStorage.setItem("class_name", classesData[i].title);
        sessionStorage.setItem("classId", classesData[i].class_id);
        sessionStorage.setItem("userId", id);
    });
}

const calPrev = document.getElementById('calprev');

//Add upcoming assignments 
for (let i = upcoming.length - 1; i  >= 0; i--) {
    const row = document.createElement("div");
    row.id = i + 1;
    calPrev.appendChild(row);
    //get class name from id 
    const cName = getClassName(upcoming[i].class_id);
    const a = "<div class='row'>";
    const b = "<div class='col' style='text-align: center; border: solid;'>" + cName + "</div>";
    const c =  "<div class='col-6' style=' text-align: center; border: solid;'>" + upcoming[i].name + "</div>";
    const d = "<div class='col' style=' text-align: center; border: solid;'>" + upcoming[i].date + "</div>";
    const e = "</div>";
    row.innerHTML = a + b + c + d + e; 
}


//Navar redirect 
const homebut = document.getElementById("home");
homebut.addEventListener('click', async(e) => {
    window.location = "/dashboard";
});

//logoutredirect
const logoutBut = document.getElementById("logout");
logoutBut.addEventListener('click', async(e) => {
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("class_name");
    sessionStorage.removeItem("classId");
    window.location = "/login";
}); 

//Cal redirect 
const calBut = document.getElementById("calLink");
calBut.addEventListener('click', async(e) => {
    sessionStorage.setItem("userId", userId);
    window.location = "/calendar";
});
