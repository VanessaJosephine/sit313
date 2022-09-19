import React from 'react';
import Header from '../Header';
import './Signup.css';
import { Link, useNavigate } from 'react-router-dom';
import { createAuthUserWithEmailAndPassword, createUserDocFromAuth } from '../utils/firebase';
import { useState } from 'react';
import HeaderBottom from '../HeaderBottom';

const Signup = (props) => {
    const [contact, setContact] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const { displayName, email, password, confirmPassword } = contact;

    console.log(contact);

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

        if (password !== confirmPassword) {
            alert('Passwords do not match!')
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password)
            await createUserDocFromAuth(user, { displayName });
            console.log(user);
            navigate("/login");
        }
        catch (error) {
            console.log('error in creating user', error.message);
        }
    }

    return (
        <div >
            <Header text="Sign in" />
            <div className='signup_container'>
                <input placeholder="Enter name.." type="text" name="displayName" onChange={handleChange} value={contact.displayName} /><br />
                <input placeholder="Enter email.." type="email" name="email" onChange={handleChange} value={contact.email} /><br />
                <input placeholder="Enter password.." type="password" name="password" onChange={handleChange} value={contact.password} /><br />
                <input placeholder="Confirm password.." type="password" name="confirmPassword" onChange={handleChange} value={contact.confirmPassword} /><br /><br />
                <button onClick={handleSubmit}>Sign up</button><br /><br />
                <Link to="/login">Login</Link><br /><br />
            </div>
            <HeaderBottom />
        </div>
    )
}

export default Signup;