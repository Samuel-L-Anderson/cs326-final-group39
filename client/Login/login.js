import * as crud from './crud_login.js';
const email = document.getElementById("email");
const password = document.getElementById("password");
const spire_id = document.getElementById("spireId");
const submit = document.getElementById("submit");
submit.addEventListener("click",(e) => e.preventDefault());
submit.addEventListener("click", async(e) =>{
    console.log(email.value);
    console.log(password.value);
    console.log(spire_id.value);
    const json = await crud.getUser(email.value,password.value,spire_id.value);
    console.log(json);
    if(json != {}){
        alert("user returned!");
    }
})