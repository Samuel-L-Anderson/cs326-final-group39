import * as crud from './crud_reg.js';
const email = document.getElementById("email");
const password = document.getElementById("password");
const re_password = document.getElementById("re-password");
const spire_id = document.getElementById("spireid");
const sign_up = document.getElementById("sign_up");
sign_up.addEventListener("click",(e) => e.preventDefault());
sign_up.addEventListener("click", async(e) =>{
    console.log(email.value);
    console.log(password.value);
    console.log(spire_id.value);
    const json = await crud.createUser(email.value,password.value,spire_id.value);
    if(json != {}){
        alert("user created!");
    }
})