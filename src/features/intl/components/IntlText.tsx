import React from 'react';
import { useIntl } from '../hooks/useIntl';

interface IntlTextProps {
  path: string;
  values?: Record<string, any>;
  children?: (message: string) => React.ReactNode;
}

export const IntlText: React.FC<IntlTextProps> = ({ path, values, children }) => {
  const { translateMessage } = useIntl();

  const message = translateMessage(path, values);

  if (typeof children === 'function') {
    return <>{children(message)}</>;
  }

  return <>{message}</>;
};
