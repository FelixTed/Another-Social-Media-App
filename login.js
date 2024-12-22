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
            localStorage.setItem('token', data.token); // Store the token for future use
            window.location.href = 'index.html';
        } else {
            console.error('Login failed:', data.message);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
