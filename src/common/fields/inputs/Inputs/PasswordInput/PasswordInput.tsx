import React, { useState } from 'react';

import styles from '../Input.module.css';

interface InputProps extends Omit<React.HTMLProps<HTMLInputElement>, 'placeholder'> {
  isError?: boolean;
  helperText?: string | null;
}

export const ShowSvg = () => (
  <svg
    fill="none"
    height="16.154999"
    viewBox="0 0 18 12.465"
    width="18.000000"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <path
      d="M9 0C6.52 0 4.3 0.99 2.7 2.22C1.9 2.83 1.24 3.52 0.77 4.19C0.32 4.84 0 5.56 0 6.23C0 6.89 0.32 7.61 0.77 8.27C1.24 8.94 1.9 9.63 2.7 10.24C4.3 11.47 6.52 12.46 9 12.46C11.47 12.46 13.69 11.47 15.29 10.24C16.09 9.63 16.75 8.94 17.22 8.27C17.67 7.61 18 6.89 18 6.23C18 5.56 17.67 4.84 17.22 4.19C16.75 3.52 16.09 2.83 15.29 2.22C13.69 0.99 11.47 0 9 0ZM1.38 6.23C1.38 5.97 1.52 5.54 1.91 4.98C2.28 4.44 2.84 3.85 3.54 3.31C4.95 2.23 6.88 1.38 9 1.38C11.11 1.38 13.04 2.23 14.45 3.31C15.15 3.85 15.71 4.44 16.08 4.98C16.47 5.54 16.61 5.97 16.61 6.23C16.61 6.48 16.47 6.92 16.08 7.48C15.71 8.02 15.15 8.6 14.45 9.14C13.04 10.22 11.11 11.08 9 11.08C6.88 11.08 4.95 10.22 3.54 9.14C2.84 8.6 2.28 8.02 1.91 7.48C1.52 6.92 1.38 6.48 1.38 6.23ZM9 2.76C7.08 2.76 5.53 4.32 5.53 6.23C5.53 8.14 7.08 9.69 9 9.69C10.91 9.69 12.46 8.14 12.46 6.23C12.46 4.32 10.91 2.76 9 2.76ZM6.92 6.23C6.92 5.08 7.85 4.15 9 4.15C10.14 4.15 11.07 5.08 11.07 6.23C11.07 7.37 10.14 8.31 9 8.31C7.85 8.31 6.92 7.37 6.92 6.23Z"
      fill="#000000"
      fillOpacity="0.500000"
      fillRule="evenodd"
      id="Icon"
    />
  </svg>
);

export const HideSvg = () => (
  <svg
    fill="none"
    height="16.154999"
    viewBox="0 0 18 16.155"
    width="18.000000"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <path
      d="M16.87 1.18C17.14 0.91 17.14 0.47 16.87 0.2C16.6 -0.07 16.16 -0.07 15.89 0.2L1.12 14.97C0.85 15.24 0.85 15.68 1.12 15.95C1.39 16.22 1.83 16.22 2.1 15.95L4.73 13.32C5.99 13.91 7.44 14.3 9 14.3C11.47 14.3 13.69 13.31 15.29 12.08C16.09 11.47 16.75 10.78 17.22 10.11C17.67 9.46 18 8.74 18 8.07C18 7.41 17.67 6.69 17.22 6.03C16.75 5.36 16.09 4.68 15.29 4.06C15.05 3.88 14.79 3.7 14.52 3.52L16.87 1.18ZM9 1.84C9.94 1.84 10.84 1.98 11.69 2.23C11.87 2.28 11.92 2.51 11.79 2.64L11.06 3.37C11 3.43 10.91 3.46 10.82 3.44C10.23 3.3 9.62 3.23 9 3.23C6.88 3.23 4.95 4.08 3.54 5.16C2.84 5.7 2.28 6.28 1.91 6.82C1.52 7.38 1.38 7.82 1.38 8.07C1.38 8.33 1.52 8.76 1.91 9.32C2.23 9.79 2.69 10.29 3.27 10.76C3.38 10.86 3.39 11.04 3.29 11.14L2.66 11.77C2.57 11.86 2.42 11.87 2.33 11.78C1.69 11.25 1.16 10.68 0.77 10.11C0.32 9.46 0 8.74 0 8.07C0 7.41 0.32 6.69 0.77 6.03C1.24 5.36 1.9 4.68 2.7 4.06C4.3 2.84 6.52 1.84 9 1.84ZM13.52 4.53L11.88 6.16C12.25 6.71 12.46 7.37 12.46 8.07C12.46 9.98 10.91 11.53 9 11.53C8.29 11.53 7.63 11.32 7.09 10.96L5.78 12.27C6.76 12.67 7.85 12.92 9 12.92C11.11 12.92 13.04 12.07 14.45 10.99C15.15 10.45 15.71 9.86 16.08 9.32C16.47 8.76 16.61 8.33 16.61 8.07C16.61 7.82 16.47 7.38 16.08 6.82C15.71 6.28 15.15 5.7 14.45 5.16C14.16 4.94 13.85 4.73 13.52 4.53ZM9.28 4.62C9.19 4.61 9.09 4.61 9 4.61C7.08 4.61 5.53 6.16 5.53 8.07C5.53 8.17 5.54 8.27 5.55 8.36C5.56 8.56 5.8 8.63 5.94 8.49L7.03 7.4C7.24 6.79 7.72 6.32 8.32 6.11L9.41 5.01C9.55 4.87 9.48 4.64 9.28 4.62ZM8.1 9.95C8.37 10.08 8.67 10.15 9 10.15C10.14 10.15 11.07 9.22 11.07 8.07C11.07 7.75 11 7.45 10.87 7.18L8.1 9.95Z"
      fill="#000000"
      fillOpacity="0.500000"
      fillRule="evenodd"
      id="Icon"
    />
  </svg>
);

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
htmlFor="password-input">
        {label}
      </label>
      <input
        className={`${styles.input} ${isError ? styles.error : ''}`}
        id="password-input"
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
          {showPassword ? <HideSvg />  : <ShowSvg />}
        </div>
      )}
    </div>
  );
};