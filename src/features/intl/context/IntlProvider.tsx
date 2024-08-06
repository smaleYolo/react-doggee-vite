import type { ReactNode} from 'react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import type { IntlContextProps } from '@features/intl';
import { IntlContext } from '@features/intl';
import { getLocale, getMessages } from '@features/intl/helpers';
import { Locale, Messages } from '@features/intl/helpers/IntlConfig';
import Cookies from 'js-cookie';


interface IntlProviderProps {
  children: ReactNode;
}

export const IntlProvider = ({ children }: IntlProviderProps) => {
  const [locale, setLocale] = useState<Locale>(() => getLocale());
  const [messages, setMessages] = useState<Messages>(() => getMessages(locale));

  const setLanguage = (newLocale: Locale) => {
    Cookies.set('locale', newLocale);
    setLocale(newLocale);
  }


  useEffect(() => {
    setMessages(getMessages(locale));
  }, [locale]);

  const value: IntlContextProps = {
    locale,
    messages,
    setLanguage,
  }

  return (
    <IntlContext.Provider value={value}>
      {children}
    </IntlContext.Provider>
  );
};
