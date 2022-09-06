import "./App.css"
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from "./pages/home/Home";
import React, { useEffect, useState } from 'react';
import Profiles from "./pages/profiles/Profiles";
import Auth from "./pages/auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import { createContext } from "react";
import { followUser, unFollowUser } from './redux/actions/UserAction';
import { getAllUsers } from "./api/GetAllUsersRequest";
import { Loader } from "@mantine/core";
import Chat from "./pages/chat/Chat";
import {io} from 'socket.io-client'
import { useRef } from 'react'

export const follwUser = createContext()

function App() {

  const dispatch = useDispatch()
  const [allUsers, setAllUsers] = useState(null)
  const authUser = useSelector((state) => state.authReducer.authData?.user);
  const [timer, setTimer]=useState(false)
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef()

  useEffect(() => {
    socket.current = io("https://swifts-chat-app.herokuapp.com");

    socket.current.emit('new-user-add', authUser?._id) 
    socket.current.on('get-users', (users) => {
      setOnlineUsers(users)
    } )
  },[authUser])
  const checkOnlineStatus = (chat)=>{
    const chatMember = chat.members.find(member => member !== authUser?._id)
    const online = onlineUsers.find(user => user.userId === chatMember)
    return online ? true : false
  }
  const onlineStatus = (userId)=>{
    const online = onlineUsers.find(user => user.userId === userId)
    return online ? true : false
  }

  useEffect(()=>{
    setTimeout(()=>{
      setTimer(true)
    },3000)
  },[])

  useEffect(() => {
    getAllUsers().then(res => {
      setAllUsers(res.data)
    }).catch(err => {
      console.log(err)
    })
    },[allUsers])

  const handlFollow=(user)=>{
    user?.follower?.includes(authUser._id) ?
      dispatch(unFollowUser(user?._id, authUser)):
      dispatch(followUser(user?._id, authUser))
  }

  const userData = useSelector((state) => state.authReducer?.authData);

  return (
    <follwUser.Provider value={{handlFollow:handlFollow, allUsers:allUsers, checkOnlineStatus:checkOnlineStatus,onlineStatus:onlineStatus }}>
    { timer?<div className="App">
      <Routes>
        <Route path="/" element={userData?.token ? <Home />: <Navigate to='/auth'/> } />
        <Route path="/profile/:userId" element={userData?.token?<Profiles />:<Navigate to='/auth'/>} />
        <Route path="/chat/" element={userData?.token?<Chat />:<Navigate to='/auth'/>} />
        <Route path="/auth" element={userData?.token?<Navigate to='/'/>:<Auth/>} />
        <Route path="*" element={userData?.token?<Navigate to='/'/>:<Navigate to='/auth'/>} />
      </Routes>
    </div>:<div style={{display:'flex',flexDirection:'column',height:'100vh',width:'100%', alignItems:'center', justifyContent:'center'}}>
          <Loader size={50}/>
    </div>}
    </follwUser.Provider>
  );
}

export default App;
