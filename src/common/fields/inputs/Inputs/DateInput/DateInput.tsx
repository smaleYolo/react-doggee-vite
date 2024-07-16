import React from 'react';

import { Input, InputProps } from '@common/fields';


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
    <>
      <Input
        style={{cursor: 'text'}}
        value={value}
        label={label}
        isError={isError}
        readOnly
        helperText={helperText}
        {...props}

        components={props.components}
      />
    </>
  );
};