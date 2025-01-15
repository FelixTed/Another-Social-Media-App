import { jwtDecode } from "https://esm.run/jwt-decode";
import { getUserObjectById,getStoryObjectById,getPostObjectById,getCommentObjectById,postComment,updatePost } from "./apiInteractions.js";


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
const postContainer = document.getElementById('post-container');
let loadedPosts = 0;
let postsPerLoads = 10;

async function returnPosts(){
   // Collect all posts from followed users
   let postsOnFeed = [];
   
    for(const userId of userObj.following){
       const followedUser = await getUserObjectById(userId);
       if (followedUser) {
           for (const postId of followedUser.postHistory){
               const post = await getPostObjectById(postId);
               if (post) {
                   postsOnFeed.push(post);
               }
           }
       }
   }
    // Sort by descending order based on the date
    postsOnFeed.sort((a, b) => new Date(b.date) - new Date(a.date));
    // Get the next set of posts
    const newPosts = postsOnFeed.slice(loadedPosts, loadedPosts + postsPerLoads);
    for(const post of newPosts){
        renderPosts(post);
    }
    // Update the count of loaded posts
    loadedPosts += newPosts.length;

    // Stop loading if all posts are loaded
    if (loadedPosts >= postsOnFeed.length) {
        window.removeEventListener('scroll', onScroll);
    }

}

async function renderPosts(element){
    const ownerObject = await getUserObjectById(element.ownerId);

    const divPost = document.createElement('div');
    divPost.setAttribute('class','post');

    const divPostProfile = document.createElement('div');
    divPostProfile.setAttribute('class','post-profile');
    divPostProfile.setAttribute('data-user-id',ownerObject._id)

    const profileImage = document.createElement('img');
    profileImage.setAttribute('class', 'profile-img');
    profileImage.setAttribute('src', ownerObject.profilePic);

    const username = document.createElement('span');
    username.setAttribute('style','cursor:pointer');
    username.innerHTML = ownerObject.name;

    const postContent = document.createElement('img');
    postContent.setAttribute('class', 'post-content');
    postContent.setAttribute('src', element.content);

    const iconsDiv = document.createElement('div');
    iconsDiv.setAttribute('class', 'post-icons');

    const likesIcon = document.createElement('i');
    likesIcon.setAttribute('class','material-icons');
    if (element.likedBy.includes(currentUser)){
        likesIcon.setAttribute('style','color:red;cursor:pointer;');
    }
    else{
        likesIcon.setAttribute('style','color:white;cursor:pointer');
    }
    likesIcon.innerHTML = 'favorite';

    
    const likesCount = document.createElement('span');
    let likes = element.likedBy.length;
    likesCount.innerHTML = likes;
    

    let isProcessing = false;
    likesIcon.addEventListener('click', async () => {
        if (isProcessing) return;
        try{
            isProcessing = true;
            element = await updatePost(element._id,{likedBy:currentUser});

            if (element.likedBy.includes(currentUser)){
                likesIcon.setAttribute('style','color:red;cursor:pointer;');
                console.log(element.likedBy)
            }else{
                likesIcon.setAttribute('style','color:white;cursor:pointer;');
            }

            likesCount.innerHTML = element.likedBy.length;
        }catch(err){
            console.log('Error updating like status: '+ err);
        }finally{
            isProcessing = false;
        }
    })

    const commentIcon = document.createElement('i');
    commentIcon.setAttribute('class','material-icons');
    commentIcon.setAttribute('style','color:white;cursor:pointer');
    commentIcon.innerHTML = 'comment';

    commentIcon.addEventListener('click',async () => {
        element = await getPostObjectById(element._id);
        displayComments(element)
    })

    const commentsCount = document.createElement('span');
    commentsCount.setAttribute('id',element.id);
    commentsCount.innerHTML = element.comments.length;

    const postCaption = document.createElement('span');
    postCaption.setAttribute('class','post-caption');
    postCaption.innerHTML = element.caption;

    divPost.appendChild(divPostProfile);
    divPostProfile.appendChild(profileImage);
    divPostProfile.appendChild(username);

    divPost.appendChild(postContent);

    divPost.appendChild(iconsDiv);
    iconsDiv.appendChild(likesIcon);
    iconsDiv.appendChild(likesCount);
    iconsDiv.appendChild(commentIcon);
    iconsDiv.appendChild(commentsCount);

    divPost.appendChild(postCaption);

    postContainer.appendChild(divPost);

    divPost.addEventListener('click', async (event) => {
        const target = event.target;

        // Check if a profile was clicked
        if(target.closest('.post-profile')){
            const userElement = target.closest('.post-profile');

            localStorage.setItem('selected-user',userElement.dataset.userId)
            window.location.href = 'profile.html';
        }
    });
}

async function returnStories() {
    let storiesOnFeed = [];

    for (const userId of userObj.following) {
        let followedUser = await getUserObjectById(userId);
        if (followedUser && followedUser.stories.length > 0) {
            storiesOnFeed.push(followedUser);
        }
    }
    
    const storiesList = document.getElementById('stories-list');
    
    // Using forEach instead of for...of to avoid closure issues
    storiesOnFeed.forEach(currentUser => {
        const story = document.createElement('div');
        story.setAttribute('class', 'story');
    
        const img = document.createElement('img');
        img.setAttribute('class', 'profile-img');
        img.src = currentUser.profilePic;
        img.alt = currentUser.name;
    
        const name = document.createElement('span');
        name.textContent = currentUser.name;
    
        story.appendChild(img);
        story.appendChild(name);
    
        // Create a new scope for the event listener with the current user
        story.addEventListener('click', () => displayStories(currentUser, storiesOnFeed));
    
        storiesList.appendChild(story);
    });
}

async function displayStories(selectedUser, storiesOnFeed) {
    let storiesScreen = document.getElementById('stories-screen');
    storiesScreen.style.display = 'flex';
    console.log(storiesOnFeed)
    console.log(selectedUser)
    let userIndex = storiesOnFeed.findIndex(user => user._id === selectedUser._id);
    console.log(userIndex)
    let storyIndex = 0; 
    let progressBarTimeout = null;

    // Function to close stories screen
    function closeStories() {
        storiesScreen.innerHTML = '';
        storiesScreen.style.display = 'none';
        if (progressBarTimeout) clearTimeout(progressBarTimeout);
    }

    // Function to render the current story
    async function renderStory() {
        const currentUser = storiesOnFeed[userIndex];
        const currentStory = await getStoryObjectById(currentUser.stories[storyIndex]);
        
        storiesScreen.innerHTML = '';

        const progressBar = document.createElement('hr');
        progressBar.setAttribute('id', 'progress-bar');

        const contentDiv = document.createElement('div');
        contentDiv.setAttribute('class', 'stories-content');

        const profile = `
            <div class="profile">
                <img class="profile-img" src="${currentUser.profilePic}">
                <span>${currentUser.name}</span>
            </div>`;
        
        const closeStoriesScreen = document.createElement('i');
        closeStoriesScreen.setAttribute('class', 'material-icons');
        closeStoriesScreen.innerHTML = 'close';
        closeStoriesScreen.setAttribute('id', 'close-stories-screen');
        closeStoriesScreen.addEventListener('click', closeStories);

        const currentStoryContent = document.createElement('img');
        currentStoryContent.setAttribute('src', currentStory.content);
        currentStoryContent.setAttribute('class', 'story-image');        
        
        storiesScreen.appendChild(progressBar);
        storiesScreen.insertAdjacentHTML('afterbegin', profile);
        storiesScreen.appendChild(closeStoriesScreen);
        contentDiv.appendChild(currentStoryContent);
        storiesScreen.appendChild(contentDiv);

        handleProgressBar(progressBar);
    }

    // Function to navigate to the next story or user
    function nextStory() {
        storyIndex++;
        if (storyIndex >= storiesOnFeed[userIndex].stories.length) {
            userIndex++;
            storyIndex = 0;
            if (userIndex >= storiesOnFeed.length) {
                closeStories();
                return;
            }
        }
        renderStory();
    }

    // Function to set a timeout bar to progress through stories
    function handleProgressBar(progressBar) {
        let timer = 0;
        progressBar.style.width = '0%';

        const step = 10; // Interval step in milliseconds
        const duration = 7000; // Duration of story in milliseconds

        progressBarTimeout = setInterval(() => {
            timer += step;
            progressBar.style.width = `${(timer / duration) * 100}%`;

            if (timer >= duration) {
                clearInterval(progressBarTimeout);
                progressBarTimeout = null;
                nextStory();
            }
        }, step);
    }

    // Remove previous event listeners and add click-to-next-story functionality
    storiesScreen.onclick = () => {
        if (progressBarTimeout) clearInterval(progressBarTimeout);
        nextStory();
    };

    // Render the first story
    renderStory();
}


// Displays the comments 
async function displayComments(selectedPost){

    const commentsContainer = document.getElementById('comments-container');
    commentsContainer.style.display = 'flex';

    const closeComments = document.createElement('i'); 
    closeComments.setAttribute('class','material-icons');
    closeComments.setAttribute('style','color:white; width: fit-content;cursor:pointer;');
    closeComments.innerHTML = 'close';

    closeComments.addEventListener('click', () =>{
        commentsContainer.innerHTML = ''
        commentsContainer.style.display = 'none';
    });

    const commentsBox = document.createElement('div');
    commentsBox.setAttribute('id','comments-box')

    commentsContainer.appendChild(closeComments);
    commentsContainer.appendChild(commentsBox);
    
    for (const commentId of selectedPost.comments){
        const comment = await getCommentObjectById(commentId);
        const commentOwner = await getUserObjectById(comment.ownerId);

        const content = 
        `<div class = 'comment'>
                <div class="profile" data-user-id="${commentOwner._id}">
                    <img class="profile-img" src=${commentOwner.profilePic}>
                    <span>${commentOwner.name}</span>
                </div>
                <span>${comment.content}</span>
            </div>
        </div>`;

        commentsBox.insertAdjacentHTML('beforeend',content);

    }
    
    commentsContainer.addEventListener('click', async (event) => {
            const target = event.target;
    
            // Check if a profile was clicked
            if(target.closest('.profile')){
                const userElement = target.closest('.profile');
    
                localStorage.setItem('selected-user',userElement.dataset.userId)
                window.location.href = 'profile.html';
            }
        });
    const commentInput = document.createElement('input');
    commentInput.setAttribute('placeholder','Enter comment...');

    // Add comment when enter is pressed
    commentInput.addEventListener('keydown',async (event) =>{
        if (event.key === "Enter") {
            const newComment = {
                ownerId: currentUser,
                postId: selectedPost._id,
                content: event.target.value
            }

            let commentToAdd = await postComment(newComment);
            selectedPost =  await updatePost(selectedPost._id,{comments:commentToAdd._id});
            commentsContainer.innerHTML = '';
            document.getElementById(selectedPost.id).innerHTML = selectedPost.comments.length;
            displayComments(selectedPost);
        }

    });

    commentsContainer.appendChild(commentInput);

}

function onScroll(){
    if (postContainer.scrollTop + postContainer.clientHeight >= postContainer.scrollHeight) {
        returnPosts();
        console.log("YOU SCROLLED")
    }
}

// Checks if user it at the end of the page and loads more posts if possible
postContainer.addEventListener('scroll', onScroll);

async function displayCurrUser(id) {
        // Displays the current username on the left sidebar
    const displayUser = document.getElementById('current-user');
    userObj = await getUserObjectById(currentUser);
    console.log(userObj)
    displayUser.innerHTML = userObj.name;


    // Displays the current user on the left sidebar
    const displayUserPP = document.getElementById('current-user-pp');
    displayUserPP.setAttribute('src',userObj.profilePic);
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
    // Loads the first batch of posts
    returnPosts();

    //Loads stories
    returnStories();
}
