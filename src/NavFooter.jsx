import React, { useContext } from "react";
import Footer from "./Footer";
import Nav from "./Nav";
import { UserContext } from './context/user.context';

function NavFooter (props)
{
    const { currentUser } = useContext(UserContext)
    console.log(currentUser)
    return (
        <div>
            <Nav onChange={props.onChange} />
            <Footer />
        </div>
    )
}

export default NavFooter