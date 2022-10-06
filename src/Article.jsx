import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import './Question.css';
import { db } from './utils/firebase';
import { collection, query, getDocs, where, onSnapshot, documentId, addDoc, updateDoc, doc, getDoc } from 'firebase/firestore';
import { FiThumbsUp, FiThumbsDown } from 'react-icons/fi';
import { UserContext } from './context/user.context';
import Header from './Header'
import HeaderBottom from './HeaderBottom';
import Moment from 'react-moment';

const Article = () => {
    const { currentUser } = useContext(UserContext)

    const [question, setQuestion] = useState({});
    const { id } = useParams();
    useEffect(() => {
        const fetchData = async () => {
            const q = query(collection(db, 'articles'),
                where(documentId(), "==", id));
            let questionObject = {};
            const qsnapshot = await getDocs(q)
            qsnapshot.forEach((doc) => {
                console.log(doc.data())
                questionObject = { ...doc.data(), id: doc.id };
            });
            setQuestion(questionObject);
        }
        fetchData()
    }, [id]);

    const [text, setText] = useState('');

    const handleClick = async (e) => {
        e.preventDefault();
        if (currentUser == null) {
            alert('You need to log in first!')
        }
        if (text !== null) {
            await addDoc(collection(db, 'articles', question.id, 'comments'), {
                text: text,
                date: new Date().getTime(),
                author: currentUser.email,
                thumbsup: 0,
                replies: ""
            });
            setText('');
            alert('Successfully posted!')
        }
    }

    const handleThumbsUp = async (e) => {
        console.log('You clicked: ' + e.target.id);
        const num = (await getDoc(doc(db, 'articles', question.id, 'comments', e.target.id))).get('thumbsup') + 1
        await updateDoc(doc(db, 'articles', question.id, 'comments', e.target.id), {
            "thumbsup": num,
        });
    }
    const handleThumbsDown = async (e) => {
        console.log('You clicked: ' + e.target.id);
        const num = (await getDoc(doc(db, 'articles', question.id, 'comments', e.target.id))).get('thumbsup')
        if (num !== 0) {
            await updateDoc(doc(db, 'articles', question.id, 'comments', e.target.id), {
                "thumbsup": num - 1,
            });
        }
        else {
            alert("Invalid!")
        }
    }
    const [comments, setComments] = useState([]);
    useEffect(() => {
        const que = query(collection(db, 'articles', id.toString(), 'comments'));
        const unsub = onSnapshot(que, (querySnapshot) => {
            let commentsArray = [];
            querySnapshot.forEach((doc) => {
                commentsArray.push({ ...doc.data(), id: doc.id });
            });
            setComments(commentsArray);
        });
        return () => unsub();
    }, [id]);

    const [open, setOpen] = useState(false);
    const toggle = () => {
        setOpen(!open);
    }

    //const [text2, setText2] = useState('');

    //const handleReply = async (e) => {
    //    e.preventDefault();
    //    if (currentUser == null) {
    //        alert('You need to log in first!')
    //    }
    //    if (text2 !== null) {
    //        await addDoc(collection(db, 'articles', question.id, 'comments', e.target.id, 'replies'), {
    //            text: text2,
    //            date: new Date().getTime(),
    //            author: currentUser.email,
    //            thumbsup: 0,
    //        });
    //        setText2('');
    //        alert('Successfully posted!')
    //    }
    //}

    return (
        <div>
            <Header text={question.title} />
            {Object.keys(question).length !== 0 &&
                <div key={question.id} className="post-card-container">
                    <div className="post-card">
                    <h4>By: {question.author} || {question.date}</h4>
                    <img src={question.imgUrl} alt="" />
                    <p><b>Abstract</b><br />{question.abstract}</p><br /><br />
                    <p>{question.text}</p>
                    </div>
                </div>
            }
            <HeaderBottom />
            <Header text="Leave a reply" />
            <div className="commentbox">
                <div className="comment-container">
                    <input onChange={e => setText(e.target.value)} type="text" placeholder="Add a comment..." /><br /><br />
                    <button type="submit" onClick={handleClick}>Post</button>
                </div>
                <div className="reply-container">
                    {comments.map((comment) =>
                        (
                        <div className="reply" key={comment.id}>
                            <p><b>{comment.author}</b> || <Moment fromNow>{comment.date}</Moment></p>
                            <p>{comment.text}</p>
                            <p>
                                <FiThumbsUp className="icons" style={{ cursor: 'pointer' }} id={comment.id} onClick={handleThumbsUp} /> {comment.thumbsup} <FiThumbsDown className="icons" id={comment.id} style={{ cursor: 'pointer' }} onClick={handleThumbsDown} /> <span style={{ cursor: 'pointer' }} id={comment.id} onClick={toggle}>Reply</span>
                            </p>
                            {/*{open && (*/}
                            {/*    <div className="replyreply">*/}
                            {/*        <input onChange={e => setText2(e.target.value)} type="text" placeholder="Add a reply..." /><br /><br />*/}
                            {/*        <button type="submit" id={comment.id} onClick={handleReply}>Post</button><br /><br />*/}
                            {/*    </div>*/}
                            {/*)}<hr />*/}
                            {/*{replies.map((reply) =>*/}
                            {/*(*/}
                            {/*    <div className="reply">*/}
                            {/*        <p><b>{reply.author}</b> || <Moment fromNow>{reply.date}</Moment></p>*/}
                            {/*        <p>{reply.text}</p>*/}
                            {/*        <p>*/}
                            {/*            <FiThumbsUp className="icons" style={{ cursor: 'pointer' }} id={reply.id} onClick={handleThumbsUp} /> {reply.thumbsup} <FiThumbsDown className="icons" id={reply.id} style={{ cursor: 'pointer' }} onClick={handleThumbsDown} />*/}
                            {/*        </p>*/}
                            {/*    </div>*/}
                            {/*))}*/}
                        </div>
                        )
                    )}
                </div>
            </div>
            <HeaderBottom />
        </div>
    )
}

export default Article;
