import React from 'react';
import { Modal, useMantineTheme } from '@mantine/core';
import Share from '../postSide/share/Share'
const ShareModel = ({openModel, setOpenModel}) => {
    const theme = useMantineTheme();
    return (
        <Modal
        overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
        overlayOpacity={0.55}
        overlayBlur={3}
        opened={openModel}
        onClose={() => setOpenModel(false)}
        withCloseButton={false}
        transitionDuration={600}
        >
            <Share sideShare/>
        </Modal>
    );
}

export default ShareModel;
