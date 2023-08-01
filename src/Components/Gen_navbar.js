import React from 'react'
import { Outlet, Link } from 'react-router-dom'

function Gen_navbar() {
    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="">Welcome</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                    <ul className="nav ">
                        <li className="nav-item">
                            <Link className="nav-link" to="/" style={{ textDecoration: 'none', color: 'white' }}>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about" style={{ textDecoration: 'none', color: 'white' }}>About</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/services" style={{ textDecoration: 'none', color: 'white' }}>Services</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/contact" style={{ textDecoration: 'none', color: 'white' }}>Contact</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

        <Outlet />
        </>
        
    )
}

export default Gen_navbar
