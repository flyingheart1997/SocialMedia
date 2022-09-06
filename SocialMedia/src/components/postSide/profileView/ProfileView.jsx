import React, { useContext, useEffect, useState} from 'react';
import './ProfileView.css'
import {UilHome} from '@iconscout/react-unicons'
import {UilFacebookF} from '@iconscout/react-unicons'
import {UilInstagram} from '@iconscout/react-unicons'
import {UilTwitter} from '@iconscout/react-unicons'
import {UilBuilding} from '@iconscout/react-unicons'
import {UilHeartAlt} from '@iconscout/react-unicons'
import { useParams } from 'react-router-dom';
import EditProfileModel from '../../model/EditProfileModel';
import { Menu } from '@mantine/core';
import {UilEdit} from '@iconscout/react-unicons'
import { MdDeleteSweep } from 'react-icons/md';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import CoverPic from '../../../img/a.jpg'
import ProfilePic from '../../../img/logo1.png'
import { logOut } from '../../../redux/actions/AuthAction.js';
import { follwUser } from '../../../App';
import { deleteUserAccountRequest, get_a_User } from '../../../api/GetAllUsersRequest';
import { getUserPosts } from '../../../api/GetPostRequest';


const ProfileView = ({profile,userPosts}) => {
  const followedUser = useContext(follwUser);
  const dispatch = useDispatch()
  const {userId}  = useParams()
  const [userProfile, setUserProfile]=useState(null)
  const authUser = useSelector((state) => state.authReducer.authData?.user);
  const availablePublicFolder = process.env.REACT_APP_PUBLIC_IMAGES
  const [openModel, setOpenModel] = useState(false)
  const [noOfPost, setNoOfPost] = useState(null)


  useEffect(() => {
    if (!profile && userId){
      get_a_User(userId).then(res => {
        setUserProfile(res.data)
      }).catch(err => {
        console.log(err)
      })
    }else{
      get_a_User(authUser?._id).then(res => {
        setUserProfile(res.data)
      }).catch(err => {
        console.log(err)
      })
    }
  },[userProfile])

    useEffect(() => {
      if(profile){
        getUserPosts(authUser?._id).then(res =>{
          setNoOfPost(res.data?.length)
        }).catch(err =>{
          console.log(err)
        })
      }
    },[noOfPost])
    


  const handleLogOut = () => {
    try {
      dispatch(logOut())
      window.location.reload()
    } catch (error) {
      console.log(error);
    }
  }

  const deleteUserAccount = () => {
    const confirmUser = window.confirm('Are you sure you want to delete your account?')
    
    if(authUser._id === userProfile._id && confirmUser){
         try {
            deleteUserAccountRequest(authUser._id)
            localStorage.removeItem('store')
            window.location.reload()
         } catch (error) {
           console.log(error);
         }
      }
    else{
      console.log('you are not authorized delete account');
    }
  }

  return (
    <div className='profileVIewCard'>
      {userProfile?._id === authUser?._id && <div className="menuOption">
        <Menu trigger="hover" opensdelay={100} closedelay={400} placement="end" position='bottom' withArrow >
          <div style={{
            display:"flex", flexDirection:'column', gap:"0.3rem", marginLeft:'0.5rem', padding: '0.5rem 0rem'
          }} className='menuItem'>
            <span onClick={deleteUserAccount} style={{display:"flex", color:'green',fontFamily:'serif', gap:"0.3rem", fontWeight:'bold', cursor:'pointer', alignItems:'center',fontSize:'small'}}><RiLogoutBoxRLine size={24}/>Delete Account</span>
            <span onClick={()=>setOpenModel(true)} style={{display:"flex",fontFamily:'serif',color:'gray', gap:"0.3rem", fontWeight:'bold', cursor:'pointer', alignItems:'center',fontSize:'small'}}><UilEdit/>Edit Profile</span>
            <span onClick={handleLogOut} style={{display:"flex",fontFamily:'serif', color:'red', gap:"0.3rem", fontWeight:'bold', cursor:'pointer', alignItems:'center',fontSize:'small', }}><MdDeleteSweep size={28}/>LogOut</span>
          </div>
        </Menu>
      </div>}
      <div className='profileViewImage'>
        <div className="coverView" style={{height:'200px', overflow:'hidden'}}>
            <img src={userProfile?.coverPicture?availablePublicFolder + userProfile?.coverPicture : CoverPic} alt=''/>
        </div>
          <img src={userProfile?.profilePicture?availablePublicFolder + userProfile?.profilePicture : ProfilePic} alt=''/>
      </div>
        {(!profile && userId !== authUser?._id)  && <div style={{position:'absolute', right:'1rem', top:'14rem'}}><button onClick={()=>followedUser.handlFollow(userProfile)} className={userProfile?.follower?.includes(authUser?._id) ?'fbutton':"button"}>{userProfile?.follower?.includes(authUser?._id) ? 'UnFollow': 'Follow'}</button> </div>}
      
      <div className='profileViewName'>
        <span>{userProfile?.username}</span>
        <span>{userProfile?.firstname} {userProfile?.lastname} </span>
        <div className="desc">
          <span style={{marginLeft:'-0.7rem',marginBottom:'0.5rem'}}>{userProfile?.about ? userProfile.about : "write something about your self"}</span>
          <span style={{display:'flex', alignItems:'center',gap:'0.3rem',color:'#46800a'}}><UilBuilding size={20}/> <span>{userProfile?.worksAt? userProfile.worksAt : 'work place'}</span></span>
          <span style={{display:'flex', alignItems:'center',gap:'0.3rem',color:'#31600a',marginLeft:'-0.1rem'}}><UilHeartAlt size={22}/> <span>{userProfile?.relationShip ? userProfile.relationShip : 'Status'}</span></span>
          <div className="country">
            <UilHome/>
            <span>{userProfile?.livesIn ? userProfile.livesIn : 'location'}, </span>
            <span>{userProfile?.country ? userProfile.country : ''}.</span>
          </div>
          <div className="social">
            <span><UilFacebookF/> <a href={userProfile?.facebook?`https://www.facebook.com/profile.php?id=${userProfile.facebook}`:'https://www.facebook.com'} style={{textDecoration:'none'}}>@Facebook</a></span>
            <span><UilInstagram/> <a href={userProfile?.instagram?`https://www.instagram.com/${userProfile.instagram}`:'https://www.instagram.com'} style={{textDecoration:'none'}}>@Instagram</a></span>
            <span><UilTwitter/> <a href={userProfile?.twitter?`https://twitter.com/${userProfile.twitter}`:'https://twitter.com'} style={{textDecoration:'none'}}>@Twitter</a></span>
          </div>
        </div>
      </div>
      <div className='followStatus' >
        <hr/>
        <div>
            <div className='follow' >
                <span>{userProfile?.follower?.length}</span>
                <span>Followers</span>
            </div>
            <div className='vl'></div>
            <div className='follow'>
            <span>{userProfile?.following?.length}</span>
                <span>Following</span>
            </div>
            <div className='vl'></div>
            <div className='follow'>
            {profile ? <span>{noOfPost}</span>:<span>{userPosts?.length}</span>}
              <span>Posts</span>
            </div>
        </div>
        <hr/>
      </div>
      
      {openModel&&<EditProfileModel setOpenModel={setOpenModel} openModel={openModel} user={userProfile}/>}
    </div>
  );
}

export default ProfileView;
