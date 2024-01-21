import React, { useState } from 'react';
import { Box, Typography } from '@material-ui/core';
import PasswordResetRequestForm from 'components/Forms/AuthForms/PasswordResetRequestForm';
import { useTranslation } from 'react-i18next';
import ErrorMessage from 'components/UI/Messages/ErrorMessage';
import BackToHomePageLink from 'components/Links/BackToHomePageLink';

const PasswordResetRequest = () => {
  const { t } = useTranslation();
  const [success, setSuccess] = useState<boolean | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  const onDataLoadedHandler = (success: boolean, email: string) => {
    setSuccess(success);
    setEmail(email);
  };

  return (
    <Box sx={{ mt: 4 }}>
      {success === null ? (
        <PasswordResetRequestForm onDataLoadedHandler={onDataLoadedHandler} />
      ) : (
        <Box>
          {success === true ? (
            <Typography style={{ textAlign: 'center' }}>
              {t('password_reset_email_sent', { email })}
            </Typography>
          ) : (
            <ErrorMessage />
          )}
          <Box
            display={'flex'}
            justifyContent={'center'}
            style={{ marginTop: '8px' }}
          >
            <BackToHomePageLink />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default PasswordResetRequest;
