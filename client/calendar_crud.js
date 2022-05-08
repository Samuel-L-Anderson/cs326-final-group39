export async function fetchAssignments(userId) {
    try {
        const response = await fetch(`/assignments?user_id=${userId}`, {
            method: 'GET'
        });
        const data = await response.json();
    } catch(error) {
        console.log(error);
    }
}