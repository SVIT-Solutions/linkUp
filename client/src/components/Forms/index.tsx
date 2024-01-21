import React from 'react';
import { Box, Card } from '@material-ui/core';
import Loader from 'components/UI/Loaders/Loader';
import { makeStyles } from '@material-ui/styles';
import LinkUpLogo from 'components/UI/Logo/LinkUpLogo';

interface FormProps {
  children: React.ReactNode;
  isLoading?: boolean;
  withLogo?: boolean;
  style?: React.CSSProperties;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const Form: React.FC<FormProps> = ({
  children,
  isLoading,
  withLogo,
  style,
  onSubmit,
}) => {
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
        {withLogo === true && (
          <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <LinkUpLogo />
          </Box>
        )}
        {children}
      </Card>
    </form>
  );
};

export default Form;
