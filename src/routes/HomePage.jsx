import React from 'react';
import { Link } from 'react-router-dom';
import MainPost from '../MainPost';
import Header from '../Header'
import HeaderBottom from '../HeaderBottom'
import QuestionList from '../QuestionList';
import ArticleList from '../ArticleList';
/*import Email from '../Email';*/

function HomePage(props) {
    return (
      <div>
            <MainPost />
            <Header text="Featured Questions" />
            <QuestionList search={props.search} />
            <HeaderBottom />
            <Link to="/questions"><button>See all</button></Link><br /><br />
            <Header text="Featured Articles" />
            <ArticleList search={props.search} />
            <HeaderBottom />
            <Link to="/articles"><button>See all</button></Link><br /><br />
            {/*<Email />*/}
      </div>
    );
}
export default HomePage;