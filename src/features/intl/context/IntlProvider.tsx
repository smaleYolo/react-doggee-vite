import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { IntlContext, IntlContextProps } from '@features/intl';
import Cookies from 'js-cookie';

interface IntlProviderProps {
  children: ReactNode;
  initialLocale: 'en' | 'ru';
  defaultMessages: Record<string, Record<string, string>>;
}

export const IntlProvider = ({ children, initialLocale, defaultMessages }: IntlProviderProps) => {
  const [locale, setLocale] = useState<'en' | 'ru'>(initialLocale);
  const [messages, setMessages] = useState<Record<string, string>>(defaultMessages[initialLocale]); //json w/messages

  const setLanguage = useCallback((locale: 'en' | 'ru') => {
    setLocale(locale);
    Cookies.set('locale', locale);
  }, []);

  useEffect(() => {
    const localeCookie = Cookies.get('locale');

    if (localeCookie){
      setMessages(defaultMessages[localeCookie]); //выбираем нужный json messages['ru'] || messages['en']
    } else {
      setMessages(defaultMessages[locale])
    }

  }, [locale, defaultMessages]);

  const value: IntlContextProps = {
    locale,
    messages,
    setLanguage,
  };

  return (
    <IntlContext.Provider value={value}>
      {children}
    </IntlContext.Provider>
  );
};
