import React, { FC } from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

interface LinkUpLogoProps {
  onClick?: () => void;
  style?: React.CSSProperties;
}

const useStyles = makeStyles(() => ({
  logo: {
    cursor: 'pointer',
    display: 'flex',
    userSelect: 'none',
  },
}));

const LinkUpLogo: FC<LinkUpLogoProps> = ({ onClick, style }) => {
  const classes = useStyles();

  return (
    <Box className={classes.logo} style={style} onClick={onClick}>
      <Typography variant="h5" color="secondary">
        /
      </Typography>
      <Typography variant="h5">Link</Typography>
      <Typography variant="h5" color="secondary">
        Up
      </Typography>
    </Box>
  );
};

export default LinkUpLogo;
