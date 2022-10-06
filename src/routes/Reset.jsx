import React, { useState } from 'react';
import { sendPasswordResetEmail, getAuth } from 'firebase/auth';
import Header from '../Header';
import HeaderBottom from '../HeaderBottom';
import { useNavigate } from 'react-router-dom';
import './Login.css'

function Reset() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const auth = getAuth();
    const handleChange = (e) => {
        setEmail(e.target.value)
    }
    const triggerResetEmail = async () => {
        await sendPasswordResetEmail(auth, email);
        console.log("Password reset email sent")
        alert("Please check you email (spam folder)!")
        navigate("/");
    }

    return (
        <div>
            <Header text="Reset" />
            <div className="login-container">
                <input name="email" type="email" placeholder="Enter email.." onChange={handleChange}/><br /><br />
                <button type="submit" onClick={triggerResetEmail}>Send</button><br /><br />
            </div>
            <HeaderBottom />
        </div>
    )
}

export default Reset;