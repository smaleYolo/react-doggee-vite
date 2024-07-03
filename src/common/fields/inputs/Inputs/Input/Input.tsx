import React, { useState } from 'react';

import styles from '../Input.module.css';

interface InputProps extends Omit<React.HTMLProps<HTMLInputElement>, 'placeholder'> {
  isError?: boolean;
  helperText?: string | null;
  label?: string;
}

export const Input: React.FC<InputProps> = ({ isError = false, helperText = '', label, ...props }) => {
  const [focused, setFocused] = useState(false);
  const handleFocus = () => setFocused(true);
  const handleBlur = () => setFocused(false);

  return (
    <div className={`${styles.input_container} ${focused || props.value ? styles.focused : ''}`}>
      <label
className={styles.label}
htmlFor="input">
        {label}
      </label>
      <input
        className={`${styles.input} ${isError ? styles.error : ''}`}
        id="input"
        onBlur={handleBlur}
        onFocus={handleFocus}
        {...props}
      />
      {isError && helperText && <span className={styles.helper_text}>{helperText}</span>}
    </div>
  );
};
