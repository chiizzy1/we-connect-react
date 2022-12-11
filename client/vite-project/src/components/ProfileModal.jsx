import { Modal, useMantineTheme } from '@mantine/core';



const ProfileModal = ({modalState, setModalState}) => {
    const theme = useMantineTheme();
  
    return (
      <Modal
        overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
        overlayOpacity={0.55}
        overlayBlur={3}
        size="55%"
        opened = {modalState}
        onClose={() => setModalState(false)}
      >
        {/* Modal content */} 
        <h1>Watawi</h1>
      </Modal>
    );
}



export default ProfileModal