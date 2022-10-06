import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import { BsPencilSquare } from 'react-icons/bs';
import { AiFillHome } from 'react-icons/ai';
import { UserContext } from './context/user.context';
import './Nav.css';

const Nav = (props) => {
    const { currentUser } = useContext(UserContext)
    return (
        <div className="topnav" id="myTopnav">
            <Link id="home" className="link" to="/"><AiFillHome className="icons" /> Home</Link>
            {currentUser ?
                <Link className="link" to="/profile"><CgProfile className="icons" /> Profile</Link>
                :
                <Link className="link" to="/login"><CgProfile className="icons" /> Profile</Link>
            }
            <Link className="link" to="/post"><BsPencilSquare className="icons" /> New Post</Link>
            <Link className="link" to="/subscription">Plans</Link>
            <div class="search-container">
                <input type="text" name="text" placeholder=" Search.." onChange={props.onChange} />
            </div>
        </div>
    )
}

export default Nav;