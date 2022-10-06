import React from 'react';
import Header from '../Header';
import HeaderBottom from '../HeaderBottom';
import './SuccessCancel.css';

function Success() {
    return (
        <div>
            <Header text="Success!" />
            <div className="notif">
                <b>Thank you for subscribing with us!</b><br /><br />
            </div>
            <HeaderBottom />
        </div>
    )
}

export default Success;