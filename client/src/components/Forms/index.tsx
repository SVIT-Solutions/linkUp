import React, { FC } from 'react';
import { Card } from '@material-ui/core';
import Loader from 'components/UI/Loaders/Loader';
import { makeStyles } from '@material-ui/styles';

interface FormProps {
  children: React.ReactNode;
  isLoading: boolean;
  style?: object;
  onSubmit: () => void;
}

const Form: FC<FormProps> = ({ children, isLoading, style, onSubmit }) => {
  const useStyles = makeStyles({
    wrapper: { padding: '14px', opacity: isLoading ? 0.5 : 1 },
  });

  const classes = useStyles();

  return (
    <form
      onSubmit={onSubmit}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {isLoading === true && <Loader style={{ position: 'absolute' }} />}
      <Card className={classes.wrapper} style={style}>
        {children}
      </Card>
    </form>
  );
};

export default Form;
