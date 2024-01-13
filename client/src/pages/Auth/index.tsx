import React from 'react';
import { Box } from '@material-ui/core';
import LoginForm from 'components/Forms/AuthForms/LoginForm';
import RegisterForm from 'components/Forms/AuthForms/RegisterForm';
import { useLocation } from 'react-router-dom';
import { RouteNames } from 'router';

const Auth = () => {
  const { pathname } = useLocation();

  return (
    <Box sx={{ mt: 4 }}>
      {pathname === RouteNames.LOGIN && <LoginForm />}
      {pathname === RouteNames.REGISTER && <RegisterForm />}
    </Box>
  );
};

export default Auth;
