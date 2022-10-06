import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Card.css';
import { db } from './utils/firebase';
import { collection, query, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { faker } from '@faker-js/faker';
import './QuestionList.css';

import { TiDelete } from 'react-icons/ti';

function QuestionList(props) {

    const [open, setOpen] = useState(false);
    const toggle = () => {
        setOpen(!open);
    }

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
            return question.title.toLowerCase().includes(props.search.toLowerCase()) || question.tag.toLowerCase().includes(props.search.toLowerCase())
        }
    );

    return (
        <div className='list_container'>
            <div class='list'>
                {/* Map is a function which works similarly to a loop function */}
                {filteredQuestionList.map((question) =>
                    (
                    <div key={question.id}>
                        <button className="collapsible" onClick={toggle}>{question.title}</button>
                        { open && (
                            <div class="product-card">
                                <div class="badge">{question.tag}</div>
                                <div class="product-tumb">
                                    <img src={faker.image.business(null, null, true)} alt="" />
                                </div>
                                <div class="product-details">
                                    <span class="product-catagory">{question.date}</span>
                                    <h3><Link to={`/questions/${question.id}`}> {question.title}</Link></h3>
                                    <p>{question.text.substring(0, 50)}</p>
                                    <div class="product-bottom-details">
                                        <div class="product-price">Author: {question.author}</div>
                                        <div class="product-links">
                                            <TiDelete className="icons" onClick={() => handleDelete(question.id)} />
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