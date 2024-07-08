import React, { useState } from 'react';

import styles from '../Input.module.css';
import { HideSvg, ShowSvg } from '@utils/svg';

interface InputProps extends Omit<React.HTMLProps<HTMLInputElement>, 'placeholder'> {
  isError?: boolean;
  helperText?: string | null;
}

export const PasswordInput: React.FC<InputProps> = ({
                                                      isError = false,
                                                      helperText = '',
                                                      label,
                                                      type = 'text',
                                                      value,
                                                      ...props
                                                    }) => {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleFocus = () => setFocused(true);
  const handleBlur = () => setFocused(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className={`${styles.input_container} ${focused || value ? styles.focused : ''}`}>
      <label
        className={styles.label}
        htmlFor={props.id || 'password-input'}>
        {label}
      </label>
      <input
        className={`${styles.input} ${isError ? styles.error : ''}`}
        id={props.id || 'password-input'}
        type={showPassword ? 'text' : type}
        value={value}
        onBlur={handleBlur}
        onFocus={handleFocus}
        {...props}
      />
      {isError && helperText && <span className={styles.helper_text}>{helperText}</span>}
      {type === 'password' && value && (
        <div
          className={styles.password_toggle_container}
          onClick={togglePasswordVisibility}>
          {showPassword ? <HideSvg /> : <ShowSvg />}
        </div>
      )}
    </div>
  );
};