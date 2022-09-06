import React, { useEffect, useState } from 'react'
import Share from '../../postSide/share/Share'
import Logo from '../../../img/logo1.png'
import { useSelector } from 'react-redux'
import { get_a_User } from '../../../api/GetAllUsersRequest'
import { MdDelete } from 'react-icons/md'
import { deleteChatFriend } from '../../../api/ChatRequest'
import './CurrentChat.css'
import { Menu } from '@mantine/core'
import MessageBox from '../messageBox/MessageBox'
import { deleteAllMessages, getMessages } from '../../../api/MessageRequest'


const CurrentChat = ({currentChat,setCurrentChat,online}) => {

    
  const availablePublicFolderImage = process.env.REACT_APP_PUBLIC_IMAGES
  const authUser = useSelector((state) => state.authReducer.authData?.user);
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  
  // get chat friend
  useEffect(() => {
    const friendId = currentChat?.members.find((id)=>id!==authUser._id)
    if (currentChat !==null) {
      get_a_User(friendId).then(res => {
        setUser(res.data)
      }).catch(err => {
        console.log(err)
      })
    }
  }, [user])
  
  // get messages
  useEffect(() => {
      if (currentChat !==null) {
        getMessages(currentChat._id).then(res => {
          setMessages(res.data)
        }).catch(err => {
          console.log(err)
        })
      }
  }, [messages])

  // delete chat friend
  const handleDeleteFriend =()=>{
    const friendId = currentChat?.members.find((id)=>id!==authUser._id)
    const usersData = {
      firstId: authUser?._id,
      secondId: friendId
  }
    try {
      deleteChatFriend(usersData)
      setCurrentChat(null)
    } catch (error) {
      console.log(error);
    }
  }
  
  // delete chat friend All messages
  const handleDeleteMessages =()=>{
    try {
      deleteAllMessages(currentChat?._id)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
    {currentChat !==null? <div className='chats'>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 1rem' }}>
          <div style={{ display: 'flex', gap: '0.7rem'}}>
                <img src={user?.profilePicture ? availablePublicFolderImage + user?.profilePicture : Logo} alt='logo' style={{
                    height: '50px', width: '50px', borderRadius: '100%',
                    boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px'
                }} />
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <span style={{ fontSize: '1.5rem', fontFamily: 'serif', fontWeight: 'bolder', color: 'darkslategray' }}>{user?.firstname} {user?.lastname}</span>
                    <div style={{display:'flex', gap:'0.7rem', alignItems:'center'}}>
                        <span style={{ fontSize: '1rem', fontFamily: 'serif', fontWeight: '600', color: 'darkgreen' }}>{user?.username}</span>
                        <span className='isonline' style={{ fontSize: '0.9rem', fontFamily: 'serif', fontWeight: '600', animation: 'blink 3s linear infinite' }}>{online ? 'Online' : 'Offline'}</span>
                    </div>
                </div>
          </div>
          <Menu style={{marginTop:'-0.7rem'}} trigger="hover" opensdelay={100} closedelay={400} placement="end" position='bottom' withArrow >
          <div style={{
            display:"flex", flexDirection:'column', gap:"0.3rem", marginLeft:'0.5rem', padding: '0.5rem 0rem'
          }} className='menuItem'>
            <span onClick={handleDeleteFriend} style={{display:"flex", color:'green', gap:"0.3rem", fontWeight:'bold', fontFamily:'serif', cursor:'pointer', alignItems:'center',fontSize:'small'}}><MdDelete size={18} className='delete'/>Delete {user?.firstname}</span>
            <span onClick={handleDeleteMessages} style={{display:"flex",color:'darkgreen', gap:"0.3rem", fontWeight:'bold', fontFamily:'serif', cursor:'pointer', alignItems:'center',fontSize:'small'}}><MdDelete size={18} className='delete'/>Delete Messages</span>
          </div>
        </Menu>
        </div>

        {/* sender message */}
        <div className='senderInput'>
          <Share message chatId={currentChat?._id} />
        </div>

        {/* message box */}
        <div className='message'>
        {messages?.map((message, id)=>(
            <MessageBox message={message} key={id}/>
        ))}
        </div>
      </div> :
        <div className='chats'>
          <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', padding: '1rem', position: 'relative' }}>
            <img src='https://cdn.dribbble.com/users/20368/screenshots/3949907/live_chat_anim_2.gif' alt='' style={{ position: 'absolute', height: '96%', width: '97%', borderRadius: '0.3rem', opacity: '0.2' }} />
            <span style={{ fontSize: '2rem', fontFamily: 'serif', fontWeight: 'bold', color: 'darkslategray', textAlign: 'center', width: '500px', zIndex: '1' }}>Select Your Frind to Start a Conversation !</span>
          </div>
        </div>}
    </>
  )
}

export default CurrentChat