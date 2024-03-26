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
  let initUser;
  if (localStorage.getItem("homeCostUser") === null) {
    initUser = {};
  } else {
    initUser = JSON.parse(localStorage.getItem("homeCostUser"));
  }

  const [alert, setAlert] = useState(true)
  const [alertMssg, setAlertMssg] = useState("This is an alert")

  const [user, setUser] = useState(initUser)

  const [prog, setProg] = useState(0)

  console.log(user)

  const progress = async () => {
    await axios.get(`http://localhost:8000/getProgress`)
      .then(res => {
        if (res.data !== "failed") {
          const data = res.data.prog;
          console.log(data);
          setProg(data.toFixed(2));
          console.log(prog);
        } else {
          setProg(0);
        }
      }).catch(e => {
        console.log(e);
      });
  }

  //alert system
  const alertSystem = () => {
    setAlert(true);
    setInterval(() => {
      setAlert(false);
    }, 3000);
  }

  useEffect(() => {
    progress();
  }, [user])

  useEffect(() => {
    localStorage.setItem("homeCostUser", JSON.stringify(user));
  }, [user])

  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar user={user} setUser={setUser} prog={prog} alertMssg={alertMssg} />}>
            <Route index element={user._id ? <Home user={user} setUser={setUser} progress={progress} setAlertMssg={setAlertMssg} alertSystem={alertSystem} /> : <Login user={user} setUser={setUser} setAlertMssg={setAlertMssg} alertSystem={alertSystem} />} />
            <Route path="login" element={user._id ? <Home user={user} setUser={setUser} progress={progress} setAlertMssg={setAlertMssg} alertSystem={alertSystem} /> : <Login user={user} setUser={setUser} setAlertMssg={setAlertMssg} alertSystem={alertSystem} />} />
            <Route path="signup" element={user._id ? <Home user={user} setUser={setUser} progress={progress} setAlertMssg={setAlertMssg} alertSystem={alertSystem} /> : <Signup setAlertMssg={setAlertMssg} alertSystem={alertSystem} />} />
            <Route path="add" element={user._id ? <Add user={user} setUser={setUser} progress={progress} setAlertMssg={setAlertMssg} alertSystem={alertSystem} /> : <Login user={user} setUser={setUser} setAlertMssg={setAlertMssg} alertSystem={alertSystem} />} />
            <Route path="historyOfCost" element={user._id ? <HistoryOfCost user={user} setUser={setUser} progress={progress} /> : <Login user={user} setUser={setUser} setAlertMssg={setAlertMssg} alertSystem={alertSystem} />} />
            <Route path="historyOfBalance" element={user._id ? <HistoryOfBalance /> : <Login user={user} setUser={setUser} setAlertMssg={setAlertMssg} alertSystem={alertSystem} />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="features" element={<Features />} />
            <Route path="profile" element={user._id ? <Profile user={user} setUser={setUser} /> : <Login user={user} setUser={setUser} setAlertMssg={setAlertMssg} alertSystem={alertSystem} />} />
            <Route path="limit" element={user._id ? <Limit user={user} setUser={setUser} setAlertMssg={setAlertMssg} alertSystem={alertSystem} /> : <Login user={user} setUser={setUser} setAlertMssg={setAlertMssg} alertSystem={alertSystem} />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
