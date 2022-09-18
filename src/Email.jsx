import React from 'react';
import Button from './Button';
import './Email.css'

const Email = () => {
	return (
		<div className="email-container">
			<h3>SIGN UP FOR OUR DAILY INSIDER!</h3>
			<div className="input-container">
				<input type="text" placeholder="Enter your email.." name="search" />
			</div>
			<div>
				<Button type="submit" text="Subscribe" />
			</div>
		</div>
	)
}

export default Email;