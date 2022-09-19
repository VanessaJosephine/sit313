import React from 'react';
import Header from './Header';
import HeaderBottom from './HeaderBottom';
import './Post.css';
import { useState } from 'react';
import { db, storage } from './utils/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';

const Post = (props) => {

    const [imgUrl, setImgUrl] = useState(null);
    const [progresspercent, setProgresspercent] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        const file = e.target[0]?.files[0]

        if (!file) return;

        const storageRef = ref(storage, `Images/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgresspercent(progress);
            },
            (error) => {
                alert(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImgUrl(downloadURL)
                });
            }
        );
    }

    const [title, setTitle] = useState('');
    const [abstract, setAbstract] = useState('');
    const [text, setText] = useState('');
    const [tag, setTag] = useState('');
    const [date, setDate] = useState('');
    const [author, setAuthor] = useState('');

    const handleClickArticle = async (e) => {
        e.preventDefault();
        if (title !== '' || abstract !== '' || text !== '' || tag !== '') {
            await addDoc(collection(db, 'articles'), {
                title,
                abstract,
                text,
                tag,
                date: new Date().toLocaleString(),
                author,
                imgUrl
            });
            setTitle('');
            setAbstract('');
            setText('');
            setTag('');
            setDate('');
            setAuthor('');
        }
        alert('Successfully posted!')
    }

    const [title2, setTitle2] = useState('');
    const [text2, setText2] = useState('');
    const [tag2, setTag2] = useState('');
    const [date2, setDate2] = useState('');
    const [author2, setAuthor2] = useState('');

    const handleClickQuestion = async (e) => {
        e.preventDefault();
        if (title2 !== '' || text2 !== '' || tag2 !== '') {
            await addDoc(collection(db, 'questions'), {
                title2,
                text2,
                tag2,
                date2: new Date().toLocaleString(),
                author2
            });
            setTitle2('');
            setText2('');
            setTag2('');
            setDate2('');
            setAuthor2('');
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
                    <b>Author</b><br />
                    <input onChange={e => setAuthor2(e.target.value)} title="Author" type="text" placeholder="Please write your name..." /><br /><br />
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
                    <b>Image</b><br />
                    <form className='form' onSubmit={handleSubmit}>
                        <input type='file' accept='image/png, image/jpeg' /><br /><br />
                        <button type="submit">Upload</button><br /><br />
                    </form>
                    {
                        !imgUrl &&
                        <div className='outerbar'>
                            <div className='innerbar' style={{ width: `${progresspercent}%` }}>{progresspercent}%</div>
                        </div>
                    }
                    {
                        imgUrl &&
                        <img src={imgUrl} alt='uploaded file' height={200} />
                    }
                    <br /><br />
                    <b>Abstract</b><br />
                    <input onChange={e => setAbstract(e.target.value)} style={{ height: "50px" }} type="text" placeholder="..." /><br /><br />
                    <b>Article Text</b><br />
                    <input onChange={e => setText(e.target.value)} style={{ height: "200px" }} type="text" placeholder="..." /><br /><br />
                    <b>Tags</b><br />
                    <input onChange={e => setTag(e.target.value)} type="text" placeholder="Please add up to 3 tags..." />< br /><br />
                    <b>Author</b><br />
                    <input onChange={e => setAuthor(e.target.value)} title="Author" type="text" placeholder="Please write your name..." /><br /><br />
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