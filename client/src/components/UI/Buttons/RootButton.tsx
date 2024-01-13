import Button, { ButtonProps } from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';
import React, { FC } from 'react';

interface RootButtonProps extends ButtonProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const useStyles = makeStyles({
  root: {
    textTransform: 'capitalize',
    padding: '5px 19px 2px',
    borderRadius: 0,
    fontSize: '18px',
  },
});

const RootButton: React.FC<RootButtonProps> = ({
  children,
  style,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <Button className={classes.root} style={style} {...rest}>
      {children}
    </Button>
  );
};

export default RootButton;
