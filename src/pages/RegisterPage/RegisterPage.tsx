import React from 'react';
import styles from './RegisterPage.module.css';

import { useIntl } from '@features/intl';
import { validatePassword, validateUsername } from '@helpers/*';
import { LoginResponse } from '@pages/LoginPage/LoginPage';
import { PasswordRule, RegisterForm } from '@pages/RegisterPage/components';
import { api } from '@utils/api';
import { ROUTES } from '@utils/constants';
import { useForm, useMutation } from '@utils/hooks';
import usePasswordRules from '@utils/hooks/passwordRules/usePasswordRules.ts';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '@contexts/AuthContext';

interface RegisterResponse extends LoginResponse {}

export interface RegisterFormValues {
  username: string;
  password: string;
  passwordRepeat: string;
}

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { translateMessage } = useIntl();
  const { login } = useAuth()

  const { mutation: registerMutation, isError: registerError } = useMutation<RegisterResponse, RegisterFormValues>({
    request: (userData: RegisterFormValues) => api.post<RegisterResponse, RegisterFormValues>('/auth/register', userData)
  });


  const { values, errors, setFieldValue, isSubmitting, handleSubmit, resetForm } = useForm<RegisterFormValues>({
    initialValues: {
      username: '',
      password: '',
      passwordRepeat: ''
    },
    validateSchema: {
      username: validateUsername,
      password: validatePassword
    },
    // validateOnChange: false,
    onSubmit: async (values) => {
      if (isRulesCompleted) {
        try {
          const data = await registerMutation(values);
          login(data.access_token, data.refresh_token, data.userId);
          toast.success(translateMessage(data.message));
          resetForm();
          navigate(ROUTES.MAIN);
        } catch (error) {
          toast.error(translateMessage((error as Error).message));
        }
      } else {
        toast.error(translateMessage('page.registration.step.rule.checker'));
      }
    }

  });

  const { passwordRuleChecker, isRulesCompleted, rules } = usePasswordRules({
    password: values.password,
    passwordRepeat: values.passwordRepeat
  });

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <section className={styles.section_left}>
          <div className={styles.section_header}>
            <h1 className={styles.section_header_title}>
              {translateMessage('page.registration.step.fillLoginDataStep.title')}
            </h1>

            <div style={{marginBottom: 92}}/>
          </div>


          <RegisterForm
            errors={errors}
            handleSubmit={handleSubmit}
            isRulesCompleted={isRulesCompleted}
            isSubmitting={isSubmitting}
            passwordRuleChecker={passwordRuleChecker}
            setFieldValue={setFieldValue}
            translateMessage={translateMessage}
            values={values}
          />

        </section>

        <section className={styles.section_right}>
          <div className={styles.section_right_header}>
            DOGGEE
          </div>

          <div className={styles.section_right_content}>
          <b>{translateMessage('page.registration.step.fillLoginDataStep.passwordRules.must')}</b>

            {
              rules.map((rule) => (
                <PasswordRule
                  key={rule.intlPath}
                  intlPath={rule.intlPath}
                  isCorrect={rule.isCorrect}
                />
              ))
            }

          </div>

          <div
            className={styles.section_right_bottom}
          >
            <span
              className={styles.section_right_sign_in}
              onClick={() => navigate(ROUTES.AUTH)}
            >
              {translateMessage('page.registration.step.fillLoginDataStep.iAlreadyHaveAnAccount')}
            </span>
          </div>
        </section>
      </div>
    </div>
  );
};
