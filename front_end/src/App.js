import logo from './logo.svg';
import './App.css';
import {useEffect, useState, useRef} from 'react'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import Login from './paths/Login';
import Home from './paths/Home';
import Signup from './paths/Signup';
import Topbar from './paths/TopBar';
import About from './paths/About'
import Profile from './tool_bar_paths/Profile';
import Discover from './paths/top_bar_paths/Discover';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userBarClicked, setUserBarClicked] = useState(false)
  const [searchBarClicked, setSearchBarClicked] = useState(false)
  const userBarRef = useRef(null)
  const searchBarRef = useRef(null)
  const nav = useNavigate()

  const handleOffClicks = (event) => {
    if (userBarRef.current && !userBarRef.current.contains(event.target)) {
      console.log('userBarRef: ' + userBarRef.current.contains(event.target))
      setUserBarClicked(false);
    }
    if(searchBarRef.current && !searchBarRef.current.contains(event.target)){
      // console.log('setting search to fasle')
      setSearchBarClicked(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOffClicks)

    return () => {
      document.removeEventListener('click', handleOffClicks)
    }
  }, [])

  //Check if the user session is still valid upon visits or reloads
  const handleUserAuthCheck = async () => {
    await fetch('http://localhost:3001/authorized', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials:'include'
    }).then(response => {
      if(!response.ok){
        setIsLoggedIn(false);
        throw new Error('Auth failed')
      }
      else {
        setIsLoggedIn(true)
        console.log('returning true');
        return true;
      }
    }).then(() => {
      handleTokenRef();
    }).catch(error => {
      console.log('returning false');
      nav('/Login');
      return false;
    })
  }

  const handleTokenRef = async () => {
    try{
        const response = await fetch('http://localhost:3001/refresh-token', {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })

        if(response.ok){
            console.log('Successfully refreshed the token')
        }
    }catch(error){
        console.log(error)
    }
  }

  useEffect(() => {
    handleUserAuthCheck();
  }, [])

  return(
      <div className='app'>
        <Topbar 
         className="topbar"
         isLoggedIn={isLoggedIn}
         setIsLoggedIn={setIsLoggedIn} 
         userBarClicked={userBarClicked}
         setClicked={setUserBarClicked}
         userBarRef={userBarRef}
         handleUserAuthCheck={handleUserAuthCheck}
          />
        <div className='content'>
          <Routes className="routes">
            <Route path='/' element={<Home clicked={searchBarClicked} setClicked={setSearchBarClicked} searchBarRef={searchBarRef} />} />
            <Route path='/Login' element={<Login setIsLoggedIn={setIsLoggedIn}/>} />
            <Route path='/Signup' element={<Signup />} />
            <Route path='/Discover' element={<Discover  clicked={searchBarClicked} setClicked={setSearchBarClicked} searchBarRef={searchBarRef} />} />
            <Route path='/Profile' element={<Profile />} />
            <Route path='/About' element={<About />} />
          </Routes>
        </div>
      </div>
  );
}

function AppWraper(){
  return(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
}


export default AppWraper;
