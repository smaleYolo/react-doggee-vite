import { ReactNode, useContext } from 'react';
import { useIntl } from '@features/intl';
import { DateContext, useCalendar } from '@features/calendar';

interface DateProviderProps {
  children: ReactNode;
}

export const DateProvider = ({ children }: DateProviderProps) => {
  const { locale } = useIntl();
  const calendar = useCalendar(locale);

  return <DateContext.Provider value={calendar}>{children}</DateContext.Provider>;
};

export const useDate = () => {
  const context = useContext(DateContext);
  if (!context) {
    throw new Error('useDate must be used within a DateProvider');
  }
  return context;
};