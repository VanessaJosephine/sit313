import React from "react";
import Footer from "./Footer";
import Nav from "./Nav";
function NavFooter (props)
{
    return (
        <div>
            <Nav onChange={props.onChange} />
            <Footer />
        </div>
    )
}

export default NavFooter