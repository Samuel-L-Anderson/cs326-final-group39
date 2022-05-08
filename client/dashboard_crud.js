export async function fetchClass(classId) {
    try {
    const response = await fetch(`/dashboards?class_id=${classId}`, {
        method: 'GET'
    });
    const data = await response.json();
    return data;
    } catch(err) {
        console.log(err);
    }
}
export async function spireID(userId) {
    try { 
        const response = await fetch(`/spireID?user_id=${userId}`, {
            method: 'GET'
        });
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err);
    }
}


export async function fetchUpcomingAssignments(userId) {
    try { 
        const response = await fetch(`/upcomingAssignments?user_id=${userId}`, {
            method: 'GET'
        });
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err);
    }
}


export async function fetchClassIds(userId) {
    try {
        const response = await fetch(`/classIds?user_id=${userId}`, {
            method: 'GET'
        });
        const data = await response.json();
        console.log("here");
        console.log(data);
        return data;
    } catch (err) {
        console.log("here");
        console.log(err);
    }
}

export async function fetchAssignments(userId) {
    try {
        const response = await fetch(`/assignments?user_id=${userId}`, {
            method: 'GET'
        });
        const data = await response.json();
        return data; 
    } catch(error) {
        console.log(error);
    }
}

