import * as crud from './dashboard_crud.js';

//load in class data from database
const classesData = await crud.fetchDashboard();
const numClasses = classesData.length;
console.log(classesData);
console.log(numClasses);

//establish card deck as element for appening to
const cardDeck = document.getElementById('dashDeck');


//dyanmically create card deck;
for (let i = 0; i < numClasses; i++) {
    const card = document.createElement("div");
    card.id = i + 1;
    cardDeck.appendChild(card);
    const a = "<div id='class" + (i + 1) + "' class='card text-white bg-dark mb-3' style='max-width: 18rem; padding: 10px;'>";
    const b = "<div id = 'class_name' class='card-header style='border-color: white;'> Class Name: " + classesData[i].title + "</div>";
    const c = "<div class='card-body'></div>";
    const d = "<h6 id='class_professor' class='card-title ml-2'>Professor: " + classesData[i].professor + "</h6>";
    const e = "<h6 id='class_dueToday' class='card-title ml-2'>Due Today: </h6>";
    const f = "<button id = 'chat" + (i + 1) + "'class = btn btn-outline-danger style = 'border:solid'> Class Chat</button>"
    const g = "</div>";
    card.innerHTML = a + b + c + d + e + f + g;
}

for (let i = 0; i < numClasses; i++) {
    const id = "chat" + (i + 1);
    const chatBut = document.getElementById(id);
    chatBut.addEventListener('click', async (e) => {
        window.location = "/client/message-board.html";
        sessionStorage.setItem("class_name", classesData[i].title);
        console.log(sessionStorage.getItem('class_name'));
        sessionStorage.setItem("userId", 32303431);
        sessionStorage.setItem('classId', classesData[i].class_id);
    });
}

//Navar redirect
const homebut = document.getElementById("home");
homebut.addEventListener('click', async (e) => {
    window.location = "/client/dashboard.html";
});

