import React from 'react';
import type { InputProps } from '@common/fields';

import { Input } from '@common/fields';

interface DateInputProps extends InputProps {}

export const DateInput: React.FC<DateInputProps> = ({
                                                      isError = false,
                                                      helperText = '',
                                                      label = 'Date Input',
                                                      value,
                                                      onChange,  // Добавляем пропс onChange
                                                      ...props
                                                    }) => {
// Локальный обработчик изменений
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/[^\d]/g, ''); // Удаляем все символы, кроме цифр

    // Форматируем ввод в формате DD.MM.YYYY
    if (input.length > 2) {
      input = input.slice(0, 2) + '.' + input.slice(2);
    }
    if (input.length > 5) {
      input = input.slice(0, 5) + '.' + input.slice(5);
    }
    if (input.length > 10) {
      input = input.slice(0, 10); // Ограничиваем длину строки до 10 символов
    }

    e.target.value = input;

    // Вызываем переданный пропс onChange, если он есть
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
    />
  );
};
