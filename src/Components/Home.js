import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Home(props) {
  const [desc, setDesc] = useState('')
  const [cost, setCost] = useState(0)

  async function submit(e) {
    e.preventDefault();

    if (desc !== '' && cost !== '' && cost !== 0) {
      try {
        await axios.post('http://localhost:8000/add_details', { desc, cost, email: props.user?.email })
          .then(res => {
            if (res.data == "success") {
              alert("Added successfully.");
              setDesc('');
              setCost(0);
              props.progress();
            } else if (res.data == "failed") {
              alert("Your balance is insufficient for this cost");
            } else {
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
  }

  async function getData() {
    await axios.get("http://localhost:8000/get_user")
      .then(res => {
        const data = res.data;
        console.log("Data has been received successfully");
        props.setUser(data.user);
        localStorage.setItem("user", JSON.stringify(props.user));
        console.log(data.user);
      }).catch(e => {
        console.log("Data retrive unsuccessfull");
        console.log(e);
      })
  }

  useEffect(() => {
    getData()
  }, [cost])

  return (
    <div className='add'>
      <h2 className='heading'>Add Cost</h2>
      <p className='para'>Welcome To HomeCost</p>
      <div id='addCost' className='container'>
        <div className='row'>
          <div className='col'>

          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <h3 className='mb-4 text-center'>Add Expance With Details</h3>
            <form action='' method=''>
              <div className='mb-4'>
                <label htmlFor="desc" className="form-label text-secondary">Description</label>
                <input type="text" id="desc" value={desc} onChange={(e) => { setDesc(e.target.value) }} className="form-control form-control-lg" />
              </div>
              <div className='mb-4'>
                <label htmlFor="cost" className="form-label text-secondary">Cost (In BDT)</label>
                <input type="number" id="cost" value={cost} onChange={(e) => { setCost(e.target.value) }} className="form-control form-control-lg" />
              </div>
              <div className='d-grid gap-2 mb-4'>
                <button type="submit" className="btn btn-success" onClick={submit}>ADD TO EXPANCES</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
