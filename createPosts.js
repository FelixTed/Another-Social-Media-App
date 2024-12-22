// Displays the current user on the left sidebar
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

//You want to be logged in as a current user, this will be expanded upon later when API is done
let currentUser = '675e188f70150e99e22ef4c6';
let userObj;
let postType = 'story';
const BACKEND_URL = 'http://localhost:3000';

async function getUserObjectById(userId) {
    try {
        const response = await fetch(`${BACKEND_URL}/user/${userId}`);
        const data = await response.json();
        //console.log('User Object:', data);
        return data;
    } catch (err) {
        console.error('Error fetching user:', err);
    }
}

async function postPost(formData) {
    try {
        const response = await fetch(`${BACKEND_URL}/post/`, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error("Failed to post");
        }

        const data = await response.json();
        return data;
    } catch(err) {
        console.error('Error posting resource: ', err);
    }
}

async function postStory(formData){
    try{
        const response = await fetch(`${BACKEND_URL}/story/`, {
            method:'POST',
            body:formData
        });

        if(!response.ok){
            throw new Error("Failed to post");
        }

        const data = await response.json();
        return data;
    }catch(err){
        console.error('Error posting ressource: ', err);
    }
}

// Add content to database THIS WILL BE EXPANDED UPON WHEN TIME DOING API WORK
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
        await postStory(formData);
    } else if (postType === 'post') {
        const captionToAdd = document.getElementById('caption').value;
        formData.append('ownerId', currentUser);
        formData.append('caption', captionToAdd);
        formData.append('likes', '0');
        formData.append('comments', '[]');
        formData.append('likedBy', '[]');
        formData.append('date', currDate.toString());
        await postPost(formData);
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

    setupPage();

}

// Displays the current user on the bottom left + store it in a variable
displayCurrUser(currentUser);

function setupPage(){
    // Publish content
    const publishButton = document.getElementById('publish-button');
    publishButton.addEventListener('click', () => {console.log(publishContent())});
}

