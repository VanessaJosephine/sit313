import React from 'react';
import './Header.css';

const Header = (props) => {
    return (
        <div className="container">
            <div class="header">
                <div class="title">
                    <h3><strong>{ props.text }</strong></h3>
                    <hr /><br />
                </div>
            </div>
        </div>
    )
}

export default Header;