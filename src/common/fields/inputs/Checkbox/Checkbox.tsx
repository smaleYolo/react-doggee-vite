import React from 'react';

import styles from './Checkbox.module.css';

interface CheckboxProps extends React.HTMLAttributes<HTMLInputElement> {
  onChange: () => void;
  isChecked?: boolean;
  label: string;
  disabled?: boolean;
}

export const Checkbox = ({ onChange, isChecked, label, disabled }: CheckboxProps) => {
  return (
    <label
      className={styles.checkbox_container}
      htmlFor="checkbox">
      <input
        checked={isChecked}
        className={styles.real_checkbox}
        disabled={disabled}
        id="checkbox"
        type="checkbox"
        onChange={onChange}
      />
      <span className={styles.custom_checkbox} />
      {label}
    </label>
  );
};
