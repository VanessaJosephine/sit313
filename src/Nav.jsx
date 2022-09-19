import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';
import { CgProfile } from 'react-icons/cg';
import { BsPencilSquare } from 'react-icons/bs';
import { AiFillHome } from 'react-icons/ai';

const Nav = (props) => {
    return (
        <div class="topnav">
            <Link id="home" className="link" to="/">Home <AiFillHome className="icons" /></Link>
            <Link className="link" to="/login">Profile <CgProfile className="icons" /></Link>
            <Link className="link" to="/post">New Post <BsPencilSquare className="icons" /></Link>
            <Link className="link" to="/questions">Questions</Link>
            <Link className="link" to="/articles">Articles</Link>
            <div class="search-container">
                <input type="text" name="text" placeholder=" Search.." onChange={props.onChange} />
            </div>
        </div>
    )
}

export default Nav;