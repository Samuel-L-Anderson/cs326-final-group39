/*
For this milestone user ID will be hardcoded, once the database is running then the
user ID will be pulled from the user that is logged in 
*/
export async function fetchDashboard(user) {
    const response = await fetch(`/dashboard?user=${user}`, {
        method: 'GET',
    });
    const data = await response.json();
    return data;
}

export async function dueToday(clas) {
    const response =  await fetch(`/dueToday?clas=${clas}`, {
        method: 'GET',
    });
    const data = await response.json(); 
    return data; 
}

