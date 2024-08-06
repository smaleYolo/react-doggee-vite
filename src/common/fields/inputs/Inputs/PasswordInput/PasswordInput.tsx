import type { InputProps } from '@common/fields';
import { Input } from '@common/fields';
import { HideSvg, ShowSvg } from '@utils/svg';
import React, { useEffect, useId, useState } from 'react';


interface PasswordInputProps extends InputProps {

}

export const PasswordInput: React.FC<PasswordInputProps> = ({
                                                              isError = false,
                                                              helperText = '',
                                                              label = 'Password Input',
                                                              type = 'password',
                                                              value,
                                                              onChange,
                                                              ...props
                                                            }) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const [inputValue, setInputValue] = useState(value || '');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (/^[a-zA-Z0-9]*$/.test(value)) {
      setInputValue(value);
      onChange(event);
    }
  };

  useEffect(() => {
    setInputValue(value || '');
  }, [value]);

  return (
    <Input
      helperText={helperText}
      isError={isError}
      label={label}
      type={showPassword ? 'text' : type}
      onChange={handleChange}
      value={inputValue}
      {...props}

      components={{
        indicator: value ? () => (
          <div
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <HideSvg /> : <ShowSvg />}
          </div>
        ) : undefined
      }}
    />
  );
};