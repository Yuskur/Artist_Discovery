import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Login from './paths/Login';
import Home from './paths/Home';
import Signup from './paths/Signup';
import Topbar from './paths/TopBar';


function App() {

  return(
    <BrowserRouter>
      <div className='app'>
        <Topbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Signup' element={<Signup />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}


export default App;
