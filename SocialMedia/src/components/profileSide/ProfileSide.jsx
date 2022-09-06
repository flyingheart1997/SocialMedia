import React, { useContext } from 'react';
import Followers from './followers/Followers';
import Profile from './profile/Profile';
import './ProfileSide.css'
import Logo from '../../img/logo1.png'
import {UilSearch} from '@iconscout/react-unicons'
import { follwUser } from '../../App';
import { useSelector } from 'react-redux';
import { Loader } from '@mantine/core';
const ProfileSide = () => {
  
  const followedUser = useContext(follwUser);
  const authUser = useSelector((state)=>state.authReducer.authData?.user)

  return (
    <div className='profileSide'>
      <div className='logoSearch'>
        <img src={Logo} alt='logo' style={{ height: '40px' }} />
        <div className='search'>
          <input type='text' placeholder='# Explore' />
          <div className='s-icon'><UilSearch /></div>
        </div>
      </div>
      <div className='profileScroll'>
        <Profile />
        <div className='followers'>
          <h3>Who Followes You</h3>
          {followedUser.allUsers?<div className="followersList">
            {
              followedUser.allUsers?.map((followUser, id) => {
                return (
                  <div key={id}>
                    {followUser?.following.includes(authUser?._id) &&
                      <Followers follower={followUser} />
                    }
                  </div>
                )
              })
            }
          </div>:
          <div style={{width:'100%', display:'flex', justifyContent:'center', }}>
            <Loader />
          </div>}

        </div>
      </div>
    </div>
  );
}

export default ProfileSide;
