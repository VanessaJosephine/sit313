import React from 'react';
import ArticleList from '../ArticleList';
import Header from '../Header'
import HeaderBottom from '../HeaderBottom'

function QuestionListPage(props) {
    return (
        <div>
            <Header text="Articles" />
            <ArticleList search={props.search} />
            <HeaderBottom />
        </div>
    )
}

export default QuestionListPage;