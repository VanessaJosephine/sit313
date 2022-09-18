import React, { useEffect, useState } from 'react';
import './Card.css';
import { db } from './utils/firebase';
import { collection, query, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { faker } from '@faker-js/faker';
import './QuestionList.css';

import { TiDelete } from 'react-icons/ti';

function QuestionList(props) {
    const [open, setOpen] = useState(false);
    const toggle = () => {
        setOpen(!open);
    }
    const user = getAuth().currentUser;

    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const q = query(collection(db, 'questions'));
        const unsub = onSnapshot(q, (querySnapshot) => {
            let questionsArray = [];
            querySnapshot.forEach((doc) => {
                questionsArray.push({ ...doc.data(), id: doc.id });
            });
            setQuestions(questionsArray);
        });
        return () => unsub();
    }, []);

    const handleDelete = async (id) => {
        await deleteDoc(doc(db, 'questions', id));
    };

    const filteredQuestionList = questions.filter(
        (question) => {
            return question.title2.toLowerCase().includes(props.search.toLowerCase()) || question.tag2.toLowerCase().includes(props.search.toLowerCase())
        }
    );

    return (
        <div className='list_container'>
            <div class='list'>
                {/* Map is a function which works similarly to a loop function */}
                {filteredQuestionList.map((question) =>
                    (
                    <div>
                        <button className="collapsible" onClick={toggle}>{question.title2}</button>
                        { open && (
                            <div class="product-card">
                                <div class="badge">{question.tag2}</div>
                                <div class="product-tumb">
                                    <img src={faker.image.business(null, null, true)} alt="" />
                                </div>
                                <div class="product-details">
                                    <span class="product-catagory">{question.date}</span>
                                    <h4><a href="https://youtu.be/dQw4w9WgXcQ">{question.title2}</a></h4>
                                    <p>{question.text2}</p>
                                    <div class="product-bottom-details">
                                        <div class="product-price">Author: {user.displayName}</div>
                                        <div class="product-links">
                                            <a id='delete_icon'><TiDelete className="icons" onClick={() => handleDelete(question.id)} /></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                            
                    </div>
                    )
                )}
            </div>
        </div>
    )
}

export default QuestionList;