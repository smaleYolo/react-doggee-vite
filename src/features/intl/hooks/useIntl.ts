import { useContext } from 'react';
import { IntlContext } from '@features/intl';

export const useIntl = () => {
  const context = useContext(IntlContext);

  if (!context) {
    throw new Error('useIntl must be used within an IntlProvider');
  }

  return context;
}