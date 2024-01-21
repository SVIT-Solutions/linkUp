import React, { FC, useState } from 'react';
import { useMutation } from '@apollo/client';
import { RESET_PASSWORD } from 'api/mutations';
import { useTranslation } from 'react-i18next';
import Form from 'components/Forms';
import { IconButton, InputAdornment, TextField } from '@material-ui/core';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import RootButton from 'components/UI/Buttons/RootButton';
import { useNavigate } from 'react-router-dom';
import { RouteNames } from 'router';
import SuccessMessage from 'components/UI/Messages/SuccessMessage';
import ErrorMessage from 'components/UI/Messages/ErrorMessage';

interface ResetPasswordFormInput {
  password1: string;
  password2: string;
}

interface ResetPasswordFormProps {
  token: string;
}

const ResetPasswordForm: FC<ResetPasswordFormProps> = ({ token }) => {
  const { t } = useTranslation();
  const router = useNavigate();
  const [resetPasswordMutation, { loading, error }] =
    useMutation(RESET_PASSWORD);
  const [success, setSuccess] = useState(null);

  const [showPassword, setShowPassword] = useState<Boolean>(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm<ResetPasswordFormInput>();

  const onSubmit: SubmitHandler<ResetPasswordFormInput> = async (data) => {
    if (data?.password1 !== data?.password2) {
      setError('password1', { message: t('passwords_not_match') });
      setError('password2', { message: t('passwords_not_match') });
      return;
    }
    const response = await resetPasswordMutation({
      variables: { password: data?.password1, token },
    });
    const { success } = response.data.resetPassword;
    if (success) {
      setTimeout(() => router(RouteNames.LOGIN), 2000);
    }
    setSuccess(success);
  };

  if (success)
    return <SuccessMessage text={t('password_successfully_changed')} />;

  if (success === false) return <ErrorMessage />;

  return (
    <Form isLoading={loading} withLogo onSubmit={handleSubmit(onSubmit)}>
      <TextField
        {...register('password1', { required: t('this_field_is_required') })}
        label={t('new_password')}
        type={showPassword ? 'text' : 'password'}
        variant="outlined"
        margin="normal"
        fullWidth
        error={!!errors.password1}
        helperText={errors.password1?.message}
        autoComplete="off"
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
        autoComplete="off"
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

      <RootButton
        style={{ marginTop: '16px' }}
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
      >
        {t('submit')}
      </RootButton>
    </Form>
  );
};

export default ResetPasswordForm;
