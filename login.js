const BACKEND_URL = 'http://localhost:3000';

async function postUser(formData) {
    try {
        const response = await fetch(`${BACKEND_URL}/user/`, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error("Failed to post");
        }

        const data = await response.json();
        return data;
    } catch(err) {
        console.error('Error posting resource: ', err);
    }
}

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const password = document.getElementById('password').value;
    console.log(password)
    try {
        const response = await fetch('http://localhost:3000/user/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, password }),
        });

        const data = await response.json();
        if (response.ok) {
            console.log('Login successful:', data.token);
            localStorage.setItem('token', data.token);
            window.location.href = 'index.html';
        } else {
            console.error('Login failed:', data.message);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

document.getElementById('create-account-button').addEventListener('click', async (e) =>{
    e.preventDefault();

    const name = document.getElementById('name').value;
    const password = document.getElementById('password').value;
    try{
        const formData = new FormData();
        formData.append('following','[]');
        formData.append('followers','[]');
        formData.append('postHistory','[]');
        formData.append('name',name);
        formData.append('bio','');
        formData.append('stories','[]');
        formData.append('chats','[]');
        formData.append('password',password);
        const response = await postUser(formData);

        console.log('New account created:', response.token);
        localStorage.setItem('token', response.token);
        window.location.href = 'index.html';
    }catch(error){
        console.error('Error: ', error);
    }
})