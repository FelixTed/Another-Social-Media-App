const BACKEND_URL = 'https://another-social-media-api.onrender.com';

async function postUser(formData) {
    try {
        const response = await fetch(`${BACKEND_URL}/user/`, {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to post');
        }

        return data;
    } catch (err) {
        console.error('Error posting resource:', err);
        throw err;
    }
}

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const password = document.getElementById('password').value;
    console.log(password)
    try {
        const response = await fetch(`${BACKEND_URL}/user/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, password }),
            credentials:'include',
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
        if (response.token) {
            console.log('New account created:', response.token);
            localStorage.setItem('token', response.token);
            window.location.href = 'index.html';
        } else {
            console.error('Account creation failed:', response.message);
            alert(response.message); 
        } 
    }catch(error){
        console.error('An unexpected error occurred:', error.message);
        alert(error.message);
    }
})