import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Navbar(props) {
    const navigate = useNavigate()

    useEffect(() => {
        { props.user?.balance < 0 ? alert("Negative balance! You should add some with current balance otherwise we'll manage it with the next addition of balance.") : '' }
    }, [])
    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">{props.user?.name} : {props.user?.email}</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                    </ul>
                    <div className="d-flex">
                        <span className='me-2' style={{color: "white"}}>Balance:</span>
                        <input className="form-control me-2" type="text" placeholder={props.user?.balance} disabled />
                        <button className="btn btn-outline-light me-2" onClick={() => { navigate("/add") }}>+</button>
                        <button className="btn btn-outline-light me-2" onClick={() => { navigate("/history") }}>History</button>
                    </div>
                </div>
            </div>
        </nav>

    )
}

export default Navbar
