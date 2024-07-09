import React from 'react';

import styles from './Checkbox.module.css';
import { InputProps } from '@common/fields';

type CheckboxProps = InputProps

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
