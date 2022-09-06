import React, { useState } from 'react';
import './PostCard.css'
import Like from '../../../img/notheart.png'
import NotLike from '../../../img/heart.png'
import CommentImg from '../../../img/chat.png'
import share from '../../../img/right.png'
import ProfilePic from '../../../img/logo1.png'
import Comments from '../../comment/Comments'
import { Menu } from '@mantine/core';
import { MdDeleteSweep } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { likePost, deleteaPost } from '../../../api/GetPostRequest';
import {format} from 'timeago.js'


const PostCard = ({ post }) => {
  const [openComment, setOpenComment] = useState(false)
  const user = useSelector((state) => state.authReducer.authData?.user);
  const availablePublicFolderImage = process.env.REACT_APP_PUBLIC_IMAGES
  const availablePublicFolderVideo = process.env.REACT_APP_PUBLIC_VIDEOS
  const [liked, setLiked] = useState(post?.likes?.includes(user?._id)?true:false)
  const [likes, setLikes] = useState(post?.likes?.length)

  const handleLike = () => {
    setLiked((prev) => !prev)
    likePost(post?._id, user?._id)
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1)
  }

  const handleDeletePost = () => {
    const confirm = window.confirm("Are you sure you want to delete this post ?")
    if (user?._id === post?.userId?._id && confirm) {
      deleteaPost(post._id, user._id)
    }
    else {
      console.log("You are not authorized to delete this post !");
    }
  }

  return (
      <div className='postCard'>
      <div className="menuOption">
        {user?._id === post?.userId?._id && <Menu trigger="hover" opendelay={100} closedelay={400} placement="end" position='bottom' withArrow >
          <div onClick={handleDeletePost} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: 'green' }}>
            <MdDeleteSweep size={24} /><span style={{ fontWeight: 'bold', fontFamily: 'serif', fontSize: 'medium' }}>Delete Post</span>
          </div>
        </Menu>}
      </div>
      {post?.image && <img src={post?.image ? availablePublicFolderImage + post?.image : ''} alt='' />}
      {post?.video && <video  width="100%" height="100%" controls>
        <source src={post?.video ? availablePublicFolderVideo + post?.video : ''} type="video/mp4"/>
      </video>}
      <div className='details'>
        <div className='othdetail'>
          <span style={{ gap: '2px', fontFamily: 'serif', fontSize: 'medium', display: 'flex', alignItems: 'center' }}>
            {likes}
            <img onClick={handleLike} src={liked ? Like : NotLike} alt='' style={{ height: '1.5rem', width: '1.5rem', cursor: 'pointer' }} />
          </span>
          <img onClick={() => setOpenComment(!openComment)} src={CommentImg} alt='' style={{ height: '1.6rem', width: '1.6rem', cursor: 'pointer' }} />
          <img src={share} alt='' style={{ height: '2.2rem', width: '2rem', cursor: 'pointer' }} />
        </div>
        <div className='imgdetail'>
          <img src={post?.userId?.profilePicture ? availablePublicFolderImage + post?.userId?.profilePicture : ProfilePic} alt='' />
          <div className="name">
            <span>{post?.userId?.username}</span>
            <div className='userandDate' style={{ display: 'flex', gap: '1rem' }}>
              <span>{post?.userId?.firstname} {post?.userId?.lastname}</span>
              <span>{format(post?.date)}</span>
            </div>
          </div>
        </div>
      </div>
      <span style={{ width: '90%', padding: '1rem', justifyContent: 'start', fontFamily: 'serif', fontSize: '1.3rem', color: 'darkslategray' }}>{post?.desc}</span>
      {openComment && <Comments comments={post?.comments} setOpenComment={setOpenComment} postId={post?._id}/>}
    </div>
  );
}

export default PostCard;
