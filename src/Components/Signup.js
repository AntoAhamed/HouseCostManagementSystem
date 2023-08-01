import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import Gen_navbar from './Gen_navbar';

function Signup() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function signup(e) {
        e.preventDefault();

        if (name !== '' && email !== '' && password !== '') {
            try {

                await axios.post('http://localhost:8000/signup', { name, email, password })
                    .then(res => {
                        if (res.data == "failed") {
                            alert("User already exist!");
                        }
                        else {
                            alert("You are signed up successfully");
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
        <div>
            <Gen_navbar />
            <h1 className='signup-heading'>Signup</h1>
            <form method='post' className='signup-form'>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" onChange={(e) => { setName(e.target.value) }} className="form-control" id="name" placeholder="Name" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" onChange={(e) => { setEmail(e.target.value) }} className="form-control" id="email" placeholder="Email" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" onChange={(e) => { setPassword(e.target.value) }} className="form-control" id="password" placeholder="Password" required />
                </div>
                <div clss="mb-3">
                    <button type="submit" onClick={signup} className="btn btn-outline-dark">Signup</button>
                </div>
            </form>
            <p className='login-para'>Already have an account?
                <Link to='/'>login</Link>
            </p>
        </div>
    )
}

export default Signup
