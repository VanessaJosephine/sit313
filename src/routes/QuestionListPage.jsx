import React from 'react';
import QuestionList from '../QuestionList';
import Header from '../Header'
import HeaderBottom from '../HeaderBottom'

function QuestionListPage(props) {
    return (
        <div>
            <Header text="Questions" />
            <QuestionList search={props.search} />
            <HeaderBottom />
        </div>
    )
}

export default QuestionListPage;