import React, { useState } from 'react';

import styles from '../Input.module.css';

interface LoginInputProps extends Omit<React.HTMLProps<HTMLInputElement>, 'placeholder'> {
  isError?: boolean;
  helperText?: string | null;
  label?: string;
}

export const LoginInput: React.FC<LoginInputProps> = ({ isError = false, helperText = '', label, ...props }) => {
  const [focused, setFocused] = useState(false);
  const handleFocus = () => setFocused(true);
  const handleBlur = () => setFocused(false);

  return (
    <div className={`${styles.input_container} ${focused || props.value ? styles.focused : ''}`}>
      <label htmlFor="input" className={styles.label}>
        {label}
      </label>
      <input
        id="input"
        className={`${styles.input} ${isError ? styles.error : ''}`}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
      {isError && helperText && <span className={styles.helper_text}>{helperText}</span>}
    </div>
  );
};
