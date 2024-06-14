import logo from './logo.svg';
import './App.css';
import {useEffect, useState, useRef} from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './paths/Login';
import Home from './paths/Home';
import Signup from './paths/Signup';
import Topbar from './paths/TopBar';
import About from './paths/About'
import Profile from './tool_bar_paths/Profile';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userBarClicked, setClicked] = useState(false)
  const userBarRef = useRef(null);

  const handleOffClicks = (event) => {
    if (userBarRef.current && !userBarRef.current.contains(event.target)) {
      setClicked(false);
    }
  };

  useEffect(() => {
    if(userBarClicked){
      document.addEventListener('click', handleOffClicks)
    } 
    else{
      document.removeEventListener('click', handleOffClicks)
    }

    return () => {
      document.removeEventListener('click', handleOffClicks)
    }
  }, [userBarClicked])

  return(
    <BrowserRouter>
      <div className='app'>
        <Topbar isLoggedIn={isLoggedIn}
         setIsLoggedIn={setIsLoggedIn} 
         userBarClicked={userBarClicked}
         setClicked={setClicked}
         userBarRef={userBarRef}
          />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Login' element={<Login setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path='/Signup' element={<Signup />} />
          <Route path='/Profile' element={<Profile />} />
        </Routes>
      </div>
    </BrowserRouter>  
  );
}


export default App;
