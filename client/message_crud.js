export async function postMessage(content, userID, channel) {
    const response = await fetch(`/message?content=${content}&userID=${userID}&channel=${channel}`, {
        method: 'POST'
    });
    const data = await response.json();
    return data;
}

export async function getMessages(channel) {
    try {
        const response = await fetch(`/class/channel/message?channel=${channel}`, {
            method: 'GET'
        });
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err);
    }
}

export async function getUser(userID) {
    try {
        const response = await fetch(`/user?user_id=${userID}`, {
            method: 'GET'
        });
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err);
    }
}

export async function getClasses() {
    try {
        const response = await fetch(`/classes`, {
            method: 'GET'
        });
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err);
    }
}

export async function getClassUsers(classID) {
    try {
        const response = await fetch(`/class/user?class_id=${classID}`, {
            method: 'GET'
        });
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err);
    }
}