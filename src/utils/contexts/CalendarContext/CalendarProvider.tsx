import { ReactNode, useEffect, useState } from 'react';
import { CalendarContext, useAuth } from '@utils/contexts';
import { useIntl } from '@features/intl';
import { createDate, createMonth, getMonthesNames, getMonthNumberOfDays, getWeekDaysNames } from '@helpers/*';


export interface ICalendarProps {
  today: Date;
  currentDate: Date;
  days: ReturnType<typeof createDate>[];
  weekDays: { day: string; dayShort: string }[];
  monthName: string;
  year: number;
  setCurrentDate: (date: Date) => void;
  handleMonth: (direction: 'prev' | 'next') => void;
  isCalendar: boolean;
  setIsCalendar: (isCalendar: boolean) => void;
  monthNames: { monthShort: string; monthIndex: number; year: number }[] | null;
  calendarType: 'basic' | 'months' | 'years';
  setCalendarType: (type: 'basic' | 'months' | 'years') => void;
  years: string[];
  handleDecade: (direction: 'prev' | 'next') => void;
  handleYear: (direction: 'prev' | 'next') => void;
  getFullYears: (birthdate: string | Date) => number;
}

export const CalendarProvider = ({ children }: { children: ReactNode; }) => {
  const { locale } = useIntl();
  const { logout } = useAuth();

  const [today] = useState(() => {
    return new Date();
  })
  const [isCalendar, setIsCalendar] = useState<boolean>(false);
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [calendarType, setCalendarType] = useState<'basic' | 'months' | 'years'>('basic');
  const [days, setDays] = useState<ReturnType<typeof createDate>[]>([]);
  const [weekDays, setWeekDays] = useState<{ day: string; dayShort: string }[]>([]);
  const [monthNames, setMonthNames] = useState<{ monthShort: string; monthIndex: number; year: number }[] | null>(null);
  const [years, setYears] = useState<string[]>([]);
  const [yearRange, setYearRange] = useState<{ start: number; end: number }>({ start: 2019, end: 2030 });

  const generateYears = (startYear: number, endYear: number) => {
    const yearsArray = [];
    for (let i = startYear; i <= endYear; i++) {
      yearsArray.push(i.toString());
    }
    setYears(yearsArray);
  };
  const updateDays = (date: Date) => {
    const monthData = createMonth({ date, locale });
    const previousMonth = new Date(date.getFullYear(), date.getMonth() - 1, 1);
    const nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);

    const daysInPreviousMonth = getMonthNumberOfDays(previousMonth.getMonth(), previousMonth.getFullYear());
    const firstDayIndex = (monthData.getDay(1).dayNumberInWeek + 5) % 7;

    const previousMonthDays = Array.from({ length: firstDayIndex }, (_, i) =>
      createDate({
        date: new Date(previousMonth.getFullYear(), previousMonth.getMonth(), daysInPreviousMonth - i),
        locale
      })
    ).reverse();

    const lastDayIndex = (monthData.getDay(monthData.createMonthDays().length).dayNumberInWeek + 5) % 7;
    const nextMonthDays = Array.from({ length: 6 - lastDayIndex }, (_, i) =>
      createDate({ date: new Date(nextMonth.getFullYear(), nextMonth.getMonth(), i + 1), locale })
    );

    setDays([...previousMonthDays, ...monthData.createMonthDays(), ...nextMonthDays]);
  };
  const handleMonth = (direction: 'prev' | 'next') => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() + (direction === 'next' ? 1 : -1));
      return newDate;
    });
  };
  const handleYear = (direction: 'prev' | 'next') => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setFullYear(prevDate.getFullYear() + (direction === 'next' ? 1 : -1));
      return newDate;
    });
  };
  const handleDecade = (direction: 'prev' | 'next') => {
    setYearRange((prevRange) => {
      const newStart = direction === 'next' ? prevRange.start + 10 : prevRange.start - 10;
      const newEnd = direction === 'next' ? prevRange.end + 10 : prevRange.end - 10;
      generateYears(newStart, newEnd);
      return { start: newStart, end: newEnd };
    });
  };
  const getFullYears = (birthdate: string | Date) => {
    const birthdateObj = new Date(birthdate); // Преобразование строки в объект Date
    const today = new Date();
    const diffInMilliSeconds = today.getTime() - birthdateObj.getTime();
    const diffInYears = diffInMilliSeconds / 1000 / 60 / 60 / 24 / 365.25;
    return Math.abs(Math.round(diffInYears));
  };

  const { monthName, year } = createMonth({ date: currentDate, locale });

  useEffect(() => {
    const monthsObj = getMonthesNames(locale);
    const monthsNames = monthsObj.map((month) => ({
      monthShort: month.monthShort,
      monthIndex: month.monthIndex,
      year: currentDate.getFullYear()
    }));
    setMonthNames(monthsNames);
    generateYears(yearRange.start, yearRange.end);
    updateDays(currentDate);
    setWeekDays(getWeekDaysNames(2, locale));
  }, [currentDate, locale, yearRange]);


  useEffect(() => {
    setCurrentDate(new Date());
    setCalendarType('basic');
    setDays([]);
    setWeekDays([]);
    setMonthNames(null);
    setYears([]);
  }, [logout]);

  const value: ICalendarProps = {
    today,
    currentDate,
    days,
    weekDays,
    monthName,
    year,
    setCurrentDate,
    handleMonth,
    isCalendar,
    setIsCalendar,
    monthNames,
    calendarType,
    setCalendarType,
    years,
    handleDecade,
    handleYear,
    getFullYears
  };


  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
};