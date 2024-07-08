import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { api } from '@utils/api';
import { useIntl } from '@features/intl';
import { useForm, useMutation } from '@utils/hooks';
import { validatePassword, validateUsername } from '@helpers/*';
import usePasswordRules from '@utils/hooks/passwordRules/usePasswordValidation';

import { Input, PasswordInput } from '@common/fields';
import { Button } from '@common/buttons';
import { CheckMarkSvg, WarningSvg } from '@utils/svg';

import { ROUTES } from '@utils/constants';
import { IntlText } from '@features/intl/components';

import styles from './RegisterPage.module.css';

interface RegisterResponse {
  message?: string
}

interface RegisterFormValues {
  username: string;
  password: string;
  passwordRepeat: string;
}


export const RegisterPage = () => {
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
      try {
        if (isRulesCompleted) {
          const data = await registerMutation(values);
          toast.success(translateMessage(data?.message || 'data?.message'));
          resetForm();

          navigate(ROUTES.AUTH);
        } else {
          toast.error(translateMessage('page.registration.step.rule.checker'));
        }
      } catch (error) {
        toast.error(translateMessage('login.failed'));
      }
    }
  });

  const { passwordRuleChecker, isRulesCompleted } = usePasswordRules({
    password: values.password,
    passwordRepeat: values.passwordRepeat
  });

  return (
    <div className={styles.page}>
      <div className={styles.container}>

        <section>
          <h1
            className={styles.container_header}
          >
            {translateMessage('page.registration.step.fillLoginDataStep.title')}
          </h1>

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

            <Button
              isLoading={isSubmitting}
              disabled={!isRulesCompleted}
              type="submit">
              {translateMessage('button.done')}
            </Button>
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
              {passwordRuleChecker.contain_number ? <CheckMarkSvg /> : <WarningSvg />}
              <IntlText
                path="page.registration.step.fillLoginDataStep.passwordRules.containNumbers"
                ruleCheck={passwordRuleChecker.contain_number}
              />
            </div>
            <div className={styles.section_rules_item}>
              {passwordRuleChecker.contain_uppercase ? <CheckMarkSvg /> : <WarningSvg />}
              <IntlText
                path="page.registration.step.fillLoginDataStep.passwordRules.containUppercase"
                ruleCheck={passwordRuleChecker.contain_uppercase}
              />
            </div>
            <div className={styles.section_rules_item}>
              {passwordRuleChecker.contain_lowercase ? <CheckMarkSvg /> : <WarningSvg />}
              <IntlText
                path="page.registration.step.fillLoginDataStep.passwordRules.containLowerCase"
                ruleCheck={passwordRuleChecker.contain_lowercase}
              />
            </div>
            <div className={styles.section_rules_item}>
              {passwordRuleChecker.contain_5_characters ? <CheckMarkSvg /> : <WarningSvg />}
              <IntlText
                path="page.registration.step.fillLoginDataStep.passwordRules.contain5Characters"
                ruleCheck={passwordRuleChecker.contain_5_characters}
              />
            </div>
            <div className={styles.section_rules_item}>
              {passwordRuleChecker.passwords_match ? <CheckMarkSvg /> : <WarningSvg />}
              <IntlText
                path="page.registration.step.fillLoginDataStep.passwordRules.mustMatch"
                ruleCheck={passwordRuleChecker.passwords_match}
              />
            </div>
          </div>

          <div
            className={styles.section_color}
          >
            <span
              className={styles.sign_in}
              onClick={() => navigate(ROUTES.AUTH)}
            >
              {translateMessage('page.registration.step.fillLoginDataStep.iAlreadyHaveAnAccount')}
            </span>
          </div>

        </section>
      </div>
    </div>
  )
};
