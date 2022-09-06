import React, { useState } from 'react';
import './ForgetPassword.css'

import {UilLock} from '@iconscout/react-unicons'
import { PasswordInput } from '@mantine/core';


const ForgetPassword = ({ setSignUp,setForget, setLogIn}) => {

  const [data, setData] = useState({email:'', password:''})  
  
  const handleChange = (e) =>{
    setData({...data, [e.target.name]: e.target.value})
  }

  return (
    <div className='forget'>
      <form className="infoForm authForm">
        <h2>Update Password</h2>
        <div>
            <input onChange={handleChange} type='text' placeholder='@Email' className='infoInput' name='email'/>
        </div>
        {/* <div> */}
            {/* <input onChange={handleChange} type='text' placeholder='Password' className='infoInput' name='password'/>
            <input onChange={handleChange} type='text' placeholder='Confirm Password' className='infoInput' name='confirmpassword'/> */}
          <PasswordInput
            placeholder="Your password"
            icon={<UilLock size={16} />}
            className='infoInput'
            name='password'
            onChange={handleChange}
          />
          <PasswordInput
            placeholder="Your password"
            icon={<UilLock size={16} />}
            className='infoInput'
            name='confirmpassword'
            onChange={handleChange}
          />
        {/* </div> */}
        
        <div className="otherinfo">
            <span>Already have an account! <span onClick={()=>{setForget(false);setLogIn(true)}}> Login</span> | or | <span onClick={()=>{setForget(false);setSignUp(true)}}> SignUp</span></span>
        </div>        
        <button type='submit'>Update Password</button>
      </form>
    </div>
  );
}

export default ForgetPassword;
