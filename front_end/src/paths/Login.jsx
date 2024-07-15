import React, { useState } from "react";
import './Login.css';
import { useNavigate } from "react-router-dom";

function Login({setIsLoggedIn}){
    const nav = useNavigate()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    /*This is a constant async function that makes an http request to the backend server
    using the /login route. The server will then handle the user lookup
    */

    const adjustLogin = async () => {
        const newUsername = username.trim().toLowerCase()
        return { newUsername };
    }
    const submit = async (e) => {
        e.preventDefault()

        console.log('submit clicked')

        try {
            console.log('fetching token from backend')
            const { newUsername } = await adjustLogin();

            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: newUsername, password }), 
                credentials: 'include',
            });

            if(response.ok){
                const data = await response.json()
                console.log(data)
                setIsLoggedIn(true)
                
                //navigate to the home page with delay
                setIsLoading(true)
                setTimeout(() => {
                    nav('/')
                }, 500)
            } else{
                console.log('unable to login')
            }
        }
        catch (error){
            console.error('Error:' , error)
        }
    }

    return(
        <div className="auth-body">
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
                        type="password" 
                        placeholder="Password" 
                        onChange={(change) => setPassword(change.target.value)}
                        required/>
                    </div>
                    <div className="login">
                        <>
                            {isLoading ? (
                                <div>
                                    Logging In . . .
                                </div>
                            ) : (
                                <button className="Login-button"
                                    onClick={() => console.log("logging in...")}>
                                    <h5>Login</h5>
                                </button>
                            )}
                        </>
                    </div>
                </form>
                <>
                    {isLoading ? (
                        <>
                        </>
                    ) : (
                        <>
                        <h4 className="or">or</h4>
                        <div className="signup">
                            <button className="Signup-button" onClick={() => nav('/Signup')}>
                                <h5>Signup</h5>
                            </button>
                        </div>
                        </>
                    )}
                </>
            </div>
        </div>
    );
}

export default Login