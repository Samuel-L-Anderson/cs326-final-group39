
import * as crud from './dashboard_crud.js';

//load in class data from database
const classesData = await crud.fetchDashboard();
const numClasses = classesData.length;

//load in upcoming assignments from database 
const upcoming = await crud.fetchUpcomingAssignments();
console.log(upcoming);

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

//dyanmically create card deck;
for (let i = 0; i < numClasses; i++) {
    const card = document.createElement("div");
    card.id = i + 1; 
    cardDeck.appendChild(card);
    const a = "<div id='class" + (i+1) + "' class='card text-white bg-dark mb-3' style='max-width: 18rem; padding: 10px;'>";
    const b = "<div id = 'class_name' class='card-header style='border-color: white;'> Class Name: " + classesData[i].title + "</div>";
    const c = "<div class='card-body'></div>";
    const d = "<h6 id='class_professor' class='card-title ml-2'>Professor: " + classesData[i].professor+ "</h6>";
    const e = "<h6 id='class_dueToday' class='card-title ml-2'>Due Today: </h6>";
    const f = "<button id='chat" + (i + 1) + "' class=btn btn-outline-danger style = 'border:solid'> Class Chat</button>"
    const g = "</div>";
    card.innerHTML = a + b + c + d + e + f + g;
}

//Add event listeners for chat buttons 
for (let i = 0; i < numClasses; i++) {
    const id = "chat" + (i+1);
    const chatBut = document.getElementById(id);
    chatBut.addEventListener('click', async(e) => {
        window.location = "/client/message-board.html";
        sessionStorage.setItem("class_name", classesData[i].title);
        console.log(sessionStorage.getItem('class_name'));
        sessionStorage.setItem("userId", 32303431);
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
    window.location = "/client/dashboard.html";
});

