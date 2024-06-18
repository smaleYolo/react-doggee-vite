import { createContext } from 'react';

export interface IntlContextProps {
  locale: 'en' | 'ru';
  messages: Record<string, string>;
  setLanguage: (locale: 'en' | 'ru') => void;
}



export const IntlContext = createContext<IntlContextProps | undefined>(undefined)
