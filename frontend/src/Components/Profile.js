import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Profile(props) {
  return (
    <div className='add'>
      <h2 className='heading'>Profile of {props.user?.name}</h2>
      <p className='para'>Welcome To HomeCost</p>
      <div id='profile' className='container'>
        <div className='row'>
          <div className='col'>
            <img src={`${window.location.origin}/images/` + props.user?.photo} alt='image' />
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <h3 className='mb-4 text-center'>{props.user?.name}</h3>
            <div className='mb-4'>
              <p className="text-secondary">Name: {props.user?.name}</p>
            </div>
            <div className='mb-4'>
              <p className="text-secondary">Email: {props.user?.email}</p>
            </div>
            <div className='mb-4'>
              <p className="text-secondary">Balance: {props.user?.balance} BDT</p>
            </div>
            <div className='mb-4'>
              <p className="text-secondary">Limit: {props.user?.limit} BDT (Monthly)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
