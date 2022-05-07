export async function fetchDashboard() {
    try {
    const response = await fetch(`/dashboard`, {
        method: 'GET'
    });
    const data = await response.json();
    return data;
    } catch(err) {
        console.log(err);
    }
}

export async function fetchUpcomingAssignments() {
    try { 
        const response = await fetch(`/upcomingAssignments?user_id=${userID}`, {
            method: 'GET'
        });
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err);
    }
}

