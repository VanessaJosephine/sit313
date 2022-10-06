import React, { useState } from 'react';
import './Email.css'

function Email() {
	const [email, setEmail] = useState(0);
	const handleEmail = (e) => {
		setEmail(e.target.value)
    }
	const handleClick = async () => {
		alert("Email sent successfully!")
		await fetch('http://localhost:8088/',
		{
			method: 'POST',
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({
				email: email
			})
		})
		.then(response => response.json())
		.catch(error => {
			console.log('Error in React', error);
		})
    }
	return (
		<div className="email-container">
			<div>
				<h3>SIGN UP FOR OUR DAILY INSIDER!</h3>
			</div>
			<div>
				<input id="email" type="email" name="email" placeholder="Enter your email.." onChange={handleEmail}/>
			</div>
			<div>
				<button class="button-container" onClick={handleClick} type="submit">Subscribe</button>
			</div>
		</div>
	)
}

export default Email;