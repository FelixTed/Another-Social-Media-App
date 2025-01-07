import { jwtDecode } from "https://esm.run/jwt-decode";
import {getUserObjectById, getUserObjectsByName, updateUser} from './apiInteractions.js'

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
    listDiv.innerHTML = '';
    for (const user of userList) {
        if (user._id === currentUser) continue;

        // Determine follow status
        let followStatus = userObj.following.includes(user._id) ? 'Unfollow' : 'Follow';

        // Insert the user element
        listDiv.insertAdjacentHTML('beforeend', `
            <div class="user-list-element" data-user-id="${user._id}">
                <div class="profile">
                    <img class="profile-img" src="${user.imageUrl}" alt="${user.name}">
                    <span>${user.name}</span>
                </div>
                <button class="follow-button">${followStatus}</button>
            </div>
        `);
    }

    listDiv.addEventListener('click', async (event) => {
        const target = event.target;

        // Check if a follow button was clicked
        if (target.classList.contains('follow-button')) {
            const userElement = target.closest('.user-list-element');

            // Update follow/unfollow status
            const isUnfollow = target.textContent.trim() === 'Unfollow';
            const updatedUser = await updateUser(currentUser, {
                following: userElement.dataset.userId
            });

            // Update user object and button text
            userObj = updatedUser;
            target.textContent = isUnfollow ? 'Follow' : 'Unfollow';
        }else if(target.closest('.user-list-element')){
            const userElement = target.closest('.user-list-element');

            localStorage.setItem('selected-user',userElement.dataset.userId)
            window.location.href = 'profile.html';
        }
    });

}

async function displayCurrUser(id) {
    // Displays the current username on the left sidebar
const displayUser = document.getElementById('current-user');
userObj = await getUserObjectById(id);
displayUser.innerHTML = userObj.name;


// Displays the current user on the left sidebar
const displayUserPP = document.getElementById('current-user-pp');
displayUserPP.setAttribute('src',userObj.imageUrl);

displayUser.addEventListener('click', () => {
    window.location.href = 'profileParam.html';
});
displayUserPP.addEventListener('click', () => {
    window.location.href = 'profileParam.html';
});

}

// Displays the current user on the bottom left + store it in a variable
displayCurrUser(currentUser);