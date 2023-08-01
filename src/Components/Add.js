import React, {useState} from 'react'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Add(props) {
    const [amount, setAmount] = useState(0)
    const navigate = useNavigate()

    async function add(e) {
        e.preventDefault();

        if(amount!==0)
        {
            try {

            await axios.post('http://localhost:8000/add', { amount, email: props.user?.email })
                .then(res => {
                    if (res.data == "success") {
                        alert("Balance added successfully");
                        getData();
                        navigate("/");
                    }
                }).catch(e => {
                    console.log(e);
                });

        }
        catch (e) {

            console.log(e);

        }
        }
        else
        {
            alert("Empty field can't be submitted!");
        }

        

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
        <div>
            <Navbar user={props.user}/>

            <h1 className='login-heading'>Add Amount</h1>
            <form method='post' className='login-form'>
                <div className="mb-3">
                    <label htmlFor="amount" className="form-label">Amount</label>
                    <input type="number" onChange={(e) => { setAmount(e.target.value) }} className="form-control" id="amount" placeholder="Amount" required />
                </div>
                <div clss="mb-3">
                    <button type="submit" onClick={add} className="btn btn-outline-dark">ADD</button>
                </div>
            </form>
        </div>
    )
}

export default Add
