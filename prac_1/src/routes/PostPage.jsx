import React from 'react';
import NewPost from '../NewPost';
import Post from '../Post';
import { useState } from 'react';

function PostPage() {
    const [selectPost, setPost] = useState("")
    const handleChange = (e) => {
        setPost(e.target.value)
    }
    return (
        <div>
            <NewPost onChange={handleChange} />
            <Post isPost={selectPost} />
        </div>
    )
}

export default PostPage;