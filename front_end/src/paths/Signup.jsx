import React from "react";
import './Login.css';
import { useNavigate } from "react-router-dom";

function Signup() {
  const nav = useNavigate();

  return (
    <div className="body">
      <div className="Login">
        <form action="">
          <h1 className="Login-title">Signup</h1>
          <hr className="firstLine" />
          <div className="Email">
            <input
              className="Email-textbox"
              type="email"
              placeholder="Email"
              required
            />
          </div>
          <div className="Username">
            <input
              className="Username-textbox"
              type="text"
              placeholder="Username"
              required
            />
          </div>
          <div className="Password">
            <input
              className="Password-textbox"
              type="password"
              placeholder="Password"
              required
            />
          </div>
          <div className="signup">
            <button className="Signup-button" onClick={() => console.log("signing up...")}>
              Signup
            </button>
          </div>
        </form>
        <h4 className="or">or</h4>
        <div className="login">
          <button className="Login-button" onClick={() => nav('/')}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signup;