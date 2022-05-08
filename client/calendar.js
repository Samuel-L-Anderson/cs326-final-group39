import * as crud from './dashboard_crud.js';
//get userId from session storage 
const userId = sessionStorage.getItem("userId");
//load in assignments
const assignments = await crud.fetchAssignments(32303431);
//set current date 
const curDate = new Date();
let curMonth = curDate.getMonth();
let curYear = curDate.getFullYear();
const daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const curMonthDays = daysInMonths[curMonth];

function findAssignments(date) {
  const asnArr = [];
  for (let i = 0; i < assignments.length; i++) {
    if (new Date(assignments[i].date).toDateString() === date.toDateString()) {
      asnArr.push(assignments[i]);
    }
  }
  return asnArr;
}

function loadCalendar(month) {
  //clear calendar 
  for (let i = 1; i < 43; i++) {
    const elem = document.getElementById(i);
    elem.innerHTML=" ";
  }
  document.getElementById('displayClass').innerHTML = "";
  document.getElementById('displayName').innerHTML = "";
  document.getElementById('displayDate').innerHTML = "";
  //load month Name
  if (month > 11) {
    curMonth = month % 12; 
    curYear++;
  } else if (month < 0) {
    curMonth = 11; 
    curYear--; 
  } else {
    curMonth = month; 
  }
  const monthName = document.getElementById('curMonth');
  monthName.innerHTML = monthNames[curMonth] + " " + curYear;

  //fill in month from beginning
  const monthStr = curMonth + 1; 
  const start = new Date(monthStr + "/01/" +  curYear);
  let counter = 1; 
  for (let i = (start.getDay() + 1); counter < daysInMonths[curMonth] + 1; i++) {  
    const daySquare = document.getElementById(i);
    const arr = findAssignments(new Date(monthStr + "/" + counter + "/" + curYear));
    if (arr.length > 0) {
      daySquare.innerHTML = "<button id='day" + counter + "'class='btn btn-success'>" + counter +  "</button>";
    } else {
      daySquare.innerHTML = "<button id='day" + counter + "'class='btn btn-outline-light'>" + counter +  "</button>";
    }
    counter++;
  }

  //adding event listeners 
  for (let i = 1; i < daysInMonths[curMonth] + 1; i++) {
    const ds = "day" + i;
    const but = document.getElementById(ds);
    but.addEventListener('click', async(e) => {
      const arr = findAssignments(new Date(monthStr + "/" + i + "/" + curYear));
      document.getElementById('displayClass').innerHTML = (arr.length > 0) ? arr[0].class_id : "";
      document.getElementById('displayName').innerHTML = (arr.length > 0) ? arr[0].name : "";
      document.getElementById('displayDate').innerHTML = (arr.length > 0) ? arr[0].date : "";
    });
  }
}




//previous month
const prevMonth = document.getElementById('prev');
prevMonth.addEventListener('click', async(e) => {
  loadCalendar(curMonth - 1);
});

const nextMonth = document.getElementById('next');
nextMonth.addEventListener('click', async(e) => {
  loadCalendar(curMonth + 1);
});

//Navar redirect 
const homebut = document.getElementById("home");
homebut.addEventListener('click', async(e) => {
    window.location = "/client/dashboard.html";
});

const logbut = document.getElementById("logout");
logbut.addEventListener('click', async(e) => {
  sessionStorage.removeItem("userId");
  sessionStorage.removeItem("class_name");
  sessionStorage.removeItem("classId");
  window.location = "/client/Login/login.html";
});




//load calendar off start
loadCalendar(curMonth);



