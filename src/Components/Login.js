import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    async function login(e) {
        e.preventDefault();

        if (email !== '' && password !== '') {
            try {
                await axios.post('http://localhost:8000/login', { email, password })
                    .then(res => {
                        if (res.data === "failed") {
                            alert("User dose not exists!");
                        }
                        else {
                            alert("You are logged in successfully");
                            props.setUser(res.data.loggedUser);
                            localStorage.setItem("user", JSON.stringify(props.user));
                            console.log(props.user);
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

    return (
        <>
            <div id='login' className='container'>
                <div className='row'>
                    <div className='col'>
                        <p>Welcome To HomeCost</p>
                    </div>
                    <div className='col'>
                        <h3 className='m-4'>Login</h3>
                        <p className='m-4'>Login to enjoy our features</p>
                        <form action='' method='' className='m-4'>
                            <div className="mb-4">
                                <label htmlFor="email" className="form-label text-body-secondary">Email</label>
                                <input type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} className="form-control form-control-lg" id="email" required />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="form-label text-body-secondary">Password</label>
                                <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} className="form-control form-control-lg" id="password" required />
                            </div>
                            <div className="d-grid gap-2 mb-4">
                                <button type="submit" onClick={login} className="btn btn-success">Login</button>
                            </div>
                        </form>
                        <p className='text-center'>Don't have an account?
                            <Link to='/signup'>signup</Link>
                        </p>
                    </div>
                </div>
            </div>
            {/*<div>            
            <h1 style={{textAlign: 'center', fontSize: '67px', marginTop: '30px', marginBottom: '50px'}}>Welcome to monthly family cost app</h1>
            <h1 className='login-heading'>Login</h1>
            <form method='post' className='login-form'>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} className="form-control" id="email" placeholder="Email" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} className="form-control" id="password" placeholder="Password" required />
                </div>
                <div clss="mb-3">
                    <button type="submit" onClick={login} className="btn btn-outline-dark">Login</button>
                </div>
            </form>
            <p className='login-para'>Don't have an account?
                <Link to='/signup'>signup</Link>
            </p>
    </div>*/}
        </>

    )
}

export default Login
