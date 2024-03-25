import React, { useState } from 'react'
import { Outlet, Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Alert from './Alert';

function Navbar(props) {
    console.log(props.user?.balance)
    const navigate = useNavigate()

    const logout = () => {
        props.setUser({});
        localStorage.setItem("token",'');
        localStorage.setItem("homeCostUser", JSON.stringify(props.user));
        navigate('/');
    }

    console.log(props.prog);

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-primary fixed-top">
                <div className="container-fluid">
                    <p className="navbar-brand">HomeCost</p>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/about">About Us</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/contact">Contact Us</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/features">Features</Link>
                            </li>
                            {!props.user._id ?
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/login">Log In</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/signup">Sign Up</Link>
                                    </li>
                                </>
                                : ''}
                            {props.user._id ?
                                <li className="nav-item dropdown">
                                    <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        {props.user?.name}
                                    </Link>
                                    <ul className="dropdown-menu">
                                        <li><Link className="dropdown-item" to="/profile">User Profile</Link></li>
                                        <li><Link className="dropdown-item" to="/add">Add Balance</Link></li>
                                        <li><Link className="dropdown-item" to="historyOfBalance">Balance History</Link></li>
                                        <li><Link className="dropdown-item" to="/">Add Cost</Link></li>
                                        <li><Link className="dropdown-item" to="/historyOfCost">Cost History</Link></li>
                                        <li><Link className="dropdown-item" to="/limit">Change Limit</Link></li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li><Link className="dropdown-item" to="" onClick={logout}>Log Out</Link></li>
                                    </ul>
                                </li> : ''
                            }
                        </ul>
                        {props.user._id ?
                            <div style={{ width: "25%", margin: "0 2rem" }}>
                                <div>
                                    <p className='text-light' style={{ fontSize: "18px", fontWeight: "600" }}>Balance: {props.user?.balance} BDT</p>
                                </div>
                                <div className="progress" role="progressbar" aria-label="Example with label" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                                    <div className="progress-bar progress-bar-striped progress-bar-animated bg-success" style={{ width: `${props.prog}%`, fontSize: "14px", fontWeight: "400" }}>{props.prog}%</div>
                                </div>
                            </div> : ''
                        }
                    </div>
                </div>
            </nav>

            {/*<Alert alertMssg={props.alertMssg}/>*/}
            {/*<nav className="navbar navbar-expand-lg bg-body-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="">{props.user?._id ? `${props.user?.name} : ${props.user?.email}` : "Navbar"}</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/about">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/contact">Contact</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/services">Services</Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav mt-3 d-flex">
                            <li className="nav-item">
                                <p className='nav-link'>Balance: <b style={{ fontSize: "20px" }}>{props.user?.balance}</b> Tk</p>
                            </li>
                            <li className="nav-item">
                                <button className="btn btn-outline-dark me-2" onClick={() => { navigate("/add") }}>Add Balance</button>
                            </li>
                            <li className="nav-item">
                                <button className="btn btn-outline-dark me-2" onClick={() => { navigate("/history") }}>History</button>
                            </li>
                            <li>
                                <button className="btn btn-outline-dark me-2" onClick={() => props.setUser({})}>logout</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>*/}

            <Outlet />

        </>
    )
}

export default Navbar
