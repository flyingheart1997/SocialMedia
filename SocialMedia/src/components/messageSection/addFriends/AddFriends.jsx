import React, { useEffect, useState } from 'react'
import ProfilePic from '../../../img/logo1.png'
import { useSelector } from 'react-redux'
import { get_a_User } from '../../../api/GetAllUsersRequest'
import './AddFriends.css'
import { createNewChat } from '../../../api/ChatRequest'

const AddFriends = ({friendId,  setOpen,}) => {
    const availablePublicFolder = process.env.REACT_APP_PUBLIC_IMAGES
    const [friend, setFriend]= useState('')
    const authUser = useSelector((state) => state.authReducer.authData?.user);

  useEffect(() => {
    get_a_User(friendId).then(res => {
        setFriend(res.data)
    }).catch(err => {
      console.log(err)
    })
  },[friend])

  const addfriend = ()=>{
    const usersData = {
        senderId: authUser?._id,
        receiverId: friend._id
    }
    createNewChat(usersData)
    setOpen(false)
  }


  return (
    <div className='myFriendList' onClick={addfriend}>
        <img src={friend?.profilePicture ? availablePublicFolder + friend?.profilePicture : ProfilePic} alt='' />
        <div className='myfriendsDetails'>
            <span>{friend?.firstname} {friend?.lastname}</span>
            <span >{friend?.username}</span>
        </div>
      </div>
  )
}

export default AddFriends
