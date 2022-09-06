import React, { useEffect, useState } from 'react'
import './PostSide.css'
import Share from './share/Share'
import Post from './post/Post'
import ProfileView from './profileView/ProfileView'
import {useParams} from 'react-router-dom'
import { getUserPosts } from '../../api/GetPostRequest'



const PostSide = () => {
  const {userId} = useParams()
  const [userPosts,setUserPosts]=useState()
  const pathName = window.location.pathname===`/profile/${userId}`?true:false

  useEffect(() => {
    if(userId){
      getUserPosts(userId).then(res =>{
        setUserPosts(res.data)
      }).catch(err =>{
        console.log(err)
      })
    }
  },[userPosts])


  return (

    <div className='postSide'>
      <Share/>
      <div className='postScroll'>
        {pathName &&<ProfileView userPosts={userPosts} setUserPosts={setUserPosts} />}
          <Post userPosts={userPosts}/>
      </div>
    </div>
  )
}

export default PostSide
