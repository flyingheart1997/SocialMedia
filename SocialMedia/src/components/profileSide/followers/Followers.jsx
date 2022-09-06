import React, { useContext } from 'react';
import './Followers.css'
import ProfilePic from '../../../img/logo1.png'
import { Link } from 'react-router-dom';
import { follwUser } from '../../../App';
import { useSelector } from 'react-redux';

const Followers = ({ follower }) => {

  const followedUser = useContext(follwUser);
  const availablePublicFolder = process.env.REACT_APP_PUBLIC_IMAGES
  const authUser = useSelector((state) => state.authReducer.authData?.user);

  return (
    <div className="userr" style={{marginTop:'-0.5rem', paddingBottom:'0.5rem'}}>
      <Link to={`/profile/${follower?._id}`} className='usersDetail' style={{textDecoration:'none', underLIne:'none'}}>
        <div className='usersDetail'>
          <img src={follower?.profilePicture ? availablePublicFolder + follower?.profilePicture : ProfilePic} alt='' />
          <div className='userName'>
            <span>{follower?.firstname} {follower?.lastname}</span>
            <span>{follower?.username}</span>
          </div>
        </div>
      </Link>
      <button onClick={()=>followedUser.handlFollow(follower)} className={follower?.follower?.includes(authUser?._id) ?'fbutton':"button"}>{follower?.follower?.includes(authUser?._id)  ? 'UnFollow': 'Follow'}</button> 
    </div>
  );
}

export default Followers;
