import React from "react";
import './Login.css';
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Signup() {
  const nav = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    // Doing this is assuming that the sign up process from the user worked
    Cookies.set("newUser", "false", { expires: 2 }); // Cookie will expire in 2 days
    console.log("User signed up and cookie set");
    nav('/home');
  };
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
              <h5>Signup</h5>
            </button>
          </div>
        </form>
        <h4 className="or">or</h4>
        <div className="login">
          <button className="Login-button" onClick={() => nav('/')}>
            <h5>Login</h5>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signup;