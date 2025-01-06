import { jwtDecode } from "https://esm.run/jwt-decode";
import {getUserObjectById,updateUser, getPostObjectById,updatePost, getCommentObjectById, postComment} from './apiInteractions.js'

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

async function displayPostHistory(){
    const postHistoryBox = document.getElementById('post-history-box');
    for (const postId of selectedUserObj.postHistory){
        const post = await getPostObjectById(postId);
        let previewHtml = `<div class="post-preview">
                                <img src=${post.imageUrl} class="preview-image" data-post=${encodeURIComponent(JSON.stringify(post))}>
                            </div>`;
        postHistoryBox.innerHTML += previewHtml;
    }

    postHistoryBox.addEventListener('click', async (event) => {
            const target = event.target;
    
            // Check if a follow button was clicked
            if (target.closest('.post-preview')) {
                let postElement = JSON.parse(decodeURIComponent(event.target.dataset.post));
                const selectedPostDiv = document.getElementById('selected-container');
                selectedPostDiv.style.display = 'flex';
                const selectedPostHtml = `<div id="cross-div">
                                            <i class="material-icons">close</i>
                                        </div>
                
                                        <div class="post">
                                            <div class="post-profile">
                                                <img class="profile-img" src=${selectedUserObj.imageUrl}>
                                                <span>${selectedUserObj.name}</span>
                                            </div>
                                                <img class="post-content" src=${postElement.imageUrl}>
                                                <div class="post-icons">
                                                    <i id="like" class="material-icons" style="color: white;">favorite</i>
                                                    <i id="comment" class="material-icons" style="color: white;">comment</i>
                                                </div>
                                                <span class="post-caption"> ${postElement.caption}</span>
                                                
                                        </div>`;
                selectedPostDiv.innerHTML = selectedPostHtml;
                document.getElementById('cross-div').addEventListener('click', () => {
                    selectedPostDiv.innerHTML = '';
                    selectedPostDiv.style.display = 'none';
                })

                const likesIcon = document.getElementById('like');
                likesIcon.setAttribute('class','material-icons');
                if (postElement.likedBy.includes(currentUser)){
                    likesIcon.setAttribute('style','color:red;cursor:pointer;');
                }
                else{
                    likesIcon.setAttribute('style','color:white;cursor:pointer');
                }
                

                let isProcessing = false;
                likesIcon.addEventListener('click', async () => {
                    if (isProcessing) return;
                    try{
                        isProcessing = true;
                        postElement = await updatePost(postElement._id,{likedBy:currentUser});

                        if (postElement.likedBy.includes(currentUser)){
                            likesIcon.setAttribute('style','color:red;cursor:pointer;');
                            console.log(postElement.likedBy)
                        }else{
                            likesIcon.setAttribute('style','color:white;cursor:pointer;');
                        }

                        
                    }catch(err){
                        console.log('Error updating like status: '+ err);
                    }finally{
                        isProcessing = false;
                    }
                });

                const commentIcon = document.getElementById('comment');
            
                commentIcon.addEventListener('click',async () => {
                    await displayComments(postElement);
                })
            }
        });
}

// Displays the comments 
async function displayComments(selectedPost){
    //Avoids an issue with the rendering of comments but affects performance
    selectedPost = await getPostObjectById(selectedPost._id);
    
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
                    <img class="profile-img" src=${commentOwner.imageUrl}>
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
            displayComments(selectedPost);
        }

    });

    commentsContainer.appendChild(commentInput);
}

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

    displayPostHistory()

    

}

// Displays the current user on the bottom left + store it in a variable
displayCurrUser(currentUser);