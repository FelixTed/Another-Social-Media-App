import { jwtDecode } from "https://esm.run/jwt-decode";
import {getUserObjectById, getUserObjectsByName} from './apiInteractions.js'

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
  
    if(!term){
        alert('You need to enter at least one character to search')
        return
    }
    const userList = await getUserObjectsByName(term);
    const listDiv = document.getElementById("search-result")
    for (const user of userList){
        listDiv.insertAdjacentHTML('beforeend',`
            <div class="user-list-element">
                <div class="profile">
                    <img id="current-user-pp" class="profile-img" src=${user.imageUrl}>
                    <span id="current-user">${user.name}</span>
                </div>
                <button class="follow-button">Follow</button>
            </div>
            `);
    }
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