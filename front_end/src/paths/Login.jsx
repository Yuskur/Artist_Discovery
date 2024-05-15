import React from "react";
import './Login.css';
import { useNavigate } from "react-router-dom";

function Login(){
    const nav = useNavigate()

    return(
        <div className="Login"> 
            <form action="">
                <h1 className="Login-title">Login</h1>
                <hr className="firstLine" />
                <div className="Username">
                    <input className="Username-textbox" 
                    type="text" placeholder="Username" required/>
                </div>
                <div className="Password">
                    <input className="Password-textbox" 
                    type="text" placeholder="Password" required/>
                </div>
                <div className="login">
                <button className="Login-button"
                    onClick={console.log("logging in...")}>
                        login
                </button>
            </div>
            </form>
            <h4 class="or">or</h4>
            <div className="signup">
                <button className="Signup-button" onClick={nav('/Signup')}>
                        Signup
                </button>
            </div>
        </div>
    );
}

export default Login