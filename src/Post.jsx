import React from 'react';
import Header from './Header';
import HeaderBottom from './HeaderBottom';
import ImageUploader from './ImageUploader';
import './Post.css';

import { useState } from 'react';
import { db } from './utils/firebase';
import { collection, addDoc } from 'firebase/firestore';

const Post = (props) => {
    const current = new Date();
    const cur_date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

    const [title, setTitle] = useState('');
    const [abstract, setAbstract] = useState('');
    const [text, setText] = useState('');
    const [tag, setTag] = useState('');
    const [date, setDate] = useState(null);

    const handleClickArticle = async (e) => {
        e.preventDefault();
        if (title !== '' || abstract !== '' || text !== '' || tag !== '') {
            await addDoc(collection(db, 'articles'), {
                title,
                abstract,
                text,
                tag,
                date
            });
            setTitle('');
            setAbstract('');
            setText('');
            setTag('');
            setDate(cur_date);
        }
        alert('Successfully posted!')
    }

    const [title2, setTitle2] = useState('');
    const [text2, setText2] = useState('');
    const [tag2, setTag2] = useState('');
    const [date2, setDate2] = useState(null);

    const handleClickQuestion = async (e) => {
        e.preventDefault();
        if (title2 !== '' || text2 !== '' || tag2 !== '') {
            await addDoc(collection(db, 'questions'), {
                title2,
                text2,
                tag2,
                date2
            });
            setTitle2('');
            setText2('');
            setTag2('');
            setDate2(cur_date);
        }
        alert('Successfully posted!')
    }

    const isPost = props.isPost;
    if (isPost === "Question") {
        return (
            <div className='post'>
                <Header text="What do you want to ask or share?" />
                <div className="post_container">
                    <b>Title</b><br />
                    <input onChange={e => setTitle2(e.target.value)} type="text" placeholder="Start your question with how, what, why, etc..." /><br /><br />
                    <b>Describe your problem</b><br />
                    <input onChange={e => setText2(e.target.value)} style={{ height: "200px" }} title="Describe your problem" type="text" placeholder="..." /><br /><br />
                    <b>Tags</b><br />
                    <input onChange={e => setTag2(e.target.value)} title="Tags" type="text" placeholder="Please add up to 3 tags..." /><br /><br />
                    <button onClick={handleClickQuestion} type="submit">Post</button><br /><br /><br />
                </div>
                <HeaderBottom />
                <br />
                <br />
            </div>
        )
    }
    else if (isPost === "Article") {
        return (
            <div className='post'>
                <Header text="What do you want to ask or share?" />
                <div className="post_container">
                    <b>Title</b><br />
                    <input onChange={e => setTitle(e.target.value)} type="text" placeholder="Start your question with how, what, why, etc..." /><br /><br />
                    <ImageUploader /><br />
                    <b>Abstract</b><br />
                    <input onChange={e => setAbstract(e.target.value)} style={{ height: "50px" }} type="text" placeholder="..." /><br /><br />
                    <b>Article Text</b><br />
                    <input onChange={e => setText(e.target.value)} style={{ height: "200px" }} type="text" placeholder="..." /><br /><br />
                    <b>Tags</b><br />
                    <input onChange={e => setTag(e.target.value)} type="text" placeholder="Please add up to 3 tags..." />< br/><br />
                    <button onClick={handleClickArticle} type="submit">Post</button><br /><br /><br />
                </div>
                <HeaderBottom />
                <br />
                <br />
            </div>
        )
    }
    else {
        return (
            <div className = 'post'>
                <Header text="What do you want to ask or share?" />
                <HeaderBottom />
                <br />
                <br />
            </div>
        )
    }
}

export default Post;