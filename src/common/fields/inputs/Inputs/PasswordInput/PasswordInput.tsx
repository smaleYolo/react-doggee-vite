import type { InputProps } from '@common/fields';
import { Input } from '@common/fields';
import { HideSvg, ShowSvg } from '@utils/svg';
import React, { useState } from 'react';


interface PasswordInputProps extends InputProps {

}

export const PasswordInput: React.FC<PasswordInputProps> = ({
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
      helperText={helperText}
      isError={isError}
      label={label}
      type={showPassword ? 'text' : type}
      value={value}
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