import React from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const navigate = useNavigate();
    const onLogout = () => {
        signOut(auth);
        navigate("/");
        document.location.reload();
    }

    const auth = getAuth();
    console.log(auth.currentUser);
    const user = auth.currentUser;
    return (
        <div>
            <h1>Welcome {user ? user.email : "WARNING! Not logged in!"}</h1>
            <button type="submit" onClick={onLogout}>Logout</button>
        </div>
    )
}

export default Profile;
