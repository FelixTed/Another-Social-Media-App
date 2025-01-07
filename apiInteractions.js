const BACKEND_URL = 'http://localhost:3000';

export async function getUserObjectById(userId) {
    try {
        const response = await fetch(`${BACKEND_URL}/user/${userId}`);
        const data = await response.json();
        //console.log('User Object:', data);
        return data;
    } catch (err) {
        console.error('Error fetching user:', err);
    }
}

export async function getUserObjectsByName(name) {
    try {
        const response = await fetch(`${BACKEND_URL}/user/search/${name}`);
        const data = await response.json();
        return data;
    } catch (err) {
        console.error('Error fetching users:', err);
    }
}


export async function getStoryObjectById(storyId) {
    try {
        const response = await fetch(`${BACKEND_URL}/story/${storyId}`);
        const data = await response.json();
        //console.log('User Object:', data);
        return data;
    } catch (err) {
        console.error('Error fetching story:', err);
    }
}

export async function getPostObjectById(postId) {
    try {
        const response = await fetch(`${BACKEND_URL}/post/${postId}`);
        const data = await response.json();
        //console.log('Post Object:', data);
        return data;
    } catch (err) {
        console.error('Error fetching post:', err);
    }
}

export async function getCommentObjectById(commentId){
    try {
        const response = await fetch(`${BACKEND_URL}/comment/${commentId}`);
        const data = await response.json();
        //console.log('User Object:', data);
        return data;
    } catch (err) {
        console.error('Error fetching comment:', err);
    }
}

export async function postComment(value){
    try{
        const response = await fetch(`${BACKEND_URL}/comment/`, {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(value)
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

export async function updatePost(postId, value){
    try{
        const response = await fetch(`${BACKEND_URL}/post/${postId}`, {
            method:'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(value)
        });

        if(!response.ok){
            throw new Error("Failed to update");
        }

        const data = await response.json();
        return data;
    }catch(err){
        console.error('Error updating ressource: ', err);
    }
}

export async function updateUser(userId, value){
    try{
        const response = await fetch(`${BACKEND_URL}/user/${userId}`, {
            method:'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(value)
        });

        if(!response.ok){
            throw new Error("Failed to update");
        }

        const data = await response.json();
        return data;
    }catch(err){
        console.error('Error updating ressource: ', err);
    }
}

export async function postPost(formData) {
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

export async function postStory(formData){
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

export async function deletePost(postId){
    try{
        const response = await fetch(`${BACKEND_URL}/post/${postId}`, {
            method:'DELETE',
        });

        if(!response.ok){
            throw new Error("Failed to delete");
        }

        const data = await response.json();
        return data;
    }catch(err){
        console.error('Error deleting ressource: ', err);
    }
}