import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import './TopBar.css'

function Topbar(){
    const [isLoggedIn, setIsLoggedIn] = useState(true)
    const [userBarClicked, setClicked] = useState(false)
    const logout = async () => {
        try{
            const response = await fetch('http://localhost:3001/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });
            if(response.ok){
                setIsLoggedIn(false);
                setClicked(false);
            }
            else{
                console.log('logout failed')
            }
        }
        catch(error){

        }
        
    }
    const showUserTools = () => {
        console.log("Clicked")
        setClicked(!userBarClicked);
    }

    function LoginSignup(){
        return(
            <ul className="unAuthorizedTools">
                <li><NavLink to="/Login" className="auth-nav">Login</NavLink></li>
                <li><NavLink to="/Signup" className="auth-nav">Signup</NavLink></li>
            </ul>
        )
    }

    function UserProfile(){
        return(
            <div className="profile">
                <div className="user" onClick={showUserTools}></div>
            </div>
        )
    }

    function UserBar(){
        return(
            <nav className="userToolBody">
                <div className="user-profile-detail-body">
                    <div className="user-profile-detail"></div>
                    <hr />
                </div>
                <ul className="userBar">
                    <li className="userTools">Profile</li>
                    <li className="userTools">Edit Profile</li>
                    <li className="userTools">Help</li>
                    <li className="userTools" onClick={logout}>Logout</li>
                </ul>
            </nav>
        )
    }

    return (
        <div className="top-bar">
            <nav className="navbar">
                <Link className="logo" to="/">Artist Discovery</Link>
                    <div className="def-nav-container">
                        <li className="def-nav"><NavLink to={'/'} className="def-nav-link">Home</NavLink></li>
                        <li className="def-nav"><NavLink to={'/About'} className="def-nav-link">About</NavLink></li>
                        <li className="def-nav"><NavLink to={'/Explore'} className="def-nav-link">Explore</NavLink></li>
                        <li className="def-nav"><NavLink to={'/Genres'} className="def-nav-link">Genres</NavLink></li>
                        <li className="def-nav"><NavLink to={'/Shop'} className="def-nav-link">Shop</NavLink></li>
                    </div>
                    <>
                        {isLoggedIn ? (
                            <UserProfile />
                        ) : (
                            <LoginSignup />
                        )}
                    </>
            </nav>
            {userBarClicked && (
                <UserBar />
            )}
        </div>
    );
}

export default Topbar;