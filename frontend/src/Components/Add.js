import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Add(props) {
    const {setAlertMssg, alertSystem} = props;
    
    const [amount, setAmount] = useState(0)
    const [total, setTotal] = useState(0)
    const navigate = useNavigate()

    async function add(e) {
        e.preventDefault();

        if (amount !== '' && amount !== 0) {
            try {
                await axios.post('http://localhost:8000/add_amount', { amount, email: props.user?.email })
                    .then(res => {
                        if (res.data === "success") {
                            alert("Balance added successfully");
                            navigate("/");
                        }
                        if (res.data === "failed") {
                            alert("Failed. Monthly balance limit will exceed");
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
        axios.get("http://localhost:8000/get_user")
            .then(res => {
                const data = res.data;
                console.log("Data has been received successfully");
                props.setUser(data.user);
                localStorage.setItem("user", JSON.stringify(props.user));
                console.log(data);
            }).catch(e => {
                console.log("Data retrive unsuccessfull");
                console.log(e);
            })
    }

    async function getDataOfRem() {
        axios.get("http://localhost:8000/get_rem")
            .then(res => {
                const data = res.data.total;
                console.log("Data has been received successfully");
                setTotal(data);
                console.log(total);
            }).catch(e => {
                console.log("Data retrive unsuccessfull");
                console.log(e);
            })
    }

    useEffect(() => {
        getData()
        getDataOfRem()
    }, [amount])

    return (
        <div className='add'>
            <h2 className='heading'>Add Balance</h2>
            <p className='para'>Welcome To HomeCost</p>
            <div id='addBalance' className='container'>
                <div className='row'>
                    <div className='col'>

                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <h3 className='mb-2 text-center'>Add Amount To Balance</h3>
                        <p className='mb-2 text-center'>Limit: {props.user?.limit} BDT (Monthly)</p>
                        <p className='mb-2 text-center'>Already Added: {total} BDT</p>
                        <p className='mb-2 text-center'>Remaining Balance To Add: {props.user?.limit - total} BDT</p>
                        <form action='' method=''>
                            <div className="mb-4">
                                <label htmlFor="amount" className="form-label text-secondary">Amount (In BDT)</label>
                                <input type="number" value={amount} onChange={(e) => { setAmount(e.target.value) }} className="form-control form-control-lg" id="amount" />
                            </div>
                            <div className="d-grid gap-2 mb-4">
                                <button type="submit" onClick={add} className="btn btn-success">ADD TO BALANCE</button>
                            </div>
                            <div className="mb-4">
                                <p className='text-danger text-center'>Note: After adding balance you can't undo this action. So, Be careful.</p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Add
