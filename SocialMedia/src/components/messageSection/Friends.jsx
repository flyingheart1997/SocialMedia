import React, { useContext, useEffect, useState } from 'react'
import './Friends.css'
import AddFriends from './addFriends/AddFriends'
import {Loader} from '@mantine/core'
import { useSelector } from 'react-redux'
import { get_a_User } from '../../api/GetAllUsersRequest'
import { follwUser } from '../../App'

const Friends = ({setOpen}) => {
  
  const followedUser = useContext(follwUser);
  const [user, setUser] = useState(null);
  const authUser = useSelector((state) => state.authReducer.authData?.user);
  
  useEffect(() => {
    get_a_User(authUser?._id).then(res => {
      setUser(res.data)
    }).catch(err => {
      console.log(err)
    })
  }, [user])
 
  const friends = user?.following?.filter(f => user?.follower?.includes(f));
    
  return (
    <>
    {friends ? <div className='myfriends' onClick={()=>setOpen(false)}>
      <span style={{width:'100%', display:'flex', justifyContent:'center', color:'White', padding:'0.5rem 0', fontWeight:'bpld', fontFamily:'serif', fontSize:'1.5rem'}}> Add New Friends</span>
        {friends?.map((friendId, id)=>(
          <>
            {followedUser.allUsers?.find((user)=>user?._id===friendId) && <AddFriends friendId={friendId} setOpen={setOpen} key={id}/>}
          </>
        ))}
      </div>:
      <div className='loader'>
        <Loader/>
      </div>
      }
    </>
  );
}

export default Friends;
