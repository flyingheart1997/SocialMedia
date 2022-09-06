import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTimeLinePost,} from '../../../api/GetPostRequest.js';
import PostCard from '../postCard/PostCard';
import { Loader } from '@mantine/core';
import { follwUser } from '../../../App.js';

const Post = ({userPosts}) => {

  const followedUser = useContext(follwUser);
  const {userId}  = useParams()
  const [posts,setPosts]=useState()
  const [timer, setTimer]=useState(false)


  useEffect(()=>{
    setTimeout(()=>{
      setTimer(true)
    },3000)
  },[])


  useEffect(() => {
      getTimeLinePost().then(res => {
        setPosts(res.data)
      }).catch(err => {
        console.log(err)
      })
  },[posts])

  
  
  return (
    <>
      {timer ?<div style={{gap:'1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%'}}>
        {!userId ? posts?.map((post, id) => {
            return (
              <div key={id} style={{display:'flex', width:'100%'}}>
                {followedUser.allUsers?.find((user)=>user?._id===post?.userId?._id)&&<PostCard post={post} key={id} />}
              </div>
              )
          }) : userPosts?.map((post, id) => {
            return (<PostCard post={post} key={id} />)
          })
          }
      </div>:
      <div style={{display:'flex',flexDirection:'column',height:'50vh',width:'100%', alignItems:'center', justifyContent:'center'}}>
          <Loader size={50}/>
    </div>
      }
    </>
  );
}

export default Post;
