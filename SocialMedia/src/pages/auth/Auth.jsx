import React,{ useState } from 'react'
import Logo from '../../img/logo1.png'
import SignUp from './signUp/SignUp'
import './Auth.css'
import LogIn from './login/LogIn'
import ForgetPassword from './forget/ForgetPassword'

const Auth = () => {
  const[logIn, setLogIn] = useState(true)
  const[signUp, setSignUp] = useState(false)
  const[forget, setForget] = useState(false)


  return (
    <div className='auth'>
      <div className="description">
        <img src={Logo} alt=''/>
        <h1>What's Happening now !</h1>
        <h2>Join Swift Today</h2>
      </div>
      <div className="lspage">
        {logIn && <LogIn setSignUp={setSignUp} setForget={setForget} setLogIn={setLogIn} />}
        {signUp &&<SignUp setLogIn={setLogIn} setSignUp={setSignUp}/>}
        {forget && <ForgetPassword setSignUp={setSignUp} setLogIn={setLogIn} setForget={setForget}/>}
      </div>
    </div>
  )
}

export default Auth
