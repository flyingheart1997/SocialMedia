import { Modal, useMantineTheme } from '@mantine/core';
import ProfileView from '../postSide/profileView/ProfileView'

const ProfileModel = ({pOpenModel, setPOpenModel,profile}) => {
  const theme = useMantineTheme();


  return (
    <Modal
      overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.55}
      overlayBlur={3}
      opened={pOpenModel}
      onClose={() => setPOpenModel(false)}
      overflow='outside'
      withCloseButton={false}
      transitionDuration={600}
      centered
    >
      <ProfileView profile/>
    </Modal>
  )
}

export default ProfileModel
