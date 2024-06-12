import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from '../../../axiosConfig';

import { Button } from '@common/buttons';
import { LoginInput } from '@common/fields';
import { Checkbox } from '@common/fields/inputs/Checkbox/Checkbox';
import { PasswordInput } from '@common/fields/inputs/Input/PasswordInput/PasswordInput';
import { useMutation } from '@utils/hooks/api/useMutation';
import { FormErrors, validateLoginForm } from '@utils/validations';

import styles from './LoginPage.module.css';


interface LoginResponse {
  access_token: string;
  userId: number;
}

const login = async (userData: { username: string; password: string }): Promise<LoginResponse> => {
  const response = await axios.post('http://localhost:3001/auth/login', userData);
  return response.data;
};

export const LoginPage = () => {
  const [formValues, setFormValues] = useState({ username: '', password: '' });
  const [formErrors, setFormErrors] = useState<FormErrors>({
    username: null,
    password: null
  });

  const { mutation: loginUser, isLoading, isError } = useMutation<LoginResponse, {
    username: string;
    password: string
  }>(login);

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
        const data = await loginUser({ username: formValues.username, password: formValues.password });
        if (data && data.access_token) {
          localStorage.setItem('access_token', data.access_token);
          navigate('/');
        }
      } catch (error) {
        toast.error(`Login failed. Please check your credentials. ${isError}`);
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
              disabled={isLoading}
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
              disabled={isLoading}
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
            <Checkbox />
          </div>
          <div>
            <Button isLoading={isLoading} type="submit">
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
