import React, { useEffect, useState } from 'react';
import './ActiveUser.css'
import ProfilePic from '../../../img/logo1.png'
import { Link } from 'react-router-dom';
import { get_a_User } from '../../../api/GetAllUsersRequest';


const ActiveUser = ({follower, online }) => {

  const availablePublicFolder = process.env.REACT_APP_PUBLIC_IMAGES
  const [friend, setFriend]= useState(null)
  useEffect(() => {
    get_a_User(follower).then(res => {
        setFriend(res.data)
    }).catch(err => {
      console.log(err)
    })
  },[friend])
  
  return (
    <>
      <Link to={`/profile/${friend?._id}`} className="active">
        <img src={friend?.profilePicture ? availablePublicFolder + friend?.profilePicture : ProfilePic} alt='' />
      {online &&<div className='dot'></div>}
    </Link>
    </>
  );
}

export default ActiveUser;
