import React, { useContext } from 'react';
import './AllUser.css'
import ProfilePic from '../../../img/logo1.png'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { follwUser } from '../../../App';

const AllUser = ({ allUser,color }) => {

  const followedUser = useContext(follwUser);
  const availablePublicFolder = process.env.REACT_APP_PUBLIC_IMAGES
  const authUser = useSelector((state) => state.authReducer.authData?.user);


  return (
    <div className="userr" >
      <Link to={`/profile/${allUser?._id}`} className='usersDetail' style={{textDecoration:'none', underLIne:'none'}}>
        <div className='usersDetail'>
          <img src={allUser?.profilePicture ? availablePublicFolder + allUser?.profilePicture : ProfilePic} alt='' />
          <div className='userName'>
            <span style={{color:color?'#ffffff':''}}>{allUser?.firstname} {allUser?.lastname}</span>
            <span style={{color:color?'#dddd':''}}>{allUser?.username}</span>
          </div>
        </div>
      </Link>
      <button onClick={()=>followedUser.handlFollow(allUser)} style={{color:color?'#ffffff':''}} className={allUser?.follower?.includes(authUser?._id) ?'fbutton':"button"}>{allUser?.follower?.includes(authUser?._id)  ? 'UnFollow': 'Follow'}</button> 
    </div>
  );
}

export default AllUser;
