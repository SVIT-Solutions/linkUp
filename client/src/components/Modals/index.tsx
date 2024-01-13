import React, { FC } from 'react';
import { Box, Modal as MuiModal } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { ModalProps as MuiModalProps } from '@material-ui/core';

export interface ModalProps extends MuiModalProps {
  maxWidth?: string;
}

const Modal: FC<ModalProps> = ({ open, onClose, children, maxWidth }) => {
  const useStyles = makeStyles({
    modalWrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    boxWrapper: { maxWidth: maxWidth || '600px', width: '98%' },
  });

  const classes = useStyles();

  return (
    <MuiModal open={open} onClose={onClose} className={classes.modalWrapper}>
      <Box className={classes.boxWrapper}>{children}</Box>
    </MuiModal>
  );
};

export default Modal;
