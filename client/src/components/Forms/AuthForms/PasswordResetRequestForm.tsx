import React, { FC } from 'react';
import Form from 'components/Forms';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { PASSWORD_RESET_REQUEST } from 'api/mutations';
import { TextField } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import RootButton from 'components/UI/Buttons/RootButton';
import { emailPattern } from 'constants/patterns';

interface PasswordResetRequestFormProps {
  onDataLoadedHandler?: (success: boolean, email: string) => void;
}

interface PasswordResetInput {
  email: string;
}

const PasswordResetRequestForm: FC<PasswordResetRequestFormProps> = ({
  onDataLoadedHandler,
}) => {
  const { t } = useTranslation();

  const [passwordResetRequestMutation, { loading, error }] = useMutation(
    PASSWORD_RESET_REQUEST
  );

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<PasswordResetInput>();

  const onSubmit: SubmitHandler<PasswordResetInput> = async (data) => {
    const response = await passwordResetRequestMutation({
      variables: data,
    });
    const { success } = response.data.passwordResetRequest;
    if (onDataLoadedHandler) onDataLoadedHandler(success, data.email);
  };

  return (
    <Form
      isLoading={loading}
      onSubmit={handleSubmit(onSubmit)}
      style={{ width: '700px' }}
      withLogo
    >
      <TextField
        {...register('email', {
          required: t('this_field_is_required'),
          pattern: {
            value: emailPattern,
            message: t('invalid_email_address'),
          },
        })}
        label={t('your_email')}
        variant="outlined"
        margin="normal"
        fullWidth
        error={!!errors.email}
        helperText={errors.email?.message}
        autoComplete="off"
      />
      <RootButton
        style={{ marginTop: '16px' }}
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
      >
        {t('reset_password')}
      </RootButton>
    </Form>
  );
};

export default PasswordResetRequestForm;
