import React, { useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import AllUser from './allUser/AllUser';
import './UserSide.css'
import Home from '../../img/home.png'
import Setting from '../../img/setting.png'
import Notification from '../../img/notification.png'
import Chat from '../../img/comments.png'
import ActiveUser from './activeUser/ActiveUser';
import { Link } from "react-router-dom";
import ShareModel from '../model/ShareModel';
import { Loader, Tooltip } from '@mantine/core';
import { follwUser } from '../../App';


const UserSide = () => {
  const followedUser = useContext(follwUser);
  const user = useSelector((state)=>state.authReducer.authData?.user)
  const [openModel, setOpenModel] = useState(false)

  const myFollower = followedUser.allUsers?.find(users => users?._id === user._id)
  const friends = myFollower?.following?.filter(f => myFollower?.follower?.includes(f));

  return (
    <div className='userSide'>
      <div className='menu'>
        <Tooltip
          label="Home"
          withArrow
          position="bottom"
          placement="center"
          gutter={10}
          color='GRAPE'
        >
          <Link className='mlink' to='/' style={{ outline: 'none', textDecoration: 'none' }}><img src={Home} alt='' style={{ height: '2rem', width: '2rem', cursor: 'pointer' }} /> </Link>
        </Tooltip>
        <Tooltip
          label="Post"
          withArrow
          position="bottom"
          placement="center"
          gutter={10}
          color='cyan'>
          <img className='mlink' onClick={() => setOpenModel(true)} src={Setting} alt='' style={{ height: '2rem', width: '2rem', cursor: 'pointer' }} />
        </Tooltip>
          {openModel && <ShareModel setOpenModel={setOpenModel} openModel={openModel} />}
        <Tooltip
          label="Notification"
          withArrow
          position="bottom"
          placement="center"
          gutter={10}
          color='yellow'>
          <img className='mlink' src={Notification} alt='' style={{ height: '2rem', width: '2rem', cursor: 'pointer' }} />
        </Tooltip>
        <Tooltip
          label="Chat"
          withArrow
          position="bottom"
          placement="center"
          gutter={10}
          color='green'>
          <Link className='mlink' to='/chat' style={{ outline: 'none', textDecoration: 'none' }}><img src={Chat} alt='' style={{ height: '2rem', width: '2rem', cursor: 'pointer' }} /></Link>
        </Tooltip>
      </div>
      <div className="activeUser" style={{height:'4.5rem'}}>
        {friends?<div className="inner" style={{height:'4.5rem'}}>
          {
            friends?.map((follower, id) => {
              return (
                <div  key={id}>
                  {followedUser.allUsers?.find((user)=>user?._id===follower)&&<ActiveUser follower={follower} online={followedUser.onlineStatus(follower)}/>}
                </div>
              )
            })
          }
        </div>:<div style={{width:'95%', display:'flex', justifyContent:'center', }}>
              <Loader />
          </div>}
      </div>
      <div className='users'>
        <h3>World Around's You</h3>
        {followedUser.allUsers?<div className="usersList">
          {
            followedUser.allUsers?.map((allUser, id) => {
              return (
                <div key={id}>
                  {user?._id !== allUser?._id &&<AllUser allUser={allUser} />}
                </div>
              )
            })
          }
        </div>:<div style={{width:'95%', display:'flex', justifyContent:'center', }}>
              <Loader />
          </div>}

      </div>
    </div>
  );
}

export default UserSide;
