import React from 'react';
import { Menu } from '@mantine/core';
import { MdDeleteSweep } from 'react-icons/md';
import Profile from '../../img/logo1.png'
import './comment.css'
import { useSelector } from 'react-redux';
import { deletePostComment } from '../../api/UploadRequest';

const Comment = ({comment}) => {
    const availablePublicFolder = process.env.REACT_APP_PUBLIC_IMAGES
    const authUser = useSelector((state) => state.authReducer.authData?.user);

    const handleDeleteComment = () => {
        if (authUser?._id === comment?.userId?._id ) {
            const commentDetails = {
                commentId: comment._id,
                postId: comment.postId,
                userId: authUser._id,
            }
            deletePostComment(commentDetails)
        }
        else {
          console.log("You are not authorized to delete this Comment !");
        }
      }

    return (
        <div className='share' style={{ background: '#dddddd' }}>
            <div className="innerShare" style={{ gap: '0.4rem', display: 'flex', alignItems: 'center' }}>
                <img src={comment?.userId.profilePicture ? availablePublicFolder + comment?.userId?.profilePicture : Profile} alt='' style={{ marginLeft: '0.5rem', width: '2.5rem', height: '2.5rem' }} />
                <div className='writePost' style={{ gap: '0rem' }}>
                    <span style={{ color: '#160040', fontWeight: 'bold', fontFamily: 'serif', fontSize: '1.2rem' }}>{comment?.userId?.firstname} {comment?.userId?.lastname}</span>
                    <span style={{ color: '#445000', fontFamily: 'serif', fontSize: '0.9rem' }}>{comment?.createdAt.slice(0,10)}</span>
                </div>
                {authUser?._id===comment?.userId?._id && <div style={{ marginTop: '-1.5rem', marginRight: '-0.5rem' }}>
                    <Menu trigger="hover" opendelay={100} closedelay={400} placement="end" position='bottom' withArrow >
                        <div onClick={handleDeleteComment} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', cursor: 'pointer', color: 'green' }}><MdDeleteSweep size={24} /><span style={{ fontWeight: 'bold', fontFamily: 'serif', fontSize: 'medium' }}>Delete Commant</span></div>
                    </Menu>
                </div>}
            </div>
            <span style={{ color: '#120040', fontWeight: 'medium', fontFamily: 'serif', fontSize: '1rem', padding: '1rem', marginLeft: '2.5rem', marginTop: '-1rem' }}>{comment?.comment}</span>
            <div>
            </div>
        </div>
    );
}

export default Comment;
