import React, { useState } from 'react';
import './SlideMenu.css'
import Home from '../../img/home.png'
import Setting from '../../img/setting.png'
import Search from '../../img/search.png'
import Notification from '../../img/notification.png'
import Chat from '../../img/comments.png'
import ProfileImg from '../../img/logo1.png'
import { Link } from "react-router-dom";
import ShareModel from '../model/ShareModel';
import ProfileModel from '../model/ProfileModel';
import SearchModel from '../model/SearchModel';
import { Tooltip } from '@mantine/core';
import { useSelector } from 'react-redux';

const SlideMenu = () => {
  const [openModel, setOpenModel] = useState(false)
  const [sOpenModel, setSOpenModel] = useState(false)
  const [pOpenModel, setPOpenModel] = useState(false)
  const authUser = useSelector((state) => state.authReducer.authData?.user);
  const availablePublicFolder = process.env.REACT_APP_PUBLIC_IMAGES


  return (
    <div className='slidemenu'>
        <div className='s_menu'>
        <Tooltip
          label="Home"
          withArrow
          position="right"
          placement="center" 
          gutter={10}
          color='GRAPE'
        >
          <Link className='s_mlink' to='/' style={{outline:'none',textDecoration:'none'}}><img src={Home} alt='' style={{ height: '2rem', width: '2rem', cursor: 'pointer' }} /> </Link>
        </Tooltip>
        <Tooltip
          label="Post"
          withArrow
          position="right"
          placement="center" 
          gutter={10}
          color='cyan'>
          <img onClick={()=>setOpenModel(true)} src={Setting} alt='' style={{ height: '2rem', width: '2rem', cursor: 'pointer' }} />
        </Tooltip>
          <ShareModel setOpenModel={setOpenModel} openModel={openModel}/>
        <Tooltip
          label="Search"
          withArrow
          position="right"
          placement="center" 
          gutter={10}
          color='lime'>
          <img onClick={()=>setSOpenModel(true)} src={Search} alt='' style={{ height: '2rem', width: '2rem', cursor: 'pointer' }} />
        </Tooltip>
          <SearchModel setSOpenModel={setSOpenModel} sOpenModel={sOpenModel}/>
        <Tooltip
          label="Notification"
          withArrow
          position="right"
          placement="center" 
          gutter={10}
          color='yellow'>
            <img src={Notification} alt='' style={{ height: '2rem', width: '2rem', cursor: 'pointer' }} /> 
        </Tooltip>
        <Tooltip
          label="Chat"
          withArrow
          position="right"
          placement="center" 
          gutter={10}
          color='green'>
            <Link className='mlink' to='/chat' style={{ outline: 'none', textDecoration: 'none' }}><img src={Chat} alt='' style={{ height: '2rem', width: '2rem', cursor: 'pointer' }} /> </Link>
        </Tooltip>
        <Tooltip
          label="Profile"
          withArrow
          position="right"
          placement="center" 
          gutter={10}
          color='pink'>
          <img onClick={()=>setPOpenModel(true)} src={authUser?.profilePicture?availablePublicFolder + authUser.profilePicture :ProfileImg} alt='' style={{borderRadius:'100%', height: '2.5rem', width: '2.5rem', cursor: 'pointer' }} /> 
        </Tooltip>
          <ProfileModel setPOpenModel={setPOpenModel} pOpenModel={pOpenModel} profile/>
      </div>
    </div>
  );
}

export default SlideMenu;
