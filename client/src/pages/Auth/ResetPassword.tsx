import React, { useEffect, useState } from 'react';
import { Box } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import ResetPasswordForm from 'components/Forms/AuthForms/ResetPasswordForm';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

const ResetPassword = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [token, setToken] = useState('');

  useEffect(() => {
    const queryParams = queryString.parse(location.search);
    const token = queryParams.token as string | undefined;
    if (token) setToken(token);
  }, [location]);

  return (
    <Box sx={{ mt: 4 }}>
      <ResetPasswordForm token={token} />
    </Box>
  );
};

export default ResetPassword;
