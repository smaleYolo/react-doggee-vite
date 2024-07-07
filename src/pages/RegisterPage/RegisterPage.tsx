import React, { useCallback, useEffect, useState } from 'react';


import styles from './RegisterPage.module.css';

import { Input, PasswordInput } from '@common/fields';
import { Button } from '@common/buttons';

import { useIntl } from '@features/intl';
import { useForm, useMutation, validatePassword, validateUsername } from '@utils/hooks';
import { LoginFormValues } from '@pages/LoginPage/LoginPage.tsx';
import { toast } from 'react-toastify';
import { api } from '@utils/api';
import { useNavigate } from 'react-router-dom';
import { IntlText } from '@features/intl/components';


interface RegisterResponse {
  message?: string,
  errors?: Array<{
    location: string,
    msg: string,
    type: string,
    path: string,
    value: string,
  }>
}

const CheckMarkSvg: React.FC = () => (
  <svg viewBox="0 0 17 12" width='15.000' fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd"
          d="M16.0326 2.87661C16.5818 2.25638 16.5242 1.30838 15.904 0.759195C15.2838 0.210007 14.3358 0.267598 13.7866 0.887827L7.43865 8.0569L3.0076 4.63263C2.3521 4.12606 1.41006 4.2468 0.903495 4.9023C0.396929 5.5578 0.517665 6.49984 1.17317 7.00641L6.51311 11.1331C6.54752 11.1704 6.58416 11.2064 6.623 11.2408C7.24323 11.7899 8.19123 11.7324 8.74042 11.1121L16.0326 2.87661Z"
          fill="#93B1FF" />
  </svg>
);

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { translateMessage } = useIntl();

  const { mutation: registerMutation } = useMutation<RegisterResponse, LoginFormValues>({
    request: (userData: LoginFormValues) => api.post<RegisterResponse, LoginFormValues>('/auth/register', userData)
  });

  const { values, errors, setFieldValue, isSubmitting, handleSubmit, resetForm } = useForm<LoginFormValues>({
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
      try {
        if (!Object.values(passwordRuleChecker).includes(false)) {
          // Тут проверяем данные пользователя
          const data = await registerMutation(values);
          toast.success(translateMessage(data?.message || 'data?.message' ));
          resetForm();

          navigate('/auth');
        } else {
          toast.error(translateMessage('page.registration.step.rule.checker'));
        }
      } catch (error) {
        toast.error(translateMessage('login.failed'));
      }
    }
  });

  const [passwordRuleChecker, setPasswordRuleChecker] = useState({
    "contain_number": false,
    "contain_uppercase": false,
    "contain_lowercase": false,
    "contain_5_characters": false,
    "passwords_match": false
  })

  const validatePasswordRules = useCallback((password: string, passwordRepeat: string) => ({
    passwords_match: password.length > 0 && password === passwordRepeat,
    contain_number: /\d/.test(password),
    contain_uppercase: /[A-Z]/.test(password),
    contain_lowercase: /[a-z]/.test(password),
    contain_5_characters: password.length >= 5,
  }), []);

  useEffect(() => {
    setPasswordRuleChecker(validatePasswordRules(values.password, values.passwordRepeat || ''));
  }, [values.password, values.passwordRepeat, validatePasswordRules]);


  return (
    <div className={styles.page}>
      <div className={styles.container}>

        <section>
          <h2
            className={styles.container_header}
          >
            {translateMessage('page.registration.step.fillLoginDataStep.title')}
          </h2>

          <form
            className={styles.form_container}
            onSubmit={(event) => handleSubmit(event)}>
            <div className={styles.input_container}>
              <Input
                disabled={isSubmitting}
                helperText={translateMessage(errors?.username || 'errors?.username') || ''}
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
                helperText={translateMessage(errors?.password || 'errors?.password') || ''}
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
              <PasswordInput
                id={'repeat-password-input'}
                disabled={isSubmitting}
                helperText={!passwordRuleChecker.passwords_match ? translateMessage('validations.compare.passwords') : ''}
                isError={!values.password.length ? false : !passwordRuleChecker.passwords_match}
                label={translateMessage('field.input.password.repeat.label')}
                type="password"
                value={values.passwordRepeat}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setFieldValue('passwordRepeat', event.target.value);
                }}
              />
            </div>

            <div>
              <Button
                isLoading={isSubmitting}
                disabled={isSubmitting}
                type="submit">
                {translateMessage('button.done')}
              </Button>
            </div>
          </form>

        </section>

        <section>
          <div className={styles.section_header}>
            DOGGEE
          </div>
          <div className={styles.section_color} />

          <div className={styles.section_rules}>
            <b>{translateMessage('page.registration.step.fillLoginDataStep.passwordRules.must')}</b>
            <div className={styles.section_rules_item}>
              {passwordRuleChecker.contain_number && <CheckMarkSvg />}
              <IntlText
                path='page.registration.step.fillLoginDataStep.passwordRules.containNumbers'
                ruleCheck={passwordRuleChecker.contain_number}
              />
            </div>
            <div className={styles.section_rules_item}>
              {passwordRuleChecker.contain_uppercase && <CheckMarkSvg />}
              <IntlText
                path='page.registration.step.fillLoginDataStep.passwordRules.containUppercase'
                ruleCheck={passwordRuleChecker.contain_uppercase}
              />
            </div>
            <div className={styles.section_rules_item}>
              {passwordRuleChecker.contain_lowercase && <CheckMarkSvg />}
              <IntlText
                path='page.registration.step.fillLoginDataStep.passwordRules.containLowerCase'
                ruleCheck={passwordRuleChecker.contain_lowercase}
              />
            </div>
            <div className={styles.section_rules_item}>
              {passwordRuleChecker.contain_5_characters && <CheckMarkSvg />}
              <IntlText
                path='page.registration.step.fillLoginDataStep.passwordRules.contain5Characters'
                ruleCheck={passwordRuleChecker.contain_5_characters}
              />
            </div>
            <div className={styles.section_rules_item}>
              {passwordRuleChecker.passwords_match && <CheckMarkSvg />}
              <IntlText
                path='page.registration.step.fillLoginDataStep.passwordRules.mustMatch'
                ruleCheck={passwordRuleChecker.passwords_match}
              />
            </div>
          </div>

          <div
            className={styles.section_color}
            onClick={() => navigate('/auth')}
          >
            <span className={styles.sign_in}>
              {translateMessage('page.registration.step.fillLoginDataStep.iAlreadyHaveAnAccount')}
            </span>
          </div>

        </section>
      </div>
    </div>
  );
};
