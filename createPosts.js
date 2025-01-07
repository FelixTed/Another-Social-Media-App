import { jwtDecode } from "https://esm.run/jwt-decode";
import { updateUser,getUserObjectById,postPost, postStory } from "./apiInteractions.js";

//You want to be logged in as a current user, this will be expanded upon later when API is done
//You want to be logged in as a current user, this will be expanded upon later when API is done
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
let postType = 'story';

// Add content to database
async function publishContent() {
    const imageToAdd = document.getElementById('image');
    const currDate = new Date();
    
    if (!imageToAdd.files[0]) {
        console.error('No file selected');
        return;
    }

    const formData = new FormData();
    formData.append('content', imageToAdd.files[0]);
    
    if (postType === 'story') {
        formData.append('ownerId', currentUser);
        formData.append('date', currDate.toString());
        const newStory = await postStory(formData);
        await updateUser(currentUser,{stories:newStory._id});
    } else if (postType === 'post') {
        const captionToAdd = document.getElementById('caption').value;
        formData.append('ownerId', currentUser);
        formData.append('caption', captionToAdd);
        formData.append('likes', '0');
        formData.append('comments', '[]');
        formData.append('likedBy', '[]'); 
        formData.append('date', currDate.toString());
        const newPost = await postPost(formData);
        await updateUser(currentUser,{postHistory:newPost._id});
    }
}


//Controls the type of content to post depending on Story/Post Checkbox
const contentTypeCheckBox = document.getElementById('toggle');
const captionDiv = document.getElementById('insert-caption-div');
contentTypeCheckBox.addEventListener('change', () => {
    if(contentTypeCheckBox.checked){
        postType = 'post';
        captionDiv.style.display ='flex';
    }else{
        postType = 'story';
        captionDiv.style.display = 'none';
    }
});

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
    setupPage();

}

// Displays the current user on the bottom left + store it in a variable
displayCurrUser(currentUser);

function setupPage(){
    // Publish content
    const publishButton = document.getElementById('publish-button');
    publishButton.addEventListener('click', () => {console.log(publishContent())});
}

