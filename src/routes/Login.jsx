import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithGooglePopup, createUserDocFromAuth, signinAuthUserWithEmailAndPassword } from '../utils/firebase';
import { useState } from 'react';
import Header from '../Header';
import HeaderBottom from '../HeaderBottom';
import './Login.css';

const Login = (props) => {
    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        await createUserDocFromAuth(user);
        navigate("/profile");
    }
    const [contact, setContact] = useState({
        email: '',
        password: ''
    })
    const { email, password } = contact
    const handleChange = (e) => {
        const { name, value } = e.target
        setContact((preValue) => {
            return {
                ...preValue,
                [name]: value
            }
        })
    }
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log(email)
            console.log(password)
            const response = await signinAuthUserWithEmailAndPassword(email, password);
            console.log(response);
           
            navigate("/profile");
        }
        catch(error) {
            console.log('error in login', error.message)
            if (error.message.includes("wrong-password")) {
                alert("Wrong Email-Password")
            }
        }
    }

    return (
        <div>
            <Header text="Log in" />
            <div className='login-container'>
                <input name="email" type="text" placeholder="Enter username.." onChange={handleChange} value={contact.username} /><br />
                <input name="password" type="password" placeholder="Enter password.." onChange={handleChange} value={contact.password} /><br /><br />
                <button onClick={handleSubmit}>Log in</button><br /><br />
                <button onClick={logGoogleUser}>Google</button><br /><br />

                <Link to="/signup">Sign up instead</Link><br /><br />
            </div>
            <HeaderBottom />
        </div>
    )
}

export default Login;