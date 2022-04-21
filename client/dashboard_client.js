
import * as crud from './dashboard_crud.js';

//static for fake data but dynamic once database is up 
//Class 1
const class1_name = document.getElementById('class1_name');
const class1_prof = document.getElementById('class1_professor');
const class1_dT = document.getElementById('class1_dueToday');
const class1_Cal = document.getElementById('class1_calendar');
const class1_Chat = document.getElementById('class1_chat');

//Class 2
const class2_name = document.getElementById('class2_name');
const class2_prof = document.getElementById('class2_professor');
const class2_dT = document.getElementById('class2_dueToday');
const class2_Cal = document.getElementById('class2_calendar');
const class2_Chat = document.getElementById('class2_chat');

//class 3
const class3_name = document.getElementById('class3_name');
const class3_prof = document.getElementById('class3_professor');
const class3_dT = document.getElementById('class3_dueToday');
const class3_Cal = document.getElementById('class3_calendar');
const class3_Chat = document.getElementById('class3_chat');

//class 4
const class4_name = document.getElementById('class4_name');
const class4_prof = document.getElementById('class4_professor');
const class4_dT = document.getElementById('class4_dueToday');
const class4_Cal = document.getElementById('class4_calendar');
const class4_Chat = document.getElementById('class4_chat');


//Loading Class Information 
//userID static from fake data until database running
async function loadDashboard() {
    const classesData = await crud.fetchDashboard('1');
    console.log(classesData);
    const dueToday1 = await crud.dueToday('1');
    const class1JSON = classesData[0];
    console.log(class1JSON);
    class1_name.innerHTML = class1JSON.class;
    class1_prof.innerHTML = class1JSON.professor;
    class1_dT.innerHTML = (dueToday1 === undefined) ? "N/A" : dueToday1.month + "/" + dueToday1.day + "/" + dueToday1.year;

    const dueToday2 = await crud.dueToday('2');
    const class2JSON = classesData[1];
    class2_name.innerHTML = class2JSON.class;
    class2_prof.innerHTML = class2JSON.professor;
    class2_dT.innerHTML = (dueToday2 === undefined) ? "N/A" :dueToday2.month + "/" + dueToday2.day + "/" + dueToday2.year;

    const dueToday3 = await crud.dueToday('3');
    const class3JSON = classesData[2];
    class3_name.innerHTML = class3JSON.class;
    class3_prof.innerHTML = class3JSON.professor;
    class3_dT.innerHTML = (dueToday3 === undefined) ? "N/A" :dueToday3.month + "/" + dueToday3.day + "/" + dueToday3.year;

    const dueToday4 = await crud.dueToday('4');
    const class4JSON = classesData[3];
    console.log(class4JSON);
    class4_name.innerHTML = class4JSON.class;
    class4_prof.innerHTML = class4JSON.professor;
    class4_dT.innerHTML = (dueToday4 === undefined) ? "N/A" :dueToday4.month + "/" + dueToday4.day + "/" + dueToday4.year;
}

loadDashboard();