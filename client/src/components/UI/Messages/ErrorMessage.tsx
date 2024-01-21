import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import BackToHomePageLink from 'components/Links/BackToHomePageLink';

const ErrorMessage = () => {
  const { t } = useTranslation();

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
      justifyContent={'center'}
    >
      <Typography style={{ textAlign: 'center' }}>
        {t('something_went_wrong')}
      </Typography>

      <BackToHomePageLink style={{ marginTop: '8px' }} />
    </Box>
  );
};

export default ErrorMessage;
