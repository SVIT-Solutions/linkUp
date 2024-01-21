import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import { useMutation } from '@apollo/client';
import { VERIFY_EMAIL } from 'api/mutations';
import { AuthContext } from 'context/AuthContext';
import { Box } from '@material-ui/core';
import Loader from 'components/UI/Loaders/Loader';
import { RouteNames } from 'router';
import ErrorMessage from 'components/UI/Messages/ErrorMessage';

const ConfirmEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const [verifyEmailMutation, { loading, error }] = useMutation(VERIFY_EMAIL);
  const [verifyEmailResult, setVerifyEmailResult] = useState(null);

  const verifyEmail = async (verify_email_token: string) => {
    const response = await verifyEmailMutation({
      variables: { token: verify_email_token },
    });
    const { token, user, success } = response.data.verifyEmail;
    setVerifyEmailResult(success);
    if (success) {
      localStorage.setItem('token', token);
      delete user.__typename;
      authContext?.setUser(user);
      authContext?.setIsAuth(true);
    }
    navigate(RouteNames.HOME);
  };

  useEffect(() => {
    const queryParams = queryString.parse(location.search);
    const token = queryParams.token as string | undefined;
    if (token) {
      verifyEmail(token);
    }
  }, [location]);

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      {loading ? <Loader /> : !verifyEmailResult ? <ErrorMessage /> : ''}
    </Box>
  );
};

export default ConfirmEmail;
