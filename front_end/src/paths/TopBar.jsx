import React from "react";
import { Link, NavLink } from "react-router-dom";
import './TopBar.css'

function Topbar(){
    return (
        <div className="top-bar">
            <nav>
                <Link className="logo" to="/">Artist Discovery</Link>
                <ul>
                    <li><NavLink to="/Login">Login</NavLink></li>
                    <li><NavLink to="/Signup">Signup</NavLink></li>
                </ul>
            </nav>
        </div>
    );
}

export default Topbar;