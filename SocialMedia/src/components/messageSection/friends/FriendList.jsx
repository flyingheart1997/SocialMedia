import React, { useEffect, useState } from 'react';
import ProfilePic from '../../../img/logo1.png'
import './FriendList.css'
import { get_a_User } from '../../../api/GetAllUsersRequest'
import { useSelector } from 'react-redux';


const FriendList = ({chat ,online}) => {
    const availablePublicFolder = process.env.REACT_APP_PUBLIC_IMAGES
    const [friend, setFriend]= useState('')
    const authUser = useSelector((state) => state.authReducer.authData?.user);
    
  useEffect(() => {
    const friendId = chat?.members.find((id)=>id!==authUser._id)
    get_a_User(friendId).then(res => {
        setFriend(res.data)
    }).catch(err => {
      console.log(err)
    })
  },[friend])

  

  return (
      <div className='myFriendList' style={{marginBottom: '0.5rem',}}>
        <img src={friend?.profilePicture ? availablePublicFolder + friend?.profilePicture : ProfilePic} alt='' />
        <div className='myfriendsDetails'>
            <span>{friend?.firstname} {friend?.lastname}</span>
            <span style={{color:'white'}}>{friend?.username}</span>
        </div>
        {online && <div  style={{display:'flex',position:'absolute', right:'0.5rem', top:'0.5rem'}} className='online'></div>}
      </div>
  );
}

export default FriendList;
