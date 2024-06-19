import { useContext } from 'react';
import { IntlContext } from '@features/intl';

export const useIntl = () => {
  const intl = useContext(IntlContext);

  if (!intl) {
    throw new Error('useIntl must be used within an IntlProvider');
  }

  const translateMessage = (path: string, values?: Record<string, string | number | boolean>): string => {
    let message = intl.messages[path];

    if (!message) {
      return path;
    }

    if (values) {
      Object.keys(values).forEach((key) => {
        const regex = new RegExp(`{${key}}`, 'g');
        message = message.replace(regex, String(values[key]));
      });
    }

    return message;
  };

  return { ...intl, translateMessage };
};
