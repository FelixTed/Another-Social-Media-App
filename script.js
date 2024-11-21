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
    name: 'DAVE',
    profilePic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTxhrGftJL1LaWjuopgrIqA14kTbj96yQHcQ&s',
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

const post1 = {
    id: generateId(),
    ownerId:user1.id,
    content: 'https://d3d0lqu00lnqvz.cloudfront.net/media/new_article_images/776px-Yves-Francois_Blanchet_(2009-10-16)_(cropped).jpg',
    likes: 105,
    comments: [comment1.id,comment2.id],
    caption: 'The goat himself',
    date: "2024-11-20T00:00:00Z"
}

const post2 = {
    id: generateId(),
    ownerId:user3.id,
    content: 'https://cdn3.photoblogstop.com/wp-content/uploads/2012/07/Sierra_HDR_Panorama_DFX8048_2280x819_Q40_wm_mini.jpg',
    likes: 1,
    comments: [],
    caption: 'some picture i took',
    date: "2004-11-20T00:00:00Z"
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
user3.postHistory.push(post2.id);
user1.stories.push(story1.id);

message1.chatId = chat1.id;
message2.chatId = chat1.id;

comment1.postId = post1.id;
comment2.postId = post2.id;

user1.chats.push(chat1.id);
user2.chats.push(chat1.id);
user3.chats.push(chat1.id);