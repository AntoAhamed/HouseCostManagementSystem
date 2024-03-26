import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup(props) {
    const {setAlertMssg, alertSystem} = props;

    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [photo, setPhoto] = useState('')

    async function signup(e) {
        e.preventDefault();

        /*axios.post('http://localhost:5000/users/add/', formData)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });*/

        if (name !== '' && email !== '' && password !== '' && photo !== '') {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('photo', photo);

            try {
                await axios.post(`http://localhost:8000/signup`, formData)
                    .then(res => {
                        if (res.data === "success") {
                            alert("You are signed up successfully");
                            setName('');
                            setEmail('');
                            setPassword('');
                            setPhoto('');
                            navigate("/");
                        }else if (res.data === "failed") {
                            alert("User already exists with this email!");
                        }else{
                            alert(res.data);
                            console.log(res.data);
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
            <div id='signup' className='container'>
                <div className='row'>
                    <div className='col'>
                        <p>Welcome To HomeCost</p>
                    </div>
                    <div className='col'>
                        <h3 className='m-3'>Signup</h3>
                        <form action='' method='' className='m-3'>
                            <div className="mb-4">
                                <label htmlFor="name" className="form-label text-body-secondary">Name</label>
                                <input type="text" value={name} onChange={(e) => { setName(e.target.value) }} className="form-control form-control-lg" id="name" required />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="form-label text-body-secondary">Email</label>
                                <input type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} className="form-control form-control-lg" id="email" required />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="form-label text-body-secondary">Password</label>
                                <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} className="form-control form-control-lg" id="password" required />
                            </div>
                            <div className='mb-4'>
                                <label htmlFor="formFileLg" className="form-label text-body-secondary">Upload Your Photo</label>
                                <input class="form-control form-control-lg" id="formFileLg" type="file" accept=".png, .jpg, .jpeg" onChange={(e) => { setPhoto(e.target.files[0]) }} />
                            </div>
                            <div className="d-grid gap-2 mb-4">
                                <button type="submit" onClick={signup} className="btn btn-success">Signup</button>
                            </div>
                        </form>
                        <p className='text-center'>Already have an account?
                            <Link to='/'>login</Link>
                        </p>
                    </div>
                </div>
            </div>
            {/*<div>
                <h1 className='signup-heading'>Signup</h1>
                <form method='' action='' className='signup-form'>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" value={name} onChange={(e) => { setName(e.target.value) }} className="form-control" id="name" placeholder="Name" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} className="form-control" id="email" placeholder="Email" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} className="form-control" id="password" placeholder="Password" />
                    </div>
                    <div clss="mb-3">
                        <button type="submit" onClick={signup} className="btn btn-outline-dark">Signup</button>
                    </div>
                </form>
                <p className='login-para'>Already have an account?
                    <Link to='/'>login</Link>
                </p>
    </div>*/}
        </>

    )
}

export default Signup
