import React, { FC, useContext, useState } from 'react';
import { useMutation } from '@apollo/client';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import {
  Button,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from '@material-ui/core';
import { AuthContext } from 'context/AuthContext';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { RouteNames } from 'router';
import Form from 'components/Forms';
import { REGISTER } from 'api/mutations';
import { useTranslation } from 'react-i18next';
import RootButton from 'components/UI/Buttons/RootButton';

interface IValidationError {
  field: string;
  messages: [string];
}

interface RegisterFormInput {
  email: string;
  username: string;
  password1: string;
  password2: string;
}

interface RegisterFormProps {
  closeModal?: () => void;
}

const RegisterForm: FC<RegisterFormProps> = ({ closeModal }) => {
  const { t, i18n } = useTranslation();

  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm<RegisterFormInput>();

  const router = useNavigate();
  const authContext = useContext(AuthContext);
  const [registerMutation, { loading, error }] = useMutation(REGISTER);

  const [generalError, setGeneralError] = useState<String>('');

  const [showPassword, setShowPassword] = useState<Boolean>(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const onSubmit: SubmitHandler<RegisterFormInput> = async (data) => {
    const response = await registerMutation({
      variables: data,
    });
    const { user, token, success, error } = response.data.register;
    if (success) {
      localStorage.setItem('token', token);
      delete user.__typename;
      authContext?.setUser(user);
      authContext?.setIsAuth(true);
      if (closeModal) closeModal();
      router(RouteNames.HOME);
      setGeneralError('');
    } else {
      if (!error?.validationErrors?.length) return;

      const validationErrors = error?.validationErrors
        ?.map((error: IValidationError) => ({
          [error.field]: error.messages[0],
        }))
        .reduce((acc: any, obj: any) => ({ ...acc, ...obj }), {});

      for (const key in validationErrors) {
        const typedKey = key as keyof RegisterFormInput;
        if (typedKey === 'password1' || typedKey === 'password2') {
          setError('password1', { message: validationErrors[key] });
          setError('password2', { message: validationErrors[key] });
        } else {
          setError(typedKey, { message: validationErrors[key] });
        }
      }
    }
  };

  const toLoginClickHandler = () => {
    router(RouteNames.LOGIN);
    if (closeModal) closeModal();
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      isLoading={loading}
      style={{ width: '700px' }}
    >
      <TextField
        {...register('email', { required: t('this_field_is_required') })}
        label={t('email')}
        variant="outlined"
        margin="normal"
        fullWidth
        error={!!errors.email}
        helperText={errors.email?.message}
        autoComplete="email"
      />

      <TextField
        {...register('username', { required: t('this_field_is_required') })}
        label={t('username')}
        variant="outlined"
        margin="normal"
        fullWidth
        error={!!errors.username}
        helperText={errors.username?.message}
      />

      <TextField
        {...register('password1', { required: t('this_field_is_required') })}
        label={t('password')}
        type={showPassword ? 'text' : 'password'}
        variant="outlined"
        margin="normal"
        fullWidth
        error={!!errors.password1}
        helperText={errors.password1?.message}
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

      <TextField
        {...register('password2', { required: t('this_field_is_required') })}
        label={t('confirm_password')}
        type={showPassword ? 'text' : 'password'}
        variant="outlined"
        margin="normal"
        fullWidth
        error={!!errors.password2}
        helperText={errors.password2?.message}
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

      <RootButton type="submit" variant="contained" color="primary" fullWidth>
        {t('singup')}
      </RootButton>

      <Typography
        style={{ marginTop: '8px', textAlign: 'center' }}
        variant="body1"
      >
        {t('already_have_an_account')}?{' '}
        <Link style={{ cursor: 'pointer' }} onClick={toLoginClickHandler}>
          {t('login')}
        </Link>
      </Typography>
    </Form>
  );
};

export default RegisterForm;
