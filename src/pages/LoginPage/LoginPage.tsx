import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

import { Button } from '@common/buttons';
import { LoginInput } from '@common/fields';
import { Checkbox } from '@common/fields/inputs/Checkbox/Checkbox';
import { PasswordInput } from '@common/fields/inputs/Input/PasswordInput/PasswordInput';

import { useMutation } from '@utils/hooks/api/useMutation';
import { FormErrors, validateLoginForm } from '@utils/hooks/helpers/validations';
import { api } from '@utils/api';

import styles from './LoginPage.module.css';
import { useAuth } from '@utils/contexts/AuthContext/AuthContext.ts';

interface LoginRequest {
  username: string;
  password: string;
  isNotMyDevice?: boolean;
}

interface LoginResponse {
  access_token: string;
  userId: number;
}


export const LoginPage = () => {
  const [formValues, setFormValues] = useState<LoginRequest>({
    username: '',
    password: '',
    isNotMyDevice: false
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({
    username: null,
    password: null
  });
  const { AuthHandler } = useAuth();

  const { mutation: authMutation, isLoading: authLoading } = useMutation<LoginResponse, LoginRequest>({
    request: (userData: LoginRequest) => api.post<LoginResponse, LoginRequest>('/auth/login', userData)
  });

  const navigate = useNavigate();

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
        const data = await authMutation(formValues);
        if (data?.access_token) {
          Cookies.set('access_token', data.access_token);
          Cookies.set('userId', String(data.userId));
          if (formValues.isNotMyDevice) {
            Cookies.set('NotUserDevice', `true_${data.userId}`);
          } else {
            Cookies.remove('NotUserDevice');
          }
          AuthHandler(true);
          navigate('/');
        }
      } catch (error) {
        toast.error('Login failed. Please check your credentials.');
      }
    } else {
      toast.error('Please fill in all required fields.');
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.container_header}>DOGGEE</div>
        <form className={styles.form_container} onSubmit={loginHandler}>
          <div className={styles.input_container}>
            <LoginInput
              disabled={authLoading}
              type="text"
              label="username"
              value={formValues.username}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const username = event.target.value;
                setFormValues({ ...formValues, username });
                const error = validateLoginForm('username', username);
                setFormErrors({ ...formErrors, username: error });
              }}
              isError={!!formErrors.username}
              helperText={formErrors.username}
            />
          </div>
          <div className={styles.input_container}>
            <PasswordInput
              disabled={authLoading}
              type="password"
              label="password"
              value={formValues.password}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const password = event.target.value;
                setFormValues({ ...formValues, password });
                const error = validateLoginForm('password', password);
                setFormErrors({ ...formErrors, password: error });
              }}
              isError={!!formErrors.password}
              helperText={formErrors.password}
            />
          </div>
          <div className={styles.input_container}>
            <Checkbox
              disabled={authLoading}
              isChecked={formValues.isNotMyDevice}
              onChange={() => setFormValues((prev) => ({ ...prev, isNotMyDevice: !prev.isNotMyDevice }))}
              label="This is not my device"
            />
          </div>
          <div>
            <Button isLoading={authLoading} type="submit">
              Sign In
            </Button>
          </div>
        </form>
        <div onClick={() => navigate('/register')} className={styles.sign_up_container}>
          Create new account
        </div>
      </div>
    </div>
  );
};
