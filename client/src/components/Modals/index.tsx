import React, { FC } from 'react';
import { Box, Modal as MuiModal } from '@mui/material';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  maxWidth?: string;
}

const Modal: FC<ModalProps> = ({ open, onClose, children, maxWidth }) => {
  return (
    <MuiModal
      open={open}
      onClose={onClose}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box sx={{ maxWidth: maxWidth || '600px', width: '98%' }}>{children}</Box>
    </MuiModal>
  );
};

export default Modal;
