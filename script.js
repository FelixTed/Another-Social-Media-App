// Includes////////////////////////////////

///////////////////////////////////////////

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
    profilePic: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
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


user1.postHistory.push(post1.id);
user1.followers.push(user3.id);
user2.followers.push(user3.id);
user2.postHistory.push(post3.id);
user2.postHistory.push(post4.id);
user3.postHistory.push(post2.id);
user1.stories.push(story1.id);

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
};

function getObjectById(collection, id) {
    return dataStore[collection][id] || null;
}

//You want to be logged in as a current user, this will be expanded upon later when API is done
let currentUser = user3.id;
const postContainer = document.getElementById('post-container');
let loadedPosts = 0;
let postsPerLoads = 10;


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

const displayUser = document.getElementById('current-user');
displayUser.innerHTML = getObjectById('users',currentUser).name;

const displayUserPP = document.getElementById('current-user-pp');
displayUserPP.setAttribute('src',getObjectById('users',currentUser).profilePic);

// Loads the first batch of posts
returnPosts();
