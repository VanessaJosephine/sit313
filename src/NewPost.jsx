import React from 'react';
import Header from './Header'
import HeaderBottom from './HeaderBottom';
import './NewPost.css';

const NewPost = (props) => {
    return (
        <div>
            <Header text="New Post" />
            <div className="newpost_container">
                <h3>Select Post Type:</h3>
                <form>
                    <div>
                        <input type="radio" id="Question" value="Question" onChange={props.onChange} name="input" />
                        <label for="Question">Question</label>
                    </div>
                    <div>
                        <input type="radio" id="Article" value="Article" onChange={props.onChange} name="input" />
                        <label for="Article">Article</label>
                    </div>
                </form>
            </div>
            <HeaderBottom />
        </div>
    )
}

export default NewPost;