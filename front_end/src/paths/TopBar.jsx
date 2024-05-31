import React from "react";
import { Link, NavLink } from "react-router-dom";
import './TopBar.css'

function Topbar(){
    return (
        <div className="top-bar">
            <nav>
                <Link className="logo" to="/">Artist Discovery</Link>
                <div className="def-nav-container">
                        <li className="def-nav"><NavLink to={'/'} className="def-nav-link">Home</NavLink></li>
                        <li className="def-nav"><NavLink to={'/About'} className="def-nav-link">About</NavLink></li>
                        <li className="def-nav"><NavLink to={'/Explore'} className="def-nav-link">Explore</NavLink></li>
                        <li className="def-nav"><NavLink to={'/Genres'} className="def-nav-link">Genres</NavLink></li>
                        <li className="def-nav"><NavLink to={'/Shop'} className="def-nav-link">Shop</NavLink></li>
                    </div>
                <ul>
                    <li><NavLink to="/Login" className="auth-nav">Login</NavLink></li>
                    <li><NavLink to="/Signup" className="auth-nav">Signup</NavLink></li>
                </ul>
            </nav>
        </div>
    );
}

export default Topbar;