import React, { useState } from 'react';

import { HideSvg, ShowSvg } from '@utils/svg';
import { Input, InputProps } from '@common/fields';


interface PasswordInputProps extends InputProps {

}

export const PasswordInput: React.FC<PasswordInputProps> = ({
                                                              id,
                                                              isError = false,
                                                              helperText = '',
                                                              label = 'Password Input',
                                                              type = 'password',
                                                              value,
                                                              ...props
                                                            }) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <Input
      id={id}
      type={showPassword ? 'text' : type}
      value={value}
      label={label}
      isError={isError}
      helperText={helperText}
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