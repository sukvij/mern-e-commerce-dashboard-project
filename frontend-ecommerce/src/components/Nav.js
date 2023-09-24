import React from "react";

import { Link, useNavigate } from 'react-router-dom';

const Nav= ()=>{
    const auth = localStorage.getItem("user")
    const navigate = useNavigate();
    const logout= () =>{
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        navigate("/signup")
    }
    return(
        <div>
            <img alt="logo" src="./insta.webp"></img>
            {auth?<ul className="nav-ul">
                <li> <Link to="/">Product</Link> </li>
                <li> <Link to="/add">Add Product</Link> </li>
                <li> <Link to="/update">Update Product</Link> </li>
                <li> <Link to="/profile">Profile</Link> </li>
                <li><Link to="/signUp" onClick={logout}>Logout ({JSON.parse(auth).name})</Link></li>
            </ul>
        :<ul className="nav-ul nav-right">
            <li><Link to="/signUp">SignUp</Link></li>
            <li><Link to="/login">Login</Link></li>
        </ul>
}
        </div>
    )
}

export default Nav;