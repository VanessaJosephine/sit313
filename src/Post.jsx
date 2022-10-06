import React, { useContext, useState } from 'react';
import Header from './Header';
import HeaderBottom from './HeaderBottom';
import './Post.css';
import CodeMirror from '@uiw/react-codemirror';
import { db, storage } from './utils/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { UserContext } from './context/user.context';
import { useNavigate } from 'react-router-dom';

const Post = (props) => {
    var today = new Date();

    const navigate = useNavigate();
    const { currentUser } = useContext(UserContext)

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

    const handleClickArticle = async (e) => {
        e.preventDefault();
        if (currentUser == null) {
            alert('You need to log in first!')
        }
        if (title !== '' || abstract !== '' || text !== '' || tag !== '') {
            await addDoc(collection(db, 'articles'), {
                title,
                abstract,
                text,
                tag,
                date: today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate(),
                author: currentUser.email,
                imgUrl,
            });
            setTitle('');
            setAbstract('');
            setText('');
            setTag('');
            alert('Successfully posted!')
            navigate("/")
        }
        else {
            alert("Cannot be null!")
        }
    }

    const [title2, setTitle2] = useState('');
    const [text2, setText2] = useState('');
    const [tag2, setTag2] = useState('');
    const [code, setCode] = useState('');

    const handleClickQuestion = async (e) => {
        e.preventDefault();
        if (currentUser == null) {
            alert('You need to log in first!')
        }
        if (title2 !== '' || text2 !== '' || tag2 !== '') {
            await addDoc(collection(db, 'questions'), {
                title: title2,
                text: text2,
                tag: tag2,
                date: today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate(),
                author: currentUser.email,
                code,
            });
            setTitle2('');
            setText2('');
            setTag2('');
            setCode('');
            alert('Successfully posted!')
            navigate("/")
        }
        else {
            alert("Cannot be null!")
        }
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
                    <textarea onChange={e => setText2(e.target.value)} style={{ height: "200px" }} title="Describe your problem" type="text" placeholder="..." /><br /><br />
                    <b>Insert your code below</b><br /><br />
                    <CodeMirror
                        value="console.log('Hello World!')"
                        height="200px"
                        theme="light"
                        onChange={(value) => { setCode({ value }) }}
                    /><br />
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
                    <textarea onChange={e => setAbstract(e.target.value)} style={{ height: "50px" }} type="text" placeholder="..." /><br /><br />
                    <b>Article Text</b><br />
                    <textarea onChange={e => setText(e.target.value)} style={{ height: "200px" }} type="text" placeholder="..." /><br /><br />
                    <b>Tags</b><br />
                    <input onChange={e => setTag(e.target.value)} type="text" placeholder="Please add up to 3 tags..." />< br /><br />
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