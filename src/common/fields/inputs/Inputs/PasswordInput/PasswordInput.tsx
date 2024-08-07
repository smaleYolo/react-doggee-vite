import React, { useEffect, useState } from 'react';
import type { InputProps } from '@common/fields';

import { Input } from '@common/fields';
import { HideSvg, ShowSvg } from '@utils/svg';


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
  const [inputValue, setInputValue] = useState(value || '');

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  // Обработчик изменения значения
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (/^[a-zA-Z0-9]*$/.test(value)) { // Допускаются только буквенно-цифровые символы
      setInputValue(value);
      onChange(event);
    }
  };

  // Эффект для синхронизации локального состояния с пропсом value
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
      components={{
        indicator: value ? () => (
          <div onClick={togglePasswordVisibility}>
            {showPassword ? <HideSvg /> : <ShowSvg />}
          </div>
        ) : undefined
      }}
      {...props}
    />
  );
};