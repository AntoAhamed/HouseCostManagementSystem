import React, { useState, useEffect } from 'react'
import axios from 'axios';

function HistoryOfCost(props) {
  const [details, setDetails] = useState([])
  const d = new Date()
  var currentMonth = d.getMonth()
  var sum = 0

  async function getData() {
    await axios.get(`http://localhost:8000/get_history`)
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

  async function getUser() {
    await axios.get(`http://localhost:8000/get_user`)
      .then(res => {
        const data = res.data;
        console.log("Data has been received successfully");
        props.setUser(data.user);
        localStorage.setItem("homeCostUser", JSON.stringify(props.user));
        console.log(data);
      }).catch(e => {
        console.log("Data retrive unsuccessfull");
        console.log(e);
      })
  }

  async function remove(id, cost) {
    try {
      await axios.post(`http://localhost:8000/remove`, { id, cost, email: props.user?.email })
        .then(res => {
          if (res.data === "success") {
            getData();
            getUser();
            props.progress();
          }
        }).catch(e => {
          console.log(e);
        });
    }
    catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getUser();
    getData();
  }, [])

  return (
    <div className='add'>
      <h2 className='heading'>Cost History</h2>
      <p className='para'>Welcome To HomeCost</p>
      <div className='container' style={{ textAlign: "center", padding: "0 7%" }}>
        <table className="table table-hover caption-top table-light">
          <caption className='mb-3'>History Of Expances</caption>
          <thead className='table-secondary'>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Time</th>
              <th scope="col">Discription</th>
              <th scope="col">Cost (BDT)</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody className='table-group-divider'>
            {details.map((element, index) => {
              return <tr key={index}>
                <th scop="row">
                  {element.date}
                </th>
                <td>
                  {element.time}
                </td>
                <td>
                  {element.desc}
                </td>
                <td>
                  {element.cost} BDT
                </td>
                <td>
                  <button className='btn btn-danger' onClick={() => { remove(element._id, element.cost) }}>Remove</button>
                </td>
              </tr>
            })}
          </tbody>
        </table>
        {/*details.map((element, index) => {
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
              <button className='btn btn-danger' onClick={() => { remove(element._id, element.cost) }}>Remove</button>
            </div>
          </div>
        })*/}
      </div>
      {/*<div style={{ textAlign: 'center', paddingTop: '20px', paddingBottom: '20px', fontSize: '30px' }}>Total cost of this month is : {sum}</div>*/}
    </div>
  )
}

export default HistoryOfCost
