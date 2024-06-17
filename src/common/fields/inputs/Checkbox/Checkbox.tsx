import React from 'react';
import styles from './Checkbox.module.css';

interface CheckboxProps extends React.HTMLAttributes<HTMLInputElement> {
  onChange: () => void;
  isChecked?: boolean;
  label: string;
  disabled: boolean
}

export const Checkbox = ({ onChange, isChecked, label, disabled }: CheckboxProps) => {
  return (
    <label htmlFor="checkbox" className={styles.checkbox_container}>
      <input
        id="checkbox"
        disabled={disabled}
        checked={isChecked}
        onChange={onChange}
        type="checkbox"
        className={styles.real_checkbox}
      />
      <span className={styles.custom_checkbox} />
      {label}
    </label>
  );
};
