import React from 'react';
import PostSide from '../../components/postSide/PostSide';
import ProfileSide from '../../components/profileSide/ProfileSide';
import SlideMenu from '../../components/slideMenu/SlideMenu';
import UserSide from '../../components/userSide/UserSide';
import './Home.css'
const Home = () => {

  return (
    <div className='home'>
    <div className="leftmenu">
        <SlideMenu />
    </div>
      <div className="profile">
        <ProfileSide />
      </div>
      <div className="post">
        <PostSide/>
      </div>
      <div className="user">
        <UserSide/>
      </div>
    </div>
    
  );
}

export default Home;
