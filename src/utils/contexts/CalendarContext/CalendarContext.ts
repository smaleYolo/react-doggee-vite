import { createContext, useContext } from 'react';
import { ICalendarProps } from '@utils/contexts';

export const CalendarContext = createContext<ICalendarProps | undefined>(undefined);

export const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error('useCalendar must be used within a CalendarProvider');
  }
  return context;
};