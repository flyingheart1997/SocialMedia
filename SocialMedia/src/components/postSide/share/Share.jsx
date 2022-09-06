import React, { useState, useRef } from 'react';
import './Share.css'
import { UilScenery } from '@iconscout/react-unicons'
import { UilPlayCircle } from '@iconscout/react-unicons'
import InputEmoji from "react-input-emoji";
import { useDispatch, useSelector } from 'react-redux'
import { uploadImage, uploadPost, uploadVideo } from '../../../redux/actions/UploadAction.js';
import ProfilePic from '../../../img/logo1.png'
import { createNewMessage } from '../../../api/MessageRequest';




const Share = ({ sideShare, message, chatId }) => {

    const [inputValue, setInputValue] = useState('');
    const dispatch = useDispatch()
    const [image, setImage] = useState(null)
    const [video, setVideo] = useState(null);
    const imageRef = useRef()
    const videoRef = useRef()

    const availablePublicFolder = process.env.REACT_APP_PUBLIC_IMAGES

    const { user } = useSelector(state => state.authReducer.authData)

    const onImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0]
            setImage(img)
        }
    }
    const onVideoChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            let vid = e.target.files[0]
            setVideo(vid)
        }
    }


    const handleShare = (e) => {
        e.preventDefault();
        if(!message && !chatId){
            const newPost = {
                userId: user._id,
                desc: inputValue,
                likes: [],
                date: new Date(),
                comments: [],
            }
            if (image) {
                const data = new FormData()
                const filename = Date.now() + image.name
                data.append('name', filename)
                data.append('file', image)
                newPost.image = filename
                try {
                    dispatch(uploadImage(data))
                } catch (error) {
                    console.log(error);
                }
            }
            if (video) {
                const data = new FormData()
                const filename = Date.now() + video.name
                data.append('name', filename)
                data.append('file', video)
                newPost.video = filename
                try {
                    dispatch(uploadVideo(data))
                } catch (error) {
                    console.log(error);
                }
            }
            dispatch(uploadPost(newPost))
            setInputValue('')
            setImage(null)
            setVideo(null)
            if (sideShare) {
                window.location.reload()
            }
        }else{
            const newMessage = {
                chatId: chatId,
                senderId: user._id,
                text: inputValue,

            }
            if (image) {
                const data = new FormData()
                const filename = Date.now() + image.name
                data.append('name', filename)
                data.append('file', image)
                newMessage.image = filename
                try {
                    dispatch(uploadImage(data))
                } catch (error) {
                    console.log(error);
                }
            }
            if (video) {
                const data = new FormData()
                const filename = Date.now() + video.name
                data.append('name', filename)
                data.append('file', video)
                newMessage.video = filename
                try {
                    dispatch(uploadVideo(data))
                } catch (error) {
                    console.log(error);
                }
            }
            createNewMessage(newMessage)
            setInputValue('')
            setImage(null)
            setVideo(null)
        }
    }


    return (
        <>
            <div className='share' style={{ backgroundColor: message && '#c6acac' }}>
                <div className="innerShare">
                    <img src={user?.profilePicture ? availablePublicFolder + user.profilePicture : ProfilePic} alt='' />
                    <div className='writePost'>
                        <InputEmoji
                            value={inputValue}
                            onChange={setInputValue}
                            placeholder="Type a message"
                            required
                        />
                        <div className='shareOptions' style={{ marginTop: message && '-0.7rem' }}>
                            {!image ? <div className='option' style={{ color: '#8C2A2A', fontSize: 'small', fontFamily: 'serif', fontWeight: 'bold' }}
                                onClick={() => imageRef.current.click()}
                            >
                                <span><UilScenery /> Photo</span>
                            </div> : <div className='option' style={{ color: '#8C2A2A', fontSize: 'small', fontFamily: 'serif', fontWeight: 'bold' }}
                                onClick={() => setImage(null)}
                            >
                                <span><UilScenery /> Cancle</span>
                            </div>}

                            {!video ? <div className='option' style={{ color: 'var(--video)', fontSize: 'small', fontFamily: 'serif', fontWeight: 'bold' }}
                                onClick={() => videoRef.current.click()}
                            >
                                <span><UilPlayCircle /> Video</span>
                            </div> : <div className='option' style={{ color: 'var(--video)', fontSize: 'small', fontFamily: 'serif', fontWeight: 'bold' }}
                                onClick={() => setVideo(null)}
                            >
                                <span><UilPlayCircle /> Cancle</span>
                            </div>}
                            <button onClick={handleShare} style={{ cursor: inputValue === '' ? 'no-drop' : 'pointer' }} disabled={inputValue==='' ? true:false} className='button'>Share</button>
                            <div style={{ display: 'none' }}>
                                <input type='file' ref={imageRef} name='myImage' onChange={onImageChange} />
                                <input type='file' ref={videoRef} name='myImage' onChange={onVideoChange} />
                            </div>
                        </div>
                    </div>
                </div>
                {!message && <>
                    {image !== null && (
                        <div className="previewImg" style={{ padding: '0.5rem' }}>
                            <img src={URL.createObjectURL(image)} alt='' />
                        </div>
                    )}
                    {video !== null && (
                        <div className="previewImg" style={{ padding: '0.5rem' }}>
                            <video width="100%" height='300px' controls >
                                <source src={URL.createObjectURL(video)} type="video/mp4" />
                            </video>
                        </div>
                    )}
                </>}
            </div>
            {message && (image !== null || video !== null) ? <div style={{ position: 'absolute', width: '150px', height: '100px', left:'1rem',bottom: '1rem', background: '#c6acac', zIndex: '999', boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px' }}>
                {message && <>
                    {image !== null && (
                        <div className="previewImg" style={{ padding: '0.5rem' }}>
                            <img src={URL.createObjectURL(image)} alt='' style={{ height: '85px' }} />
                        </div>
                    )}
                    {video !== null && (
                        <div className="previewImg" style={{ padding: '0.5rem' }}>
                            <video width="100%" height='85px' controls >
                                <source src={URL.createObjectURL(video)} type="video/mp4" />
                            </video>
                        </div>
                    )}
                </>}
            </div> : ''}
        </>
    );
}

export default Share;


