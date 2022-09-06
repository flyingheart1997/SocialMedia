import { Modal, useMantineTheme } from '@mantine/core';
import AllUser from '../userSide/allUser/AllUser';
import Logo from '../../img/logo1.png'
import { UilSearch } from '@iconscout/react-unicons'
import { useSelector } from 'react-redux';
import { useContext} from 'react';
import { follwUser } from '../../App';

const SearchModel = ({ sOpenModel, setSOpenModel }) => {
  const theme = useMantineTheme();
  const user = useSelector((state) => state.authReducer.authData?.user)
  const followedUser = useContext(follwUser);

  return (
    <Modal
      overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.55}
      overlayBlur={3}
      opened={sOpenModel}
      onClose={() => setSOpenModel(false)}
      size='auto'
      overflow="inside"
      transitionDuration={600}
      withCloseButton={false}
      centered
    >
      <div className='profileSide'>
        <div className='logoSearch'>
          <img src={Logo} alt='logo' style={{ height: '40px' }} />
          <div className='search'>
            <input type='text' placeholder='# Explore' />
            <div className='s-icon'><UilSearch /></div>
          </div>
        </div>
        <div className='profileScroll'>
          {
            followedUser.allUsers?.map((allUser, id) => {
              return (
                <div key={id} >
                  {user?._id !== allUser?._id && <AllUser allUser={allUser} color/>}
                </div>
              )
            })
          }
        </div>
      </div>
    </Modal>
  )
}

export default SearchModel
