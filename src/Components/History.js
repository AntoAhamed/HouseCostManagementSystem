import React, { useState, useEffect } from 'react'
import Navbar from './Navbar';
import axios from 'axios';

function History(props) {
  const [details, setDetails] = useState([])
  const d = new Date()
  var currentMonth = d.getMonth()
  var sum = 0
  const [toDelete, setToDelete] = useState('')
  const [toDeleteCost, setToDeleteCost] = useState(0)

  if (toDelete !== '') {
    remove();
    setToDelete('');
    setToDeleteCost(0);
  }

  async function remove() {
    try {
      await axios.post('http://localhost:8000/remove', { toDelete, toDeleteCost, email: props.user?.email })
        .then(res => {
          if (res.data == "success") {
            settingUser();
            getData();
          }
        }).catch(e => {
          console.log(e);
        });

    }
    catch (e) {
      console.log(e);
    }
  }

  async function getData() {
    await axios.get("http://localhost:8000/api_d")
      .then(res => {
        const data = res.data;
        console.log("Data has been received successfully");
        setDetails(data.data);
        console.log(data);
      }).catch(e => {
        console.log("Data retrive unsuccessfull");
        console.log(e);
      })
  }

  async function settingUser() {
    await axios.get("http://localhost:8000/api")
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

  useEffect(() => {
    getData();
  }, [])

  return (
    <div>
      <Navbar user={props.user} />

      <div className='container' style={{ textAlign: "center" }}>
        <div className='row'>
          <div className='col-2'>
            <h4>Date</h4>
          </div>
          <div className='col-2'>
            <h4>Time</h4>
          </div>
          <div className='col-2'>
            <h4>Description</h4>
          </div>
          <div className='col-2'>
            <h4>Cost</h4>
          </div>
          <div className='col-2'>
            <h4>User Email</h4>
          </div>
        </div>
        {details.map((element, index) => {
          { if (element.month == currentMonth) { sum += Number(element.cost) } }

          return <div className='row' key={index} style={{ paddingTop: '15px' }}>
            <div className='col-2'>
              {element.date}
            </div>
            <div className='col-2'>
              {element.time}
            </div>
            <div className='col-2'>
              {element.desc}
            </div>
            <div className='col-2'>
              {element.cost}
            </div>
            <div className='col-2'>
              {element.email}
            </div>
            <div className='col-2'>
              <button className='btn btn-danger' onClick={() => { setToDelete(element._id); setToDeleteCost(Number(element.cost)); }}>Remove</button>
            </div>
          </div>
        })}
      </div>
      <div style={{ textAlign: 'center', paddingTop: '20px', paddingBottom: '20px', fontSize: '30px' }}>Total cost of this month is : {sum}</div>
    </div>
  )
}

export default History
