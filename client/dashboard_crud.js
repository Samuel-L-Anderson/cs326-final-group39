/*
For this milestone user ID will be hardcoded, once the database is running then the
user ID will be pulled from the user that is logged in 
*/
export async function fetchDashboard(user) {
    try {
    const response = await fetch(`/dashboard?user=${user}`, {
        method: 'GET'
    });
    const data = await response.json();
    return data;
    } catch(err) {
        console.log(err);
    }
}

export async function dueToday(clas) {
    try {
    const response =  await fetch(`/dueToday?clas=${clas}`, {
        method: 'GET'
    });
    const data = await response.json(); 
    return data; 
    } catch(err) {
        console.log(err);
    }
}

