import React, { useState } from 'react';
import './SignUp.css'
import {useDispatch, useSelector} from 'react-redux'
import { signUp } from '../../../redux/actions/AuthAction.js';

import {UilLock} from '@iconscout/react-unicons'
import { PasswordInput } from '@mantine/core';

const SignUp = ({setSignUp, setLogIn}) => {

  const [data, setData] = useState({firstname:'', lastname:'', email:'', password:'', confirmpassword:''})  
  
  const handleChange = (e) =>{
    setData({...data, [e.target.name]: e.target.value})
  }

  const dispatch = useDispatch()
  const loading = useSelector(state => state.authReducer.loading)
  const error = useSelector(state => state.authReducer.signUpData)

  const handleSubmit = (e) =>{
    e.preventDefault()
    dispatch(signUp(data))
  }
  

  return (
    <div className='signup'>
      <form className="infoForm authForm" onSubmit={handleSubmit}>
        <h2>Create Your Account</h2>
        <div>
            <input onChange={handleChange} type='text' placeholder='First Name' className='infoInput' name='firstname'/>
            <input onChange={handleChange} type='text' placeholder='Last Name' className='infoInput' name='lastname'/>
        </div>
        <div>
            <input onChange={handleChange} type='text' placeholder='@Email' className='infoInput' name='email'/>
        </div>
        <div>
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
        </div>
          <div className="otherinfo" style={{marginTop:'0.2rem'}}>
              <span>Already have an account! <span onClick={()=>{setLogIn(true);setSignUp(false)}}>Login</span></span>
          </div>
        <div style={{ marginTop:'-1.3rem',justifyContent:'center',position:'relative'}}>
          <span style={{position:'absolute',color:'red',right:'5px',display: error?.response?.data?.message?'block':'none',}}>{error?.response?.data?.message}</span>
        </div>
        <button style={{marginTop:'0.3rem',cursor:loading || data.email==='' ?'no-drop':'pointer'}} type='submit' disabled={loading || data.email===''}>SignUp</button>
      </form>
    </div>
  );
}

export default SignUp;
