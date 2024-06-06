import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@common/buttons';
import { LoginInput } from '@common/fields';
import { Checkbox } from '@common/fields/inputs/Checkbox/Checkbox';
import { PasswordInput } from '@common/fields/inputs/Input/PasswordInput/PasswordInput';
import axios from 'axios';

import styles from './LoginPage.module.css';

const validateIsEmpty = (value: string) => {
  if (!value) return 'Field Required!';
  return null;
};

const validateUsername = (value: string) => {
  return validateIsEmpty(value);
};

const validatePassword = (value: string) => {
  return validateIsEmpty(value);
};

const loginValidateSchema = {
  username: validateUsername,
  password: validatePassword
};

const validateLoginForm = (name: keyof typeof loginValidateSchema, value: string) => {
  return loginValidateSchema[name](value);
};

interface FormErrors {
  username: string | null;
  password: string | null;
}



export const LoginPage = () => {
  const [formValues, setFormValues] = React.useState({ username: '', password: '' });
  const [formErrors, setFormErrors] = React.useState<FormErrors>({
    username: '',
    password: ''
  });

  const navigate = useNavigate();

  const registerHandler = async (event:  React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (formValues.username && formValues.password && !formErrors.password && !formErrors.username) {
      const {data} = await axios.post('http://localhost:3001/auth/login', formValues);

      console.log(data);
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.container_header}>DOGGEE</div>

        <form className={styles.form_container}
          onSubmit={(event) => registerHandler(event)}
        >
          <div className={styles.input_container}>
            <LoginInput
              type="text"
              label="username"
              value={formValues.username}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const username = event.target.value;
                setFormValues({ ...formValues, username });

                const error = validateLoginForm('username', username);

                setFormErrors({ ...formErrors, username: error });
              }}
              {...(!!formErrors.username && {
                isError: !!formErrors.username,
                helperText: formErrors.username
              })}
            />
          </div>

          <div className={styles.input_container}>
            <PasswordInput
              type="password"
              label="password"
              value={formValues.password}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const password = event.target.value;
                setFormValues({ ...formValues, password });

                const error = validateLoginForm('password', password);

                setFormErrors({ ...formErrors, password: error });
              }}
              {...(!!formErrors.password && {
                isError: !!formErrors.password,
                helperText: formErrors.password
              })}
            />
          </div>

          <div className={styles.input_container}>
            <Checkbox/>
          </div>

          <div>
            <Button
              // isLoading
            >
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
