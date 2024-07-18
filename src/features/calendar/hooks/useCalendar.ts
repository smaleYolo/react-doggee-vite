import { useState, useEffect } from 'react';
import { createDate, createMonth, getMonthesNames, getMonthNumberOfDays, getWeekDaysNames } from '@features/calendar';
import { useUser } from '@utils/contexts';

export const useCalendar = (locale: string) => {
  const {getUserId} = useUser()

  const [isCalendar, setIsCalendar] = useState<boolean>(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  // Инициализация selectedDay из куки или null
  const initializeSelectedDay = (): ReturnType<typeof createDate> | null => {
    const cookieDate = localStorage.getItem(`birthday_${getUserId()}`);

    if (cookieDate) {
      const [day, month, year] = cookieDate.split('.').map(Number);
      return createDate({ date: new Date(year, month - 1, day) });
    }
    return null;
  };

  const [selectedDay, setSelectedDay] = useState<ReturnType<typeof createDate> | null>(initializeSelectedDay);


  const [selectedMonth, setSelectedMonth] = useState<{ monthShort: string; monthIndex: number; year: number } | null>(null);
  const [days, setDays] = useState<ReturnType<typeof createDate>[]>([]);
  const [weekDays, setWeekDays] = useState<{ day: string; dayShort: string }[]>([]);
  const [monthNames, setMonthNames] = useState<{ monthShort: string; monthIndex: number; year: number }[] | null>(null);
  const [years, setYears] = useState<string[]>([]);
  const [yearRange, setYearRange] = useState<{ start: number; end: number }>({ start: 2019, end: 2030 });
  const [calendarType, setCalendarType] = useState<'basic' | 'months' | 'years'>('basic');

  const { monthName, year } = createMonth({ date: currentDate, locale });

  useEffect(() => {
    const monthsObj = getMonthesNames(locale);
    const monthsNames = monthsObj.map((month) => ({
      monthShort: month.monthShort,
      monthIndex: month.monthIndex,
      year: currentDate.getFullYear(),
    }));
    setMonthNames(monthsNames);
    generateYears(yearRange.start, yearRange.end);
    updateDays(currentDate);
    setWeekDays(getWeekDaysNames(2, locale));
  }, [currentDate, locale, yearRange]);

  useEffect(() => {
    if (selectedDay && isCalendar) {
      setCurrentDate(selectedDay.date);
    }
  }, [isCalendar, selectedDay]);

  const generateYears = (startYear: number, endYear: number) => {
    const yearsArray = [];
    for (let i = startYear; i <= endYear; i++) {
      yearsArray.push(i.toString());
    }
    setYears(yearsArray);
  };

  const parseDateString = (dateString: string) => {
    const [day, month, year] = dateString.split('.').map(Number);
    return createDate({ date: new Date(year, month - 1, day) });
  };

  const updateDays = (date: Date) => {
    const monthData = createMonth({ date, locale });
    const previousMonth = new Date(date.getFullYear(), date.getMonth() - 1, 1);
    const nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);

    const daysInPreviousMonth = getMonthNumberOfDays(previousMonth.getMonth(), previousMonth.getFullYear());
    const firstDayIndex = (monthData.getDay(1).dayNumberInWeek + 5) % 7;

    const previousMonthDays = Array.from({ length: firstDayIndex }, (_, i) =>
      createDate({ date: new Date(previousMonth.getFullYear(), previousMonth.getMonth(), daysInPreviousMonth - i), locale })
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

  return {
    currentDate,
    selectedDay,
    days,
    weekDays,
    monthName,
    year,
    setCurrentDate,
    setSelectedDay,
    handleMonth,
    isCalendar,
    setIsCalendar,
    monthNames,
    calendarType,
    setCalendarType,
    selectedMonth,
    setSelectedMonth,
    years,
    handleDecade,
    handleYear,
    parseDateString
  };
};
