import React, { useState, useEffect } from 'react'
import Navbar from './Navbar.js'
import axios from 'axios'

function Home(props) {
  const [desc, setDesc] = useState('')
  const [cost, setCost] = useState(0)

  async function submit(e) {
    e.preventDefault();

    if (desc !== '' && cost !== 0) {
      try {

        await axios.post('http://localhost:8000/details', { desc, cost, email: props.user?.email })
          .then(res => {
            if (res.data == "success") {
              alert("Added successfully.");
              getData();
            }
            else {
              alert("unsuccess");
            }
          }).catch(e => {
            console.log(e);
          });

      }
      catch (e) {

        console.log(e);

      }

    }
    else {
      alert("Empty field can't be submitted!");
    }

    setDesc('')
    setCost(0)

    alert("If description and cost fields are not empty then please clear them and enter your next record to add successfully.");
    
  }

  function getData() {
    axios.get("http://localhost:8000/api")
      .then(res => {
        const data = res.data;
        console.log("Data has been received successfully");
        props.setUser(data.user);
        console.log(data);
      }).catch(e => {
        console.log("Data retrive unsuccessfull");
        console.log(e);
      })
  }

  return (
    <>
      <Navbar user={props.user} />

      <h1 className='login-heading'>Add descriptions with costs</h1>
      <div className='container home'>
        <form method='post'>
          <div className='row'>
            <div className='col-7'>
              <input type="text" id="desc" onChange={(e) => { setDesc(e.target.value) }} className="form-control" placeholder='Description' required />
            </div>
            <div className='col-3'>
              <input type="number" id="cost" onChange={(e) => { setCost(e.target.value) }} className="form-control" placeholder='Cost' required />
            </div>
            <div className='col-2'>
              <button type="submit" className="btn btn-outline-dark" onClick={submit}>Submit</button>
            </div>
          </div>
        </form>
        <div className='row'>
          <div className='col-3'>
            <button className="btn btn-outline-dark my-4" onClick={() => props.setUser({})}>logout</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
