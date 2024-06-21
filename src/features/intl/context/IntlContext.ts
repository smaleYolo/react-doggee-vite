import { createContext } from 'react';
import { Locale, Messages } from '@features/intl/helpers/IntlConfig.ts';

export interface IntlContextProps {
  locale: Locale;
  messages: Messages;
  setLanguage: (locale: Locale) => void;
}

export const IntlContext = createContext<IntlContextProps | undefined>(undefined);
