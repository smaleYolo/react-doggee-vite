import { createContext, useContext } from 'react';
import { IUseCalendar } from '@utils/contexts';


export const DateContext = createContext<IUseCalendar | undefined>(undefined);

export const useDate = () => {
  const context = useContext(DateContext);
  if (!context) {
    throw new Error('useDate must be used within a DateProvider');
  }
  return context;
};