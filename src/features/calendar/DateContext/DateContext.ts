import { createContext } from 'react';
import { useCalendar } from '@features/calendar';


export const DateContext = createContext<ReturnType<typeof useCalendar> | undefined>(undefined);
