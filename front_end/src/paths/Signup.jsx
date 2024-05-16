import React from "react";
import './Login.css';
import { useNavigate } from "react-router-dom";

function Signup(){
    const nav = useNavigate()

    return(
        <div className="login">
            <button className="Login-button"
                onClick={nav('/')}>
                login
            </button>
        </div>
    );
}

export default Signup;