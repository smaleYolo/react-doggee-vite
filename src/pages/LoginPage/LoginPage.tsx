import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from '@common/buttons';
import { useIntl } from '@features/intl/hooks';
import { Checkbox } from '@fields/inputs/Checkbox/Checkbox';
import { PasswordInput } from '@fields/inputs/Inputs/PasswordInput/PasswordInput';
import type { FormErrors } from '@helpers/validations';
import { validateLoginForm } from '@helpers/validations';
import { Input } from '@inputs/Inputs/Input/Input';
import { api } from '@utils/api';
import { useAuth } from '@utils/contexts';
import { useMutation } from '@utils/hooks';

import styles from './LoginPage.module.css';

export interface FormValues {
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

  const [formValues, setFormValues] = useState<FormValues>({
    username: '',
    password: '',
    isNotMyDevice: false
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({
    username: null,
    password: null
  });

  const { login } = useAuth();
  const { translateMessage } = useIntl();

  const { mutation: authMutation, isLoading: authLoading } = useMutation<LoginResponse, FormValues>({
    request: (userData: FormValues) => api.post<LoginResponse, FormValues>('/auth/login', userData)
  });


  const loginHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const usernameError = validateLoginForm('username', formValues.username);
    const passwordError = validateLoginForm('password', formValues.password);
    setFormErrors({
      username: usernameError,
      password: passwordError
    });

    if (!usernameError && !passwordError) {
      try {
        // Тут проверяем данные пользователя
        const data = await authMutation(formValues);
        // Здесь сохраняем данные в куках
        login(data.access_token, data.userId, formValues.isNotMyDevice);
        navigate('/');
      } catch (error) {
        toast.error(translateMessage('login.failed'));
      }
    } else {
      toast.error(translateMessage('login.fillRequiredFields'));
    }
  };

  return (
    <div className={styles.page}>
      <section className={styles.container}>
        <div className={styles.container_header}>DOGGEE</div>
        <form
          className={styles.form_container}
          onSubmit={loginHandler}>
          <div className={styles.input_container}>
            <Input
              disabled={authLoading}
              helperText={formErrors.username}
              isError={!!formErrors.username}
              label={translateMessage('field.input.username.label')}
              type="text"
              value={formValues.username}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const username = event.target.value;
                setFormValues({ ...formValues, username });
                const error = validateLoginForm('username', username);
                setFormErrors({ ...formErrors, username: error });
              }}
            />
          </div>
          <div className={styles.input_container}>
            <PasswordInput
              disabled={authLoading}
              helperText={formErrors.password}
              isError={!!formErrors.password}
              label={translateMessage('field.input.password.label')}
              type="password"
              value={formValues.password}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const password = event.target.value;
                setFormValues({ ...formValues, password });
                const error = validateLoginForm('password', password);
                setFormErrors({ ...formErrors, password: error });
              }}
            />
          </div>
          <div className={styles.input_container}>
            <Checkbox
              disabled={authLoading}
              isChecked={formValues.isNotMyDevice}
              label={translateMessage('field.checkbox.isNotMyDevice.label')}
              onChange={() => setFormValues((prev) => ({ ...prev, isNotMyDevice: !prev.isNotMyDevice }))}
            />
          </div>
          <div>
            <Button
              isLoading={authLoading}
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
