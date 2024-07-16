import React from 'react';
import type { InputProps } from '@common/fields';
import { Input } from '@common/fields';


interface DateInputProps extends InputProps {
}

export const DateInput: React.FC<DateInputProps> = ({
                                                          isError = false,
                                                          helperText = '',
                                                          label = 'Date Input',
                                                          value,
                                                          ...props
                                                        }) => {

  return (
    <Input
        readOnly
        helperText={helperText}
        isError={isError}
        label={label}
        style={{cursor: 'text'}}
        value={value}
        {...props}

        components={props.components}
      />
  );
};