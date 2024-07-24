import React from 'react';
import type { InputProps } from '@common/fields';
import { Input } from '@common/fields';

interface WeightInputProps extends InputProps {}

export const WeightInput: React.FC<WeightInputProps> = ({
                                                      isError = false,
                                                      helperText = '',
                                                      label = 'Weight Input',
                                                      value,
                                                      onChange,  // Добавляем пропс onChange
                                                      ...props
                                                    }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/[^\d]/g, ''); // Удаляем все символы, кроме цифр
    e.target.value = input;
    if (onChange) onChange(e);
  };

  return (
    <Input
      helperText={helperText}
      isError={isError}
      label={label}
      style={{ cursor: 'text' }}
      value={value}
      onChange={handleInputChange}  // Используем локальный обработчик изменений
      {...props}
      components={props.components}
    />
  );
};
