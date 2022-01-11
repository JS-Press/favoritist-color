import React from "react";
import {Link} from "react-router-dom"

function Navbar({ fav }){

    const navStyle = {
        backgroundColor: `black`,
        color: `${fav}`,
        borderColor: `${fav}`,
        borderRadius: 50,
        fontWeight: 'bold',
        textDecoration: 'none',
        padding: 8,
        fontSize: 16,
        outlineStyle: 'solid',
        margin: 10
      }


    return (
        <>
        {/* <p></p> */}
        {/* <ul>
            <li><NavLink to="/login">login</NavLink></li>
            <li><NavLink to="/signup">signup</NavLink></li>
            <li><NavLink to="/">home</NavLink></li>
        </ul> */}

        <Link style={navStyle} to="/login">login</Link>
        <Link style={navStyle} to="/signup">signup</Link>
        
        

        </>
    )
}

export default Navbar