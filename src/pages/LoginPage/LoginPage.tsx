import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Button } from '@common/buttons';
import { Input } from '@inputs/Inputs/Input/Input';
import { Checkbox } from '@fields/inputs/Checkbox/Checkbox';
import { PasswordInput } from '@fields/inputs/Inputs/PasswordInput/PasswordInput';

import { api } from '@utils/api';
import { FormErrors, validateLoginForm } from '@helpers/validations';
import { useMutation } from '@utils/hooks';
import { useAuth } from '@utils/contexts';
import { useIntl } from '@features/intl/hooks';

import styles from './LoginPage.module.css';

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
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState<LoginRequest>({
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


  const { mutation: authMutation, isLoading: authLoading } = useMutation<LoginResponse, LoginRequest>({
    request: (userData: LoginRequest) => api.post<LoginResponse, LoginRequest>('/auth/login', userData)
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
        const data = await authMutation(formValues); //Тут проверяем данные пользователя
        console.log(data);
        login(data.access_token, data.userId, formValues.isNotMyDevice); //Здесь сохраняем данные в куках
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
      <div className={styles.container}>
        <div className={styles.container_header}>DOGGEE</div>
        <form className={styles.form_container} onSubmit={loginHandler}>
          <div className={styles.input_container}>
            <Input
              disabled={authLoading}
              type="text"
              label={translateMessage('field.input.username.label')}
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
              label={translateMessage('field.input.password.label')}
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
              label={translateMessage('field.checkbox.isNotMyDevice.label')}
            />
          </div>
          <div>
            <Button isLoading={authLoading} type="submit">
              {translateMessage('button.signIn')}
            </Button>
          </div>
        </form>
        <div onClick={() => navigate('/register')} className={styles.sign_up_container}>
          {translateMessage('page.login.createNewAccount')}
        </div>
      </div>
    </div>
  );
};
