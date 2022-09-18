import React, { useEffect, useState } from 'react';
import { db } from './utils/firebase';
import { collection, query, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { TiDelete } from 'react-icons/ti';
import { faker } from '@faker-js/faker';
import './QuestionList.css';
import './Card.css';

function ArticleList(props) {
    const [open, setOpen] = useState(false);
    const toggle = () => {
        setOpen(!open);
    }
    const user = getAuth().currentUser;

    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const q = query(collection(db, 'articles'));
        const unsub = onSnapshot(q, (querySnapshot) => {
            let articlesArray = [];
            querySnapshot.forEach((doc) => {
                articlesArray.push({ ...doc.data(), id: doc.id });
            });
            setArticles(articlesArray);
        });
        return () => unsub();
    }, []);

    const handleDelete = async (id) => {
        await deleteDoc(doc(db, 'articles', id));
    };

    const filteredArticlesList = articles.filter(
        (article) => {
            return article.title.toLowerCase().includes(props.search.toLowerCase()) || article.tag.toLowerCase().includes(props.search.toLowerCase())
        }
    );

    return (
        <div className='list_container'>
            <div class='list'>
                {/* Map is a function which works similarly to a loop function */}
                {filteredArticlesList.map((article) =>
                (
                    <div>
                        <button className="collapsible" onClick={toggle}>{article.title}</button>
                        {open && (
                            <div class="product-card">
                                <div class="badge">{article.tag}</div>
                                <div class="product-tumb">
                                    <img src={faker.image.nature()} alt="" />
                                </div>
                                <div class="product-details">
                                    <span class="product-catagory">{article.date}</span>
                                    <h4><a href='https://youtu.be/dQw4w9WgXcQ'>{article.title}</a></h4>
                                    <p>Abstract: {article.abstract}</p>
                                    <p>{article.text}</p>
                                    <div class="product-bottom-details">
                                        <div class="product-price">Author: {user.displayName}</div>
                                        <div class="product-links">
                                            <a href='https://youtu.be/dQw4w9WgXcQ' id='delete_icon'><TiDelete className="icons" onClick={() => handleDelete(article.id)} /></a>
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

export default ArticleList;