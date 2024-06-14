import { React, useEffect, useState } from "react";
import './Login.css';
import { useNavigate } from "react-router-dom";

function Signup() {
  const nav = useNavigate();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    try{
      console.log('Signing up')
      const response = await fetch('http://localhost:3001/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, username, password}),
        credentials: 'include', //This allows for cookies to be included in the request and the response from the server
      })

      if(response.ok){
        const data = await response.json()
        console.log(data.message)
        nav('/');
      } 
    } 
    catch(error){
      console.error('Error: ', error)
    }

    // Doing this is assuming that the sign up process from the user worked
    // Cookies.set("newUser", "false", { expires: 2 }); // Cookie will expire in 2 days
    // console.log("User signed up and cookie set");
  };
  
  return (
    <div className="body">
      <div className="Login">
        <form onSubmit={handleSignup}>
          <h1 className="Login-title">Signup</h1>
          <hr className="firstLine" />
          <div className="Email">
            <input
              className="Email-textbox"
              type="email"
              placeholder="Email"
              onChange={(change) => setEmail(change)}
              required
            />
          </div>
          <div className="Username">
            <input
              className="Username-textbox"
              type="text"
              placeholder="Username"
              onChange={(change) => setUsername(change)}
              required
            />
          </div>
          <div className="Password">
            <input
              className="Password-textbox"
              type="password"
              placeholder="Password"
              onChange={(change) => setPassword(change)}
              required
            />
          </div>
          <div className="signup">
            <button className="Signup-button" onClick={handleSignup}>
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
