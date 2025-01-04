import { jwtDecode } from "https://esm.run/jwt-decode";
import {getUserObjectById,updateUser} from './apiInteractions.js'

let currentUser;
const token = localStorage.getItem('token');
const selectedUser = localStorage.getItem('selected-user');
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
let selectedUserObj;

const followButton = document.getElementById('follow-button');
followButton.addEventListener('click', async () => {
    // Update follow/unfollow status
    const isUnfollow = followButton.textContent.trim() === 'Unfollow';
    const updatedUser = await updateUser(currentUser, {
        following: selectedUser
    });

    // Update user object and button text
    userObj = updatedUser;
    followButton.textContent = isUnfollow ? 'Follow' : 'Unfollow';
})



async function displayCurrUser(id) {
        // Displays the current username on the left sidebar
    const displayUser = document.getElementById('current-user');
    userObj = await getUserObjectById(id);
    displayUser.innerHTML = userObj.name;
    // Displays the current user on the left sidebar
    const displayUserPP = document.getElementById('current-user-pp');
    displayUserPP.setAttribute('src',userObj.imageUrl);

    // Displays the selected user
    const displaySelUser = document.getElementById('selected-user');
    selectedUserObj = await getUserObjectById(selectedUser);



    displaySelUser.innerHTML = selectedUserObj.name;
    const displaySelUserPP = document.getElementById('selected-user-pp');
    displaySelUserPP.setAttribute('src',selectedUserObj.imageUrl);

    if (userObj.following.includes(selectedUser)){
        followButton.innerHTML = 'Unfollow';
    }else{
        followButton.innerHTML = 'Follow';
    }

}

// Displays the current user on the bottom left + store it in a variable
displayCurrUser(currentUser);