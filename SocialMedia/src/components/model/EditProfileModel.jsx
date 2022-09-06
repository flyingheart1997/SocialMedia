import { Modal, useMantineTheme } from '@mantine/core';
import {UilUpload} from '@iconscout/react-unicons'
import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {uploadImage} from '../../redux/actions/UploadAction.js'
import { updateUser } from '../../redux/actions/UserAction.js';


const EditProfileModel = ({openModel, setOpenModel, user}) => {
  const theme = useMantineTheme();

  const {password, ...other} = user;
  const [formData, setFormData] = React.useState(other);
  const [coverPicture, setCoverPicture] = React.useState(null);
  const [profilePicture, setProfiPicture] = React.useState(null);
  const dispatch = useDispatch()
  const {userId} = useParams()

  const handleChange = (e)=>{
    setFormData({...formData, [e.target.name]: e.target.value})
  }
  const onImageChange = (e)=>{
    if(e.target.files && e.target.files[0]){
      let img = e.target.files[0]
      e.target.name === 'profilePicture' ? setProfiPicture(img) : setCoverPicture(img)
    }
  }

  const handleUpdate = (e) =>{
    e.preventDefault()
    let userData = formData
    if(profilePicture){
      const data = new FormData()
      const filename = Date.now() + profilePicture.name
      data.append('name', filename)
      data.append('file', profilePicture)
      userData.profilePicture = filename

      try {
        dispatch(uploadImage(data))
      } catch (error) {
        console.log(error);
      }
    }
    if(coverPicture){
      const data = new FormData()
      const filename = Date.now() + coverPicture.name
      data.append('name', filename)
      data.append('file', coverPicture)
      userData.coverPicture = filename

      try {
        dispatch(uploadImage(data))
      } catch (error) {
        console.log(error);
      }
    }
    dispatch(updateUser(userId,userData))
    setOpenModel(false)
  }

  return (
    <Modal
      overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.55}
      overlayBlur={3}
      opened={openModel}
      onClose={() => setOpenModel(false)}
      withCloseButton={false}
      transitionDuration={600}
      centered
      zIndex={9999}
    >
      <div className='signup'>
      <form className="infoForm authForm">
        <h2>Update Profile</h2>
        <div>
            <input value={formData.firstname} onChange={handleChange} type='text' placeholder='First Name' className='infoInput' name='firstname'/>
            <input value={formData.lastname} onChange={handleChange} type='text' placeholder='Last Name' className='infoInput' name='lastname'/>
        </div>
        <div>
            <input value={formData.worksAt} onChange={handleChange} type='text' placeholder='worksAt' className='infoInput' name='worksAt'/>
            <input value={formData.relationShip} onChange={handleChange} type='text' placeholder='RealtionShip' className='infoInput' name='relationShip'/>
        </div>
        <div>
            <input value={formData.country} onChange={handleChange} type='text' placeholder='Country' className='infoInput' name='country'/>
            <input value={formData.livesIn} onChange={handleChange} type='text' placeholder='City, State' className='infoInput' name='livesIn'/>
        </div>
        <div>
            <input value={formData.facebook} onChange={handleChange} type='text' placeholder='facebook.com/[userId]' className='infoInput' name='facebook'/>
        </div>
        <div>
            <input value={formData.instagram} onChange={handleChange} type='text' placeholder='instagram.com/[userId]' className='infoInput' name='instagram'/>
            <input value={formData.twitter} onChange={handleChange} type='text' placeholder='twitter.com/[userId]' className='infoInput' name='twitter'/>
        </div>
        <div>
            <input value={formData.about} onChange={handleChange} type='text' placeholder='Short Description' className='infoInput' name='about'/>
        </div>
        <div>
            <label className="custom-file-upload infoInput">
              <input type="file" className='infoInput' onChange={onImageChange} name='coverPicture'/>
              <span style={{display:'flex',alignItems:'center', gap:'5px',color:'#615459',fontSize:'small'}}><UilUpload /> <span style={{overflow:'hidden',whiteSpace:'nowrap',textOverflow:'ellipsis',width:'100px'}}>{coverPicture?coverPicture.name:"Cover Image"}</span></span> 
            </label>
            <label className="custom-file-upload infoInput">
              <input type="file" className='infoInput' onChange={onImageChange} name='profilePicture'/>
              <span style={{display:'flex',alignItems:'center', gap:'5px', color:'#615459',fontSize:'small'}}><UilUpload /> <span style={{overflow:'hidden',whiteSpace:'nowrap',textOverflow:'ellipsis',width:'100px'}}>{profilePicture?profilePicture.name:"Profile Image"}</span></span> 
            </label>
        </div>
        <br />
        <button type='submit' onClick={handleUpdate}>Update</button>
      </form>
    </div>
    </Modal>
  )
}

export default EditProfileModel

