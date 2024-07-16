import React from 'react';


import { Input, PasswordInput } from '@common/fields';
import { Button } from '@common/buttons';
import { RegisterFormValues } from '@pages/RegisterPage/wizard/steps';

import styles from '@pages/RegisterPage/RegisterPage.module.css';

interface RegisterFormProps {
  handleSubmit: (event: React.FormEvent) => void;
  isSubmitting: boolean;
  translateMessage: (path: string, values?: Record<string, string | number | boolean>) => string;
  errors: { username?: string, password?: string, passwordRepeat?: string } | null;
  values: RegisterFormValues;
  setFieldValue: <T extends keyof RegisterFormValues>(field: T, value: RegisterFormValues[T]) => void;
  passwordRuleChecker: {
    passwords_match: boolean,
    contain_number: boolean,
    contain_uppercase: boolean,
    contain_lowercase: boolean,
    contain_5_characters: boolean,
  },
  isRulesCompleted: boolean
}

export const RegisterForm = ({
                               handleSubmit,
                               isSubmitting,
                               translateMessage,
                               errors,
                               values,
                               setFieldValue,
                               passwordRuleChecker,
                               isRulesCompleted
                             }: RegisterFormProps) => {
  return (
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
  );
};
