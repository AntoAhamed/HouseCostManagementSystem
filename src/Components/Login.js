import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Gen_navbar from './Gen_navbar';

function Login(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    async function login(e) {
        e.preventDefault();

        if (email !== '' && password !== '') {
            try {

                await axios.post('http://localhost:8000/', { email, password })
                    .then(res => {
                        if (res.data == "failed") {
                            alert("User dose not exist!");
                        }
                        else {
                            alert("You are loged in successfully");
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
        else {
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

    /*useEffect(() => {
      getData();
    }, [])*/

    return (
        <div>
            <Gen_navbar />
            
            <h1 style={{textAlign: 'center', fontSize: '67px', marginTop: '30px', marginBottom: '50px'}}>Welcome to monthly family cost app</h1>
            <h1 className='login-heading'>Login</h1>
            <form method='post' className='login-form'>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" onChange={(e) => { setEmail(e.target.value) }} className="form-control" id="email" placeholder="Email" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" onChange={(e) => { setPassword(e.target.value) }} className="form-control" id="password" placeholder="Password" required />
                </div>
                <div clss="mb-3">
                    <button type="submit" onClick={login} className="btn btn-outline-dark">Login</button>
                </div>
            </form>
            <p className='login-para'>Don't have an account?
                <Link to='/signup'>signup</Link>
            </p>
        </div>
    )
}

export default Login
