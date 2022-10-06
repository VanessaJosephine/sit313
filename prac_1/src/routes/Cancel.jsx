import React from 'react';
import Header from '../Header';
import HeaderBottom from '../HeaderBottom';
import './SuccessCancel.css';

function Cancel() {
    return (
        <div>
            <Header text="Fail!" />
            <div className="notif">
                <b>Subscription cancelled</b><br /><br />
            </div>
            <HeaderBottom />
        </div>
    )
}

export default Cancel;