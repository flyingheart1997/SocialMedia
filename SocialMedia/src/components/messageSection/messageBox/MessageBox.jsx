import React, { useEffect } from 'react'
import './MessageBox.css'
import { useSelector } from 'react-redux';
import {format} from 'timeago.js'
import { MdDelete } from 'react-icons/md';
import { delete_a_Message } from '../../../api/MessageRequest';
import { useRef } from 'react';

const MessageBox = ({message}) => {
    const authUser = useSelector((state) => state.authReducer.authData?.user);
    const availablePublicFolderImage = process.env.REACT_APP_PUBLIC_IMAGES
    const availablePublicFolderVideo = process.env.REACT_APP_PUBLIC_VIDEOS
    const scroll = useRef()

    const deleteMessage = () => {
        try {
            delete_a_Message(message._id)
        } catch (error) {
            console.log(error)
        }
    }

    // allways scroll to last message
    useEffect(() => {
        scroll.current?.scrollIntoView({behavior: 'smooth'})
    },[])

    return (
        <div className='allmessage' ref={scroll}>
            {/* receiver side */}
            {message?.senderId!==authUser._id ?<div style={{ display: 'flex', flexDirection: 'column', maxWidth: '250px', alignSelf: 'flex-start' }}>
                {message?.image&&<img src={message?.image && availablePublicFolderImage + message?.image } alt='' style={{ borderRadius: '0.3rem' ,height:'150px', width:'230px'}} />}
                {message?.video&&<video height={150} width={230} controls style={{borderRadius:'0.3rem'}}>
                <source src={message?.video && availablePublicFolderVideo + message?.video}  type='video/mp4' />
                </video>}
                <div style={{ display: 'flex', flexDirection: 'column', marginTop: '0.5rem', padding: '0.5rem ', borderRadius: '1px 10px', background: 'darkgoldenrod', }}>
                    {message?.text&&<span style={{ color: '#ffffff', fontFamily: 'serif' }}>{message?.text}</span>}
                </div>
                <span style={{ display: 'flex', color: '#fff', alignSelf: 'flex-start', paddingLeft: '0.2rem', fontFamily: 'serif', fontSize: '0.7rem' }}>{format(message?.createdAt)}</span>
            </div>:
            <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '250px', alignSelf: 'flex-end' }}>
                {message?.image&&<img src={message?.image && availablePublicFolderImage + message?.image } alt=''  style={{borderRadius:'0.3rem',height:'150px', width:'230px'}}/>}
                {message?.video&&<video height={150} width={230} controls style={{ borderRadius: '0.3rem' }}>
                    <source src={message?.video && availablePublicFolderVideo + message?.video} type='video/mp4' />
                </video>}
                <div className='hoverMessage' style={{ display: 'flex',marginTop: '0.5rem', padding: '0.5rem ', borderRadius: '10px 1px', background: '#ffd900a0',alignItems:'center',justifyContent:'space-between'}}>
                    {message?.text !=='' &&<span className='showMessage' style={{ color: 'white', fontFamily: 'serif', alignSelf: 'flex-end',textAlign:'start',alignItems:'center',marginRight:'0.5rem' }}>{message?.text}</span>}
                    {message?.senderId === authUser._id &&<span onClick={deleteMessage} className='deleteMessage' style={{fontFamily: 'serif',alignSelf: 'flex-end',color:'white',textAlign:'center',marginBottom:'-0.05rem'}}><MdDelete/></span>}
                </div>
                <span style={{ display: 'flex', color: '#fff', alignSelf: 'flex-end', paddingRight: '0.2rem', fontFamily: 'serif', fontSize: '0.7rem',padding:'0.2rem'}}>{format(message?.createdAt)}</span>
            </div>}
        </div>
    )
}

export default MessageBox