import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import Navbar from './Components/Navbar';
import Home from './Components/Home'
import Login from './Components/Login'
import Signup from './Components/Signup'
import HistoryOfCost from './Components/HistoryOfCost'
import HistoryOfBalance from './Components/HistoryOfBalance';
import Add from './Components/Add';
import About from './Components/About'
import Contact from './Components/Contact'
import Features from './Components/Features'
import Profile from './Components/Profile'
import Limit from './Components/Limit';
import Footer from './Components/Footer';
import axios from 'axios';
import { useEffect } from 'react';

function App() {
  const [user, setUser] = useState({})
  console.log(user)

  const [prog, setProg] = useState(0)

  const progress = async () => {
    await axios.get('http://localhost:8000/getProgress')
      .then(res => {
        if (res.data !== "failed") {
          const data = res.data;
          console.log(data.prog);
          setProg(data.prog.toFixed(2));
          console.log(prog);
        } else {
          setProg(0);
        }
      }).catch(e => {
        console.log(e);
      });
  }

  useEffect(()=>{
    progress();
  },[])

  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar user={user} setUser={setUser} prog={prog} />}>
            <Route index element={user._id ? <Home user={user} setUser={setUser} progress={progress} /> : <Login user={user} setUser={setUser} />} />
            <Route path="login" element={user._id ? <Home user={user} setUser={setUser} progress={progress} /> : <Login user={user} setUser={setUser} />} />
            <Route path="signup" element={user._id ? <Home user={user} setUser={setUser} progress={progress} /> : <Signup />} />
            <Route path="add" element={user._id ? <Add user={user} setUser={setUser} progress={progress} /> : <Login user={user} setUser={setUser} />} />
            <Route path="historyOfCost" element={user._id ? <HistoryOfCost user={user} setUser={setUser} progress={progress} /> : <Login user={user} setUser={setUser} />} />
            <Route path="historyOfBalance" element={user._id ? <HistoryOfBalance /> : <Login user={user} setUser={setUser} />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="features" element={<Features />} />
            <Route path="profile" element={user._id ? <Profile user={user} setUser={setUser} /> : <Login user={user} setUser={setUser} />} />
            <Route path="limit" element={user._id ? <Limit user={user} setUser={setUser} /> : <Login user={user} setUser={setUser} />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
