import React, { useContext, useEffect, useState } from 'react'
import './Chat.css'
import Logo from '../../img/logo1.png'
import { UilSearch } from '@iconscout/react-unicons'
import { Link } from 'react-router-dom'
import Add from '../../img/add.png'
import Friends from '../../components/messageSection/Friends'
import { useSelector } from 'react-redux';
import { getUserChat } from '../../api/ChatRequest.js'
import FriendList from '../../components/messageSection/friends/FriendList'
import { Loader } from '@mantine/core'
import CurrentChat from '../../components/messageSection/currentChat/CurrentChat'
import { follwUser } from '../../App'


const Chat = () => {

  const followedUser = useContext(follwUser);
  const [open, setOpen] = useState(false);
  const [chatFriend, setChatFriend] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const authUser = useSelector((state) => state.authReducer.authData?.user);




  useEffect(() => {
    getUserChat(authUser._id).then(res => {
      setChatFriend(res.data)
    }).catch(err => {
      console.log(err)
    })
  },[chatFriend,authUser])


  return (
    <div className='chat'>

      {/* left Side */}
      <div className='friends' >
        {open === false ? <>
          <div className='logo'>
            <Link className='mlink' to='/' style={{ outline: 'none', textDecoration: 'none' }}><img src={Logo} alt='logo' style={{ height: '60px' }} /></Link>
            <div className='search' style={{ background: 'rgb(0,0,0,0.4)' }}>
              <input type='text' placeholder='# Explore' style={{ color: '#fff' }} />
              <div className='s-icon'><UilSearch /></div>
            </div>
          </div>
          {chatFriend?.length > 0  ? <div style={{ padding: '0.7rem', marginTop: '-1rem' }}>
            {chatFriend?.map((chat, id) => (
              <div key={id} onClick={()=>setCurrentChat(chat)}>
                  {followedUser.allUsers?.find((user)=>user?._id===chat?.members.find((id)=>id!==authUser._id))&&<FriendList chat={chat} online={followedUser.checkOnlineStatus(chat)}/>}
              </div>
            ))}
          </div> : 
          <div style={{ height: '100%', display: 'flex',flexDirection:'column', alignItems: 'center', justifyContent: 'center', marginTop: '-3rem' }}>
          <span style={{ fontSize: '2rem', fontFamily: 'serif', fontWeight: 'bold', color: 'darkslategray', textAlign: 'center', width: '18rem', zIndex: '1' }}>Add Your Frinds to Start a Conversation !</span>
            <Loader />
          </div>}

          <div className='add' style={{ display: open ? 'none' : 'block' }}>
            <img src={Add} alt='' height={40} onClick={() => setOpen(true)} />
          </div>
        </>: <Friends setOpen={setOpen} />}
      </div>

      {/* right Side */}
      {currentChat !==null ? <CurrentChat currentChat={currentChat} setCurrentChat={setCurrentChat} online={followedUser.checkOnlineStatus(currentChat)}/>
      :<div className='chats'>
        <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', padding: '1rem', position: 'relative' }}>
          <img src='https://cdn.dribbble.com/users/20368/screenshots/3949907/live_chat_anim_2.gif' alt='' style={{ position: 'absolute', height: '96%', width: '97%', borderRadius: '0.3rem', opacity: '0.2' }} />
          <span style={{ fontSize: '2rem', fontFamily: 'serif', fontWeight: 'bold', color: 'darkslategray', textAlign: 'center', width: '500px', zIndex: '1' }}>Select Your Frind to Start a Conversation !</span>
        </div>
      </div>}
      
    </div>
  )
}

export default Chat
