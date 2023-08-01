import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Components/Home'
import Login from './Components/Login'
import Signup from './Components/Signup'
import History from './Components/History'
import { useState } from 'react';
import Add from './Components/Add';
import Navbar from './Components/Navbar';
import Gen_navbar from './Components/Gen_navbar';
import About from './Components/About'
import Contact from './Components/Contact'
import Services from './Components/Services'

function App() {
  const [user, setUser] = useState({})

  return (
    <>
      
      
      <div className='App'>
        <BrowserRouter>
          <Routes>
            <Route exect path="/" element={user && user._id ? <Home user={user} setUser={setUser} /> : <Login setUser={setUser} />} />
            <Route exect path="signup" element={<Signup />} />
            <Route exect path="history" element={user && user._id ? <History user={user} setUser={setUser} /> : <Login setUser={setUser} />} />
            <Route exect path="add" element={user && user._id ? <Add user={user} setUser={setUser} /> : <Login setUser={setUser} />} />
            <Route exect path="navbar" element={<Navbar />} />
            <Route exect path='about' element={<About />} />
            <Route exect path='contact' element={<Contact />} />
            <Route exect path='services' element={<Services />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>

  );
}

export default App;
