export async function getUser(email,password,spireId) {
    console.log(email);
    console.log(password);
    console.log(spireId);
    const response = await fetch(`/login?email=${email}&password=${password}&spireId=${spireId}`, {
    method: 'GET'});
    const data = await response.json();
    return data;
}
