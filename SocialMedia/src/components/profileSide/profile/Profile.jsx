import React, { useEffect, useState } from 'react';
import CoverPic from '../../../img/a.jpg'
import ProfilePic from '../../../img/logo1.png'
import './Profile.css'
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { get_a_User } from '../../../api/GetAllUsersRequest';

const Profile = () => {
  
  const user = useSelector((state) => state.authReducer.authData?.user);
  const availablePublicFolder = process.env.REACT_APP_PUBLIC_IMAGES
  const [myProfile,setMyProfile] = useState(null)
  
  useEffect(() => {
    get_a_User(user?._id).then(res => {
      setMyProfile(res.data)
    }).catch(err => {
      console.log(err)
    })
  },[myProfile])

  return (
    <div className='profileCard'>

      <div className='profileImage'>
        <div className="cover" style={{height:'135px', overflow:'hidden',borderRadius:'0.3rem'}}>
            <img src={user?.coverPicture ? availablePublicFolder +user?.coverPicture : CoverPic} alt=''/>
        </div>
        <img src={user?.profilePicture ? availablePublicFolder + user?.profilePicture : ProfilePic} alt=''/>
      </div>

      <div className='profileName'>
        <span>{user?.firstname} {user?.lastname}</span>
        <span>{user?.username}</span>
      </div>

      <div className='followStatus'>
        <hr/>
        <div>
            <div className='follow' >
                <span>{myProfile?.follower?.length}</span>
                <span>Followers</span>
            </div>
            <div className='vl'></div>
            <div className='follow'>
            <span>{myProfile?.following.length}</span>
                <span>Following</span>
            </div>
        </div>
        <hr/>
      </div>

      <Link to= {`/profile/${user?._id}`} className='linkto' style={{outline:'none',textDecoration:'none'}}><span>View Profile</span></Link>
    </div>
  );
}

export default Profile;
