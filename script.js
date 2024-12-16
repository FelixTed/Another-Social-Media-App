

function generateId() {
    return `${Date.now()}-${Math.floor(Math.random() * 100000)}`;
}

// Test Data for the front end
const user1 = {
    id: generateId(),
    following:[],
    followers:[],
    postHistory:[],
    name: 'Felix',
    profilePic: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    bio: 'Genie Log 2028 polymtl',
    stories: [],
    chats: [],
}

const user2 = {
    id: generateId(),
    following:[user1.id],
    followers:[user1.id],
    postHistory:[],
    name: 'VLAD',
    profilePic: 'https://img.decrypt.co/insecure/rs:fit:1920:0:0:0/plain/https://cdn.decrypt.co/wp-content/uploads/2024/11/chillguy-1-gID_7.jpg@webp',
    bio: 'BLYAT',
    stories: [],
    chats: [],
}

const user3 = {
    id: generateId(),
    following:[user1.id,user2.id],
    followers:[],
    postHistory:[],
    name: 'Alexis',
    profilePic: 'https://encrypted-tbn0.gstatic.com/https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webpimages?q=tbn:ANd9GcRTxhrGftJL1LaWjuopgrIqA14kTbj96yQHcQ&s',
    bio: 'Wesh',
    stories: [],
    chats: [],
}

const comment1 = {
    id: generateId(),
    ownerId: user1.id,
    postId: null,
    content: 'Wow j\'adore YFB!!!'
}

const comment2 = {
    id: generateId(),
    ownerId: user2.id,
    postId: null,
    content: 'bloc majoritaire'
}

const comment3 = {
    id: generateId(),
    ownerId: user2.id,
    postId: null,
    content: 'nice pic'
}

const post1 = {
    id: generateId(),
    ownerId:user1.id,
    content: 'https://d3d0lqu00lnqvz.cloudfront.net/media/new_article_images/776px-Yves-Francois_Blanchet_(2009-10-16)_(cropped).jpg',
    likes: 105,
    comments: [comment1.id,comment2.id],
    caption: 'The goat himself',
    date: "2024-11-20T00:00:00Z",
    likedBy: [user1.id,user3.id]
}

const post2 = {
    id: generateId(),
    ownerId:user3.id,
    content: 'https://cdn3.photoblogstop.com/wp-content/uploads/2012/07/Sierra_HDR_Panorama_DFX8048_2280x819_Q40_wm_mini.jpg',
    likes: 1,
    comments: [],
    caption: 'some picture i took',
    date: "2004-11-20T00:00:00Z",
    likedBy: [user3.id]
}

const post3 = {
    id: generateId(),
    ownerId:user2.id,
    content: 'https://cdn3.photoblogstop.com/wp-content/uploads/2012/07/Sierra_HDR_Panorama_DFX8048_2280x819_Q40_wm_mini.jpg',
    likes: 1,
    comments: [],
    caption: 'some picture i took',
    date: "2004-11-20T00:00:00Z",
    likedBy: [user1.id,user3.id,user2.id]
}


const post4 = {
    id: generateId(),
    ownerId:user2.id,
    content: 'https://cdn3.photoblogstop.com/wp-content/uploads/2012/07/Sierra_HDR_Panorama_DFX8048_2280x819_Q40_wm_mini.jpg',
    likes: 1,
    comments: [],
    caption: 'some picture i took',
    date: "2004-11-20T00:00:00Z",
    likedBy: []
}

const message1 = {
    id: generateId(),
    ownerId: user1.id,
    content:'This is a test message',
    attached:'',
    chatId : null,
    date: "1984-10-10T00:10:00Z"
}

const message2 = {
    id: generateId(),
    ownerId: user2.id,
    content:'This is a test message 2',
    attached:'https://d3d0lqu00lnqvz.cloudfront.net/media/new_article_images/776px-Yves-Francois_Blanchet_(2009-10-16)_(cropped).jpg',
    chatId : null,
    date: "1989-10-10T00:10:00Z"
}


const chat1 = {
    id: generateId(),
    usersIds : [user1.id,user2.id, user3.id],
    messagesIds: [message1.id,message2.id],
    title: 'Test Chat'
}

const story1 = {
    id: generateId(),
    ownerId: user1.id,
    content: 'https://d3d0lqu00lnqvz.cloudfront.net/media/new_article_images/776px-Yves-Francois_Blanchet_(2009-10-16)_(cropped).jpg',
    date: "2024-12-01T00:10:00Z"
}

const story2 = {
    id: generateId(),
    ownerId: user2.id,
    content: 'https://i.ytimg.com/vi/5v56YjZzH5A/maxresdefault.jpg',
    date: '2024-10-02T04:10:00Z'
}

const story3 = {
    id: generateId(),
    ownerId: user2.id,
    content: 'https://i.ytimg.com/vi/_mPDAQm58i8/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLC6FUnQqoRI2VllYnROF6rX-nmR7w',
    date: '2024-10-02T05:10:00Z'
}

user1.postHistory.push(post1.id);
user1.followers.push(user3.id);
user2.followers.push(user3.id);
user2.postHistory.push(post3.id);
user2.postHistory.push(post4.id);
user3.postHistory.push(post2.id);
user1.stories.push(story1.id);
user2.stories.push(story2.id);
user2.stories.push(story3.id);

message1.chatId = chat1.id;
message2.chatId = chat1.id;

comment1.postId = post1.id;
comment2.postId = post2.id;
comment3.postId = post3.id;

user1.chats.push(chat1.id);
user2.chats.push(chat1.id);
user3.chats.push(chat1.id);


// This will need to be updated to be created dinamically depending on data sent from API
const dataStore = {
    users: { [user1.id]: user1, [user2.id]: user2, [user3.id]: user3 },
    posts: { [post1.id]: post1, [post2.id]: post2, [post3.id]: post3, [post4.id]: post4},
    comments: { [comment1.id]: comment1, [comment2.id]: comment2, [comment3.id]:comment3 },
    stories: {[story1.id]:story1, [story2.id]:story2, [story3.id]:story3}
    
};

function getObjectById(collection, id) {
    return dataStore[collection][id] || null;
}

const BACKEND_URL = 'http://localhost:3000';


//You want to be logged in as a current user, this will be expanded upon later when API is done
let currentUser = '675e188f70150e99e22ef4c6';
const postContainer = document.getElementById('post-container');
let loadedPosts = 0;
let postsPerLoads = 10;

async function getUserObjectById(userId) {
    try {
        const response = await fetch(`${BACKEND_URL}/user/${userId}`);
        const data = await response.json();
        console.log('User Object:', data);
        return data;
    } catch (err) {
        console.error('Error fetching user:', err);
    }
}

function returnPosts(){
   // Collect all posts from followed users
   let postsOnFeed = [];
   getObjectById('users', currentUser).following.forEach(userId => {
       const followedUser = getObjectById('users', userId);
       if (followedUser) {
           followedUser.postHistory.forEach(postId => {
               const post = getObjectById('posts', postId);
               if (post) {
                   postsOnFeed.push(post);
               }
           });
       }
   });
    // Sort by descending order based on the date
    postsOnFeed.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Get the next set of posts
    const newPosts = postsOnFeed.slice(loadedPosts, loadedPosts + postsPerLoads);
    newPosts.forEach(renderPosts);

    // Update the count of loaded posts
    loadedPosts += newPosts.length;

    // Stop loading if all posts are loaded
    if (loadedPosts >= postsOnFeed.length) {
        window.removeEventListener('scroll', onScroll);
    }

}

function renderPosts(element){
    const divPost = document.createElement('div');
    divPost.setAttribute('class','post');

    const divPostProfile = document.createElement('div');
    divPostProfile.setAttribute('class','post-profile');

    const profileImage = document.createElement('img');
    profileImage.setAttribute('class', 'profile-img');
    profileImage.setAttribute('src', getObjectById('users',element.ownerId).profilePic);

    const username = document.createElement('span');
    username.setAttribute('style','cursor:pointer');
    username.innerHTML = getObjectById('users', element.ownerId).name;

    const postContent = document.createElement('img');
    postContent.setAttribute('class', 'post-content');
    postContent.setAttribute('src', element.content);

    const iconsDiv = document.createElement('div');
    iconsDiv.setAttribute('class', 'post-icons');

    const likesIcon = document.createElement('i');
    likesIcon.setAttribute('class','material-icons');
    if (element.likedBy.has(currentUser)){
        likesIcon.setAttribute('style','color:red;cursor:pointer;');
    }
    else{
        likesIcon.setAttribute('style','color:white;cursor:pointer');
    }
    likesIcon.innerHTML = 'favorite';

    
    const likesCount = document.createElement('span');
    likesCount.innerHTML = element.likes;
    
    likesIcon.addEventListener('click', () => {
        if (element.likedBy.has(currentUser)){
            element.likes--;
            likesCount.innerHTML = element.likes;
            likesIcon.setAttribute('style','color:white;cursor:pointer;');
            element.likedBy.delete(currentUser);
        }else{
        element.likes++;
        likesCount.innerHTML = element.likes;
        likesIcon.setAttribute('style','color:red;cursor:pointer;');
        element.likedBy.add(currentUser);
        }
    })

    const commentIcon = document.createElement('i');
    commentIcon.setAttribute('class','material-icons');
    commentIcon.setAttribute('style','color:white;cursor:pointer');
    commentIcon.innerHTML = 'comment';

    commentIcon.addEventListener('click',() => {
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
}

function returnStories(){
    let storiesOnFeed = [];
    getObjectById('users', currentUser).following.forEach(userId => {
        let followedUser = getObjectById('users', userId);
        if (followedUser) {
        if (followedUser.stories.length > 0){
            storiesOnFeed.push(followedUser);
        }
        }
    });
    const storiesList = document.getElementById('stories-list');
    storiesOnFeed.forEach(user => {
        const story = document.createElement('div');
        story.setAttribute('class','story');
    
        const img = document.createElement('img');
        img.setAttribute('class','profile-img');
        img.src = user.profilePic;
        img.alt = user.name;
    
        const name = document.createElement('span');
        name.textContent = user.name;
    
        story.appendChild(img);
        story.appendChild(name);
    
        story.addEventListener('click', ()=>displayStories(user,storiesOnFeed));
    
        storiesList.appendChild(story);
    });
    
}

function displayStories(selectedUser, storiesOnFeed) {
    let storiesScreen = document.getElementById('stories-screen');
    storiesScreen.style.display = 'flex';

    let userIndex = storiesOnFeed.findIndex(user => user.id === selectedUser.id); // Track user index
    let storyIndex = 0; // Track story index within the user's stories
    let progressBarTimeout = null;

    // Function to close stories screen
    function closeStories() {
        storiesScreen.innerHTML = '';
        storiesScreen.style.display = 'none';
        if (progressBarTimeout) clearTimeout(progressBarTimeout);
    }

    // Function to render the current story
    function renderStory() {
        const currentUser = storiesOnFeed[userIndex];
        const currentStory = getObjectById('stories', currentUser.stories[storyIndex]);
        
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
function displayComments(selectedPost){

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
    
    selectedPost.comments.forEach((commentId) => {
        const comment = getObjectById('comments',commentId);

        const content = 
        `<div class = 'comment'>
                <div class="profile">
                    <img class="profile-img" src=${getObjectById('users',comment.ownerId).profilePic}>
                    <span>${getObjectById('users',comment.ownerId).name}</span>
                </div>
                <span>${comment.content}</span>
            </div>
        </div>`;

        commentsBox.insertAdjacentHTML('beforeend',content);

    });
    
    const commentInput = document.createElement('input');
    commentInput.setAttribute('placeholder','Enter comment...');

    // Add comment when enter is pressed
    commentInput.addEventListener('keydown',(event) =>{
        if (event.key === "Enter") {
            const newComment = {
                id: generateId(),
                ownerId: currentUser,
                postId: selectedPost.id,
                content: event.target.value
            }

            dataStore['comments'][newComment.id] = newComment;
            selectedPost.comments.push(newComment.id);
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

//Set all post likedBy lists to a set for faster lookup
Object.values(dataStore.posts).forEach(element => {
    element.likedBy = new Set(element.likedBy);
});
async function displayCurrUser(id) {
    // Displays the current username on the left sidebar
const displayUser = document.getElementById('current-user');
currUser = await getUserObjectById(currentUser)
displayUser.innerHTML = currUser.name;


// Displays the current user on the left sidebar
const displayUserPP = document.getElementById('current-user-pp');
displayUserPP.setAttribute('src',getObjectById('users',currentUser).profilePic);
}

displayCurrUser(currentUser);

// Loads the first batch of posts
returnPosts();

//Loads stories
returnStories();
