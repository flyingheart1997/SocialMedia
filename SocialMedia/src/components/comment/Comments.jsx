import React, { useState } from 'react';
import Profile from '../../img/logo1.png'
import InputEmoji from "react-input-emoji";
import './Comments.css'
import Comment from './Comment';
import { useDispatch, useSelector } from 'react-redux';
import { uploadComment } from '../../redux/actions/UploadAction';
import { useEffect } from 'react';
import { getAllComments } from '../../api/UploadRequest';
import { Loader } from '@mantine/core';

const Comments = ({postId}) => {
    const dispatch = useDispatch()
    const {user} = useSelector(state => state.authReducer.authData)
    const [inputComment, setInputComment] = useState('');
    const [allComents, setAllComents] = useState(null);
    const handleOnEnter =(inputComment)=> {
        const newComment={
            postId: postId,
            userId: user?._id,
            comment: inputComment,
        }
        dispatch(uploadComment(newComment))
    }

    useEffect(()=>{
        getAllComments(postId).then(res=>{
            setAllComents(res.data)
        }).catch(err=>{
            console.log(err)
        })
    },[allComents,postId])

    return (
        <>
            <div className='share' style={{ margin: '0.5rem', width: '95%' }}>
                <div className="innerShare" style={{ gap: '0.4rem' }}>
                    <img src={Profile} alt='' style={{ marginLeft: '0.5rem' }} />
                    <div className='writePost'>
                        <InputEmoji
                            value={inputComment}
                            onChange={setInputComment}
                            cleanOnEnter
                            onEnter={handleOnEnter}
                            placeholder="Type a message"
                        />
                    </div>
                </div>
                <div>
                </div>
            </div>
            <div className='commentScroll' style={{width:'95%',margin: '1rem', overflow:'auto', justifyContent:'center', }}>
                {allComents? allComents.map((comment, id) => {
                    return (
                        <div style={{marginBottom:'0.7rem'}}  key={id} >
                            <Comment comment={comment} />
                        </div>
                    )
                }):<div style={{width:'95%', display:'flex', justifyContent:'center', }}>
                    <Loader />
                </div>}
            </div>
        </>
    );
}

export default Comments;


