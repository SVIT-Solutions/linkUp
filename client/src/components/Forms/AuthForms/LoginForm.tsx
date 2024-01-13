import React, { FC, useContext, useState } from 'react';
import { useMutation } from '@apollo/client';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Button,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { LOGIN } from 'api/mutations';
import { AuthContext } from 'context/AuthContext';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { RouteNames } from 'router';
import Form from 'components/Forms';
import { useTranslation } from 'react-i18next';

interface LoginFormInput {
  username: string;
  password: string;
}

interface LoginFormProps {
  closeModal?: () => void;
}

const LoginForm: FC<LoginFormProps> = ({ closeModal }) => {
  const { t } = useTranslation();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginFormInput>();

  const router = useNavigate();
  const authContext = useContext(AuthContext);
  const [loginMutation, { loading, error }] = useMutation(LOGIN);

  const [generalError, setGeneralError] = useState<String>('');

  const [showPassword, setShowPassword] = useState<Boolean>(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const onSubmit: SubmitHandler<LoginFormInput> = async (data) => {
    const response = await loginMutation({
      variables: data,
    });
    const { user, token, success, error } = response.data.login;
    if (success) {
      localStorage.setItem('token', token);
      delete user.__typename;
      authContext?.setUser(user);
      authContext?.setIsAuth(true);
      if (closeModal) closeModal();
      router(RouteNames.HOME);
      setGeneralError('');
    } else {
      setGeneralError('Incorrect username or password');
    }
  };

  const toRegisterClickHandler = () => {
    router(RouteNames.REGISTER);
    if (closeModal) closeModal();
  };

  return (
    <Form
      isLoading={loading}
      onSubmit={handleSubmit(onSubmit)}
      style={{ width: '700px' }}
    >
      <TextField
        {...register('username', { required: 'This field is required' })}
        label={t('email')}
        variant="outlined"
        margin="normal"
        fullWidth
        error={!!errors.username}
        helperText={errors.username?.message}
      />

      <TextField
        {...register('password', { required: 'This field is required' })}
        label={t('password')}
        type={showPassword ? 'text' : 'password'}
        variant="outlined"
        margin="normal"
        fullWidth
        error={!!errors.password}
        helperText={errors.password?.message}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={togglePasswordVisibility} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Typography variant="body1" color="error">
        {generalError}
      </Typography>

      <Button type="submit" variant="contained" color="primary" fullWidth>
        {t('login')}
      </Button>

      <Typography sx={{ mt: 1, textAlign: 'center' }} variant="body1">
        {t('dont_have_an_account')}?{' '}
        <Link sx={{ cursor: 'pointer' }} onClick={toRegisterClickHandler}>
          {t('singup')}
        </Link>
      </Typography>
    </Form>
  );
};

export default LoginForm;
