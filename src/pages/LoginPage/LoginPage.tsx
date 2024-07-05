import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from '@common/buttons';
import { useIntl } from '@features/intl/hooks';
import { Checkbox } from '@fields/inputs/Checkbox/Checkbox';
import { PasswordInput } from '@fields/inputs/Inputs/PasswordInput/PasswordInput';
import { validatePassword, validateUsername } from '@helpers/validations';
import { Input } from '@inputs/Inputs/Input/Input';
import { api } from '@utils/api';
import { useAuth } from '@utils/contexts';
import { useForm, useMutation } from '@utils/hooks';

import styles from './LoginPage.module.css';

export interface LoginFormValues {
  username: string;
  password: string;
  isNotMyDevice?: boolean;
}

export interface LoginResponse {
  access_token: string;
  userId: number;
}

export const LoginPage = () => {
  const navigate = useNavigate();

  const { login } = useAuth();
  const { translateMessage } = useIntl();

  const { mutation: authMutation, isLoading: authLoading } = useMutation<LoginResponse, LoginFormValues>({
    request: (userData: LoginFormValues) => api.post<LoginResponse, LoginFormValues>('/auth/login', userData)
  });

  const { values, setFieldValue, errors, handleSubmit, isSubmitting } = useForm<LoginFormValues>({
    initialValues: {
      username: '',
      password: '',
      isNotMyDevice: false
    },
    validateSchema: {
      username: validateUsername,
      password: validatePassword
    },
    // validateOnChange: false,
    onSubmit: async (values) => {
      try {
        // Тут проверяем данные пользователя
        const data = await authMutation(values);
        // Здесь сохраняем данные в куках
        login(data.access_token, data.userId, values.isNotMyDevice);
        navigate('/');
      } catch (error) {
        toast.error(translateMessage('login.failed'));
      }
    }
  });

  return (
    <div className={styles.page}>
      <section className={styles.container}>
        <div className={styles.container_header}>DOGGEE</div>
        <form
          className={styles.form_container}
          onSubmit={(event) => handleSubmit(event)}>
          <div className={styles.input_container}>
            <Input
              disabled={authLoading}
              helperText={errors?.username || ''}
              isError={!!errors?.username || false}
              label={translateMessage('field.input.username.label')}
              type="text"
              value={values.username}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setFieldValue('username', event.target.value);
              }}
            />
          </div>
          <div className={styles.input_container}>
            <PasswordInput
              disabled={isSubmitting}
              helperText={errors?.password || ' '}
              isError={!!errors?.password || false}
              label={translateMessage('field.input.password.label')}
              type="password"
              value={values.password}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setFieldValue('password', event.target.value);
              }}
            />
          </div>
          <div className={styles.input_container}>
            <Checkbox
              disabled={isSubmitting}
              isChecked={values.isNotMyDevice}
              label={translateMessage('field.checkbox.isNotMyDevice.label')}
              onChange={() => setFieldValue('isNotMyDevice', !values.isNotMyDevice)}
            />
          </div>
          <div>
            <Button
              isLoading={isSubmitting}
              disabled={isSubmitting}
              type="submit">
              {translateMessage('button.signIn')}
            </Button>
          </div>
        </form>
        <div
          className={styles.sign_up_container}
          onClick={() => navigate('/register')}>
          {translateMessage('page.login.createNewAccount')}
        </div>
      </section>
    </div>
  );
};
