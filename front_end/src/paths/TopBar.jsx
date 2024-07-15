import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import './TopBar.css'

function Topbar({ isLoggedIn, setIsLoggedIn, userBarClicked, setClicked, userBarRef, handleUserAuthCheck }){
    const nav = useNavigate()

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
                nav('/')
            }
            else{
                console.log('logout failed')
            }
        }
        catch(error){
            console.error('Error: ', error)
        }
    }

    const showUserTools = (event) => {
        console.log('clicked')
        event.stopPropagation();
        setClicked(!userBarClicked);
        console.log('set to opposite')
    };

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
                <div className="user" onClick={showUserTools} ref={userBarRef}></div>
            </div>
        )
    }

    //view profile clicked
    const viewProfile = async () => {
        try{
            const isAuthorized = await handleUserAuthCheck();
            if(isAuthorized){
                console.log('Is Authorized')
                nav('/Profile')
            }
            else{
                console.log('Not Authorized')
                nav('/Login')
            }
        }catch(error){
            return(error)
        }
    }

    function UserBar(){
        return(
            <nav className="userToolBody">
                <div className="user-profile-detail-body">
                    <div className="inner-profile" onClick={viewProfile}>
                        <div className="user-profile-detail"></div>
                        <div>
                            <p className="view-profile">View Profile</p>
                            <p className="profile-username">Username</p>
                        </div>
                    </div>
                    <hr />
                </div>
                <ul className="userBar">
                    <li className="userTools"><NavLink to={'/'} className="userBarLinks">Home</NavLink></li>
                    <li className="userTools"><NavLink to={'/Profile'} className="userBarLinks">Edit Profile</NavLink></li>
                    <li className="userTools"><NavLink to={'/Messages'} className="userBarLinks">Messages</NavLink></li>
                    <li className="userTools"><NavLink to={'/Help'} className="userBarLinks">Help</NavLink></li>
                    <li className="userTools"><NavLink to={'/Settings'} className="userBarLinks">Settings</NavLink></li>
                    <li className="userTools" onClick={logout}>Logout</li>
                </ul>
            </nav>
        )
    }

    return (
        <div className="top-bar">
            <nav className="navbar">
                <Link className="logo" to="/">Disco Share</Link>
                    <div className="def-nav-container">
                        <li className="def-nav"><NavLink to={'/'} className="def-nav-link">Home</NavLink></li>
                        <li className="def-nav"><NavLink to={'/About'} className="def-nav-link">About</NavLink></li>
                        <li className="def-nav"><NavLink to={'/Discover'} className="def-nav-link">Discover</NavLink></li>
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