export async function createUser(email,password,spireId) {
    console.log(email);
    console.log(password);
    console.log(spireId);
    const response = await fetch(`/registration`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email:email,password:password,spireId:spireId }),
      });
    const data = await response.json();
    return data;
}