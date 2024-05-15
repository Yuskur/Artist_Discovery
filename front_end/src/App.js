import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './paths/Login';
import Home from './paths/Home';
import Signup from './paths/Signup';

function Holder(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/Home' element={<Home />} />
        <Route path='/Signup' element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <Holder />
  );
}

export default App;
