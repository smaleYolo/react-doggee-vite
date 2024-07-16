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
  // Устанавливаем начальное состояние локали и сообщений
  const [locale, setLocale] = useState<Locale>(() => getLocale());
  const [messages, setMessages] = useState<Messages>(() => getMessages(locale));

  // Функция для смены языка
  const setLanguage = useCallback((newLocale: Locale) => {
    // Сохраняем новую локаль в куки и обновляем состояние
    Cookies.set('locale', newLocale);
    setLocale(newLocale);
  }, []);

  // Обновляем сообщения при смене локали
  useEffect(() => {
    // Функция будет выполнена при каждом изменении `locale`
    setMessages(getMessages(locale));
  }, [locale]);

  // Мемоизируем значение контекста для предотвращения ненужных перерисовок
  // новый объект value будет создан только тогда, когда изменится одно из этих значений
  const value: IntlContextProps = useMemo(() => ({
    locale,
    messages,
    setLanguage,
  }), [locale, messages, setLanguage]);

  return (
    <IntlContext.Provider value={value}>
      {children}
    </IntlContext.Provider>
  );
};
