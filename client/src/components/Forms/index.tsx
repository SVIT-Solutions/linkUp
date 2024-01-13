import React, { FC } from 'react';
import { Box, Card } from '@mui/material';
import Loader from 'components/UI/Loaders/Loader';

interface FormProps {
  children: React.ReactNode;
  isLoading: boolean;
  style?: object;
  onSubmit: () => void;
}

const Form: FC<FormProps> = ({ children, isLoading, style, onSubmit }) => {
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
      <Card sx={{ p: 2 }} style={{ ...style, opacity: isLoading ? 0.5 : 1 }}>
        {children}
      </Card>
    </form>
  );
};

export default Form;
