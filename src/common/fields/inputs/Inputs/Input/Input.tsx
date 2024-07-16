import React, { useEffect, useId, useState } from 'react';

import styles from '../Input.module.css';

export interface InputProps extends Omit<React.HTMLProps<HTMLInputElement>, 'placeholder'> {
  isError?: boolean;
  helperText?: string | null;
  label?: string;
  isChecked?: boolean;
  mask?: string;
  components?: {
    indicator?: () => React.ReactElement;
  };
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input: React.FC<InputProps> = ({
                                              type = 'text',
                                              isError = false,
                                              helperText = '',
                                              label,
                                              components,
                                              onChange,
                                              value,
                                              ...props
                                            }) => {
  const id = useId();
  const [focused, setFocused] = useState(false);
  const [inputValue, setInputValue] = useState(value || '');

  const handleFocus = () => setFocused(true);
  const handleBlur = () => setFocused(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    if (/^[a-zA-Z0-9]*$/.test(value)) {
      setInputValue(value);
      onChange(event);
    }
  };

  useEffect(() => {
    setInputValue(value || '');
  }, [value]);


  return (
    <div className={`${styles.input_container} ${focused || inputValue ? styles.focused : ''}`}>
      <label
className={styles.label}
htmlFor={id}>
        {label}
      </label>
      <input
        className={`${styles.input} ${isError ? styles.error : ''}`}
        id={id}
        type={type}
        value={inputValue}
        onBlur={handleBlur}
        onChange={handleChange}
        onFocus={handleFocus}
        {...props}
      />
      {isError && helperText && <span className={styles.helper_text}>{helperText}</span>}
      {components?.indicator && (
        <div className={styles.indicator}>
          <components.indicator />
        </div>
      )}
    </div>
  );
};