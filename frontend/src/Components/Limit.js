import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function limit(props) {
    const {setAlertMssg, alertSystem} = props;
    
    const [limit, setLimit] = useState(props.user?.limit)
    const preLimit = props.user?.limit;
    const navigate = useNavigate()

    async function change(e) {
        e.preventDefault();

        if (limit !== '' && limit !== preLimit) {
            try {
                await axios.post(`${window.location.origin}/change_limit`, { limit, email: props.user?.email })
                    .then(res => {
                        if (res.data === "success") {
                            alert("Limit updated successfully.");
                            getData();
                            navigate("/profile");
                        }
                    }).catch(e => {
                        console.log(e);
                    });
            }
            catch (e) {
                console.log(e);
            }
        } else if (limit === preLimit) {
            alert("This limit already exists!");
        } else {
            alert("Empty field can't be submitted!");
        }
    }

    async function getData() {
        axios.get(`${window.location.origin}/get_user`)
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

    useEffect(() => {
        getData()
    }, [limit])

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
                        <h3 className='mb-4 text-center'>Change Monthly Balance Limit</h3>
                        <form action='' method=''>
                            <div className="mb-4">
                                <label htmlFor="limit" className="form-label text-secondary">Limit (In BDT)</label>
                                <input type="number" value={limit} onChange={(e) => { setLimit(e.target.value) }} className="form-control form-control-lg" id="limit" />
                            </div>
                            <div className="d-grid gap-2 mb-4">
                                <button type="submit" onClick={change} className="btn btn-success">CHANGE LIMIT</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default limit
