import React from 'react';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import Email from './Email';
import './Footer.css';
import { BsFacebook } from 'react-icons/bs';
import { FiInstagram } from 'react-icons/fi';
import { AiFillTwitterCircle, AiFillYoutube } from 'react-icons/ai';

function Footer() {
    return (
        <div>
            <div className="footer">
                <Email />
                <div className="mid">
                    <div className="left">
                        <h3>Stay connected</h3>
                        <div><a href="https://www.instagram.com/deakinuniversity">Instagram <FiInstagram className="icons" /></a></div>
                        <div><a href="https://www.facebook.com/DeakinUniversity">Facebook <BsFacebook className="icons" /></a></div>
                        <div><a href="https://www.twitter.com/Deakin">Twitter <AiFillTwitterCircle className="icons" /></a></div>
                        <div><a href="https://youtu.be/dQw4w9WgXcQ">Youtube <AiFillYoutube className="icons" /></a></div>
                    </div>

                    <div className="center">
                        <h3>Explore</h3>
                        <div><Link to="/questions">Questions</Link></div>
                        <div><Link to="/articles">Articles</Link></div>
                        <div><Link to="/tutorial">Tutorial</Link></div>
                    </div>

                    <div className="right">
                        <h3>Support</h3>
                        <div><Link to="/faq">FAQ</Link></div>
                        <div><Link to="/about">About Deakin</Link></div>
                        <div><Link to="/connect">Connect with us</Link></div><br />
                    </div>
                </div>
                <div className="bottom_footer">
                    <br />
                    <h3>VANESSA@DEAKIN2022</h3><br /><br />
                    <a href="https://youtu.be/dQw4w9WgXcQ">Privacy Policy</a>
                    <a href="https://youtu.be/dQw4w9WgXcQ">Terms</a>
                    <a href="https://youtu.be/dQw4w9WgXcQ">Code of Conduct</a>
                    <br />
                </div>
            </div>
            <Outlet />
        </div>
    )
}

export default Footer;