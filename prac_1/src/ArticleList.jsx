import React, { useEffect, useState } from 'react';
import { db } from './utils/firebase';
import { Link } from 'react-router-dom';
import { collection, query, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { TiDelete } from 'react-icons/ti';
import './QuestionList.css';
import './Card.css';

function ArticleList(props) {
    const [open, setOpen] = useState(false);
    const toggle = () => {
        setOpen(!open);
    }

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
                    <div key={article.id}>
                        <button className="collapsible" onClick={toggle}>{article.title}</button>
                        {open && (
                            <div class="product-card">
                                <div class="badge">{article.tag}</div>
                                <div class="product-tumb">
                                    <img src={article.imgUrl} alt="" />
                                </div>
                                <div class="product-details">
                                    <span class="product-catagory">{article.date}</span>
                                    <h3><Link to={`/articles/${article.id}`}>{article.title}</Link></h3>
                                    <p>Abstract: {article.abstract.substring(0, 50)}</p>
                                    <p>{article.text.substring(0, 50)}</p>
                                    <div class="product-bottom-details">
                                        <div class="product-price">Author: {article.author}</div>
                                        <div class="product-links">
                                            <TiDelete className="icons" onClick={() => handleDelete(article.id)} />
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