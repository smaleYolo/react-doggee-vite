import { createContext } from 'react';
import { Locale, Messages } from '@utils/helpers/intl/localesConfig.ts';

export interface IntlContextProps {
  locale: Locale;
  messages: Messages;
  setLanguage: (locale: Locale) => void;
}

export const IntlContext = createContext<IntlContextProps | undefined>(undefined);
