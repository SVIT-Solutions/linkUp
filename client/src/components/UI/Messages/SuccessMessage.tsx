import { Box, Typography } from '@material-ui/core';
import React, { FC } from 'react';

interface SuccessMessageProps {
  text?: string;
  style?: React.CSSProperties;
}

const SuccessMessage: FC<SuccessMessageProps> = ({ text, style }) => {
  return (
    <Box style={style}>
      <Typography style={{ textAlign: 'center' }}>{text}</Typography>
    </Box>
  );
};

export default SuccessMessage;
