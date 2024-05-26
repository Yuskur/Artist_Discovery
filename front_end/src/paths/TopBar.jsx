import React from "react";
import { Link } from "react-router-dom";

function Topbar(){
    return (
        <div className="top-bar">
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/Login">Login</Link></li>
                    <li><Link to="/Signup">Signup</Link></li>
                </ul>
            </nav>
        </div>
    );
}

export default Topbar;