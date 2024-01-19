import React, { useEffect, useState } from 'react';
import { Box, Link, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { RouteNames } from 'router';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  title: { textAlign: 'center' },
  link: { marginTop: '8px' },
});

const AccountConfirmationEmailSent = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const location = useLocation();
  const [email, setEmail] = useState<string>('');

  useEffect(() => {
    const queryParams = queryString.parse(location.search);
    const email = queryParams.email as string | undefined;
    if (email) {
      setEmail(email);
    }
  }, [location]);

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Typography className={classes.title}>
        {t('account_confirmation_email_sent', { email })}
      </Typography>
      <Link
        onClick={(e) => e.stopPropagation()}
        className={classes.link}
        href={RouteNames.HOME}
      >
        {t('back_to_homepage')}
      </Link>
    </Box>
  );
};

export default AccountConfirmationEmailSent;
