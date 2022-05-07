const date_element = document.getElementById("date_today");
const month_element = document.getElementById("month");
 
const monthNames = ["January", "February", "March", "April", "May", "June",
 "July", "August", "September", "October", "November", "December"];
 
let today = new Date();
const day = today.getDate();
const month = today.getMonth() + 1;
const year = today.getFullYear();
 
const todayString = month + "/" + day + "/" + year;
 
date_element.innerText = todayString;
month_element.innerText = monthNames[month-1];
 
const createButton = document.getElementById('create');
const updateButton = document.getElementById('update');
const deleteButton = document.getElementById('delete');
 
const dates = document.getElementById("day_wrap")
let daysInMonth = new Date(year, month, 0).getDate();
 
console.log(daysInMonth);
 
 
for(let i = 0; i<daysInMonth; i++)
{
 let dateBox = document.createElement("li");
 dateBox.setAttribute("id", `${i + 1}`);
 let dateText = document.createTextNode(i+1);
 dateBox.appendChild(dateText);
 dates.appendChild(dateBox);
 
 let dateAssignments = await readDate(month, (i+1), year);
 
 dateAssignments.forEach(element=> {
 
   let assignmentDate = element[day];
    if(assignmentDate === (i+1))
   {
     dateBox.className = 'assignment-day';
   }
 });
}
 
dates.addEventListener('click', async (e) => {
 let day_selected = e.target.id;
 const todayString = month + "/" + day_selected + "/" + year;
 date_element.innerText = todayString;
 
 let assignmentData = await readDate(month, day_selected, year);
 
 assignmentData.forEach(element=> {
   const assignmentWrapper = document.getElementById("assignment-wrapper");
   $('#assignment-wrapper div').empty();
 
   const assignmentList = document.getElementById("assignments-ul");
   let assignmentName = element[nameData];
 
   let cell = document.createElement('li');
   let text = document.createTextNode(assignmentName);
   cell.appendChild(text);
   assignmentList.appendChild(cell);
 
  assignmentWrapper.appendChild(assignmentList);
 });
});
 
 
createButton.addEventListener('click', async (e) => {
   const name = window.prompt("Assignment name");
   const user_month = window.prompt("Assignment Month (#)");
   const user_day = window.prompt("Assignment Day");
   const user_assignment_id = window.prompt("Assignment ID");
   const user_class_id = window.prompt("Class ID");
 
   const json = await createAssignment(user_month, user_day, year, name, user_assignment_id, user_class_id);
   alert(`Assignment ${assignment_id} created`);
 });
 
 updateButton.addEventListener('click', async (e) => {
   const name = window.prompt("Assignment name");
   const user_month = window.prompt("Assignment Month (#)");
   const user_day = window.prompt("Assignment Day");
   const user_assignment_id = window.prompt("Assignment ID");
   const user_class_id = window.prompt("Class ID");
 
   const json = await updateAssignment(user_month, user_day, year, name, user_assignment_id, user_class_id);
   alert(`Assignment ${assignment_id} updated`);
 });
 
 
 
 deleteButton.addEventListener('click', async (e) => {
   const user_assignment_id = window.prompt("Assignment ID to delete");
   const json = await deleteAssignment(user_assignment_id);
   alert(`Assignment ${user_assignment_id} deleted`);
 });
 
 
export async function createAssignment(month, day, year, name, assignment_id, class_id) {
   const response = await fetch(`/createAssignment?month=${month}&day=${day}}&year=${year}
                                   &assignment_id=${assignment_id}&class_id=${class_id}`, {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify({month:month, day: day, year: year, name: name, assignment_id: assignment_id, class_id: class_id})
   });
   const data = await response.json();
   return data;
 }
  export async function readDate(month, day, year) {
   try {
     const response = await fetch(`/readDate?month=${month}&day=${day}}&year=${year}`, {
       method: 'GET',
     });
     const data = await response.json();
     return data;
   } catch (err) {
     console.log(err);
   }
 }
  export async function updateAssignment(month, day, year, name, assignment_id, class_id) {
   const response = await fetch(`/updateAssignment?month=${month}&day=${day}}&year=${year}
   &assignment_id=${assignment_id}&class_id=${class_id}`, {
     method: 'PUT',
     body: JSON.stringify({month:month, day: day, year: year, name: name, assignment_id: assignment_id, class_id: class_id}),
     headers: {
       'Content-Type': 'application/json',
     },
   });
   const data = await response.json();
   return data;
 }
  export async function deleteAssignment(assignment_id) {
   const response = await fetch(`/deleteAssignment?assignment_id=${assignment_id}`, {
     method: 'DELETE',
     body: JSON.stringify({ assignment_id:assignment_id }),
     headers: {
       'Content-Type': 'application/json',
     },
   });
   const data = await response.json();
   return data;
 }

