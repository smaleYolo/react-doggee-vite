import React, { useId, useRef, useState } from 'react';
import styles from '../../Inputs/Input.module.css';
import { IDog } from '@utils/models';
import { useIntl } from '@features/intl';

export interface SelectProps extends React.HTMLProps<HTMLSelectElement> {
  options: IDog['breed'][],
  isError?: boolean;
  helperText?: string | null;
  label?: string;
  isChecked?: boolean;
  mask?: string;
  components?: {
    indicator?: () => React.ReactElement;
  };
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  value?: string | number | readonly string[] | undefined;
}

export const Select: React.FC<SelectProps> = ({
                                                isError = false,
                                                helperText = '',
                                                label,
                                                components,
                                                onChange,
                                                options,
                                                value,
                                                ...props
                                              }) => {
  const id = useId();
  const { translateMessage } = useIntl();
  const [focused, setFocused] = useState<boolean>(!!value || true);

  const selectRef = useRef<HTMLSelectElement>(null);

  const handleFocus = () => setFocused(true);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event);
  };


  return (
    <div className={`${styles.input_container} ${focused && value ? styles.focused : ''}`}>
      <label
        className={styles.label}
        htmlFor={id}>
        {label}
      </label>
      <select
        ref={selectRef}
        className={`${styles.input} ${styles.select} ${isError ? styles.error : ''}`}
        id={id}
        value={value}
        onFocus={handleFocus}
        onChange={handleSelectChange}
        {...props}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {translateMessage(option)}
          </option>
        ))}
      </select>
      {isError && helperText && <span className={styles.helper_text}>{helperText}</span>}
      {
        components && components.indicator && (
          <div className={styles.indicator_arrow}>
            <components.indicator/>
          </div>
        )
      }
    </div>
  );
};