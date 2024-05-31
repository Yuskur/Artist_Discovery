import React, { useState } from "react";
import './Login.css';
import { useNavigate } from "react-router-dom";

function Login(){
    const nav = useNavigate()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    /*This is a constant async function that makes an http request to the backend server
    using the /login route. The server will then handle the user lookup
    */
    const submit = async (e) => {
        e.preventDefault()

        console.log('submit clicked')

        try {
            console.log('fetching token from backend')
            console.log('Username: ' + username)
            console.log('Password: ' + password)
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password }), 
            });

            if(response.ok){
                const data = await response.json()

                //storing the token as a cookie
                document.cookie = `token=${data.token}; path=/`

                //navigate to the home page
                nav('/Home')
            }
        }

        catch (error){
            console.error('Error:' , error)
        }
    }

    return(
        <div className="body">
            <div className="Login"> 
                <form onSubmit={submit}>
                    <h1 className="Login-title">Login</h1>
                    <hr className="firstLine" />
                    <div className="Username">
                        <input 
                        className="Username-textbox" 
                        type="text" 
                        placeholder="Username" 
                        onChange={(change) => setUsername(change.target.value)}
                        required/>
                    </div>
                    <div className="Password">
                        <input 
                        className="Password-textbox" 
                        type="text" 
                        placeholder="Password" 
                        onChange={(change) => setPassword(change.target.value)}
                        required/>
                    </div>
                    <div className="login">
                    <button className="Login-button"
                        onClick={() => console.log("logging in...")}>
                            <h5>Login</h5>
                    </button>
                    </div>
                </form>
                <h4 class="or">or</h4>
                <div className="signup">
                    <button className="Signup-button" onClick={() => nav('/Signup')}>
                            <h5>Signup</h5>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login