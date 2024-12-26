import { jwtDecode } from "https://esm.run/jwt-decode";
import {getUserObjectById} from './apiInteractions.js'

let currentUser;
const token = localStorage.getItem('token');
if (!token) {
    // Redirect to login if no token
    window.location.href = 'login.html';
} else {
    // If using jwt-decode library:
    const decoded = jwtDecode(token);
    currentUser= decoded.id;
    

    // Now you can use the userId
    console.log('Current user ID:', currentUser);
}
let userObj;


const searchField = document.getElementById('searchbar');

searchField.addEventListener('keydown', (e) => {
    if (e.key === 'Enter')
        displaySearchResult(searchField.value);
})

document.getElementById('search-button').addEventListener('click', () => {
    displaySearchResult(searchField.value);
})

async function displaySearchResult(term){
    console.log('dajhsfdjsf')
}

async function displayCurrUser(id) {
    // Displays the current username on the left sidebar
const displayUser = document.getElementById('current-user');
userObj = await getUserObjectById(id);
displayUser.innerHTML = userObj.name;


// Displays the current user on the left sidebar
const displayUserPP = document.getElementById('current-user-pp');
displayUserPP.setAttribute('src',userObj.imageUrl);

}

// Displays the current user on the bottom left + store it in a variable
displayCurrUser(currentUser);