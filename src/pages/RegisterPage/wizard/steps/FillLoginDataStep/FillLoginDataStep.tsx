import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { api } from '@utils/api';
import { useIntl } from '@features/intl';
import { useForm, useMutation } from '@utils/hooks';

import { validatePassword, validateUsername } from '@helpers/*';
import usePasswordRules from '@utils/hooks/passwordRules/usePasswordRules.ts';

import { PasswordRule } from 'src/pages/RegisterPage/components/PasswordRule';
import { RegisterForm } from 'src/pages/RegisterPage/components/RegisterForm';

import { ROUTES } from '@utils/constants';
import styles from '../../../RegisterPage.module.css';


interface RegisterResponse {
  message?: string;
}

export interface RegisterFormValues {
  username: string;
  password: string;
  passwordRepeat: string;
}


export const FillLoginDataStep = () => {
  const navigate = useNavigate();
  const { translateMessage } = useIntl();

  const { mutation: registerMutation } = useMutation<RegisterResponse, RegisterFormValues>({
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
          toast.success(translateMessage(data?.message || 'Registration successful!'));
          resetForm();
          navigate(ROUTES.AUTH);
        } catch (error) {
          toast.error(translateMessage('login.failed'));
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
          <h1
            className={styles.section_header}
          >
            {translateMessage('page.registration.step.fillLoginDataStep.title')}
          </h1>

          <RegisterForm
            handleSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            translateMessage={translateMessage}
            errors={errors}
            values={values}
            setFieldValue={setFieldValue}
            passwordRuleChecker={passwordRuleChecker}
            isRulesCompleted={isRulesCompleted}
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
