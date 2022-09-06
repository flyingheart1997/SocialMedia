import React, { useState } from 'react'
import './LogIn.css'
import {useDispatch, useSelector} from 'react-redux'
import { logIn } from '../../../redux/actions/AuthAction.js';

import {UilLock} from '@iconscout/react-unicons'
import { PasswordInput } from '@mantine/core';

const LogIn = ({setSignUp,setForget, setLogIn}) => {


  const [data, setData] = useState({email:'', password:''})  
  
  const handleChange = (e) =>{
    setData({...data, [e.target.name]: e.target.value})
  }


  const dispatch = useDispatch()
  const loading = useSelector(state => state.authReducer.loading)
  const error = useSelector(state => state.authReducer.logInData)

  const handleLogIn = (e) =>{
    e.preventDefault()
      dispatch(logIn(data))
  }

  return (
    <div className='login'>
      <form className="infoForm authForm" onSubmit={handleLogIn}>
        <h2>LogIn Your Account</h2>
        <div>
            <input onChange={handleChange} type='text' placeholder='@Email' className='infoInput' name='email'/>
        </div>
        <div style={{marginTop:'1rem'}}>
          <PasswordInput
            placeholder="Your password"
            icon={<UilLock size={16} />}
            className='infoInput'
            name='password'
            onChange={handleChange}
            autoComplete="current-password"
          />
        </div>
        <div className="otherinfo" >
            <span>Don't have an account! <span onClick={()=>{setSignUp(true);setLogIn(false)}}>SignUp</span></span>
            <span><span onClick={()=>{setForget(true);setLogIn(false)}}>Forget Password</span></span>
        </div>
        <div style={{ marginTop:'-1rem',justifyContent:'center',position:'relative',display: error?.response?.data?.message?'block':'none',}}><span style={{position:'absolute',color:'red',right:'5px',fontSize:'large'}}>{error?.response?.data?.message}</span></div>
        <button style={{cursor:loading || data.email===''?'no-drop':'pointer'}} disabled={loading || data.email===''} type='submit'>LogIn</button>
      </form>
    </div>
  )
}

export default LogIn

