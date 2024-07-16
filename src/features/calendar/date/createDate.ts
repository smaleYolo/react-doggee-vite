import { getWeekNumber } from '@features/calendar';

interface CreateDateParams {
  locale?: string;
  date?: Date;
}

// Создает объект с информацией о дате
export const createDate = (params?: CreateDateParams) => {
  const locale = params?.locale ?? 'default';
  const d = params?.date ?? new Date();
  const dayNumber = d.getDate();
  const day = d.toLocaleDateString(locale, { weekday: 'long' });
  const dayNumberInWeek = d.getDay() + 1;
  const dayShort = d.toLocaleDateString(locale, { weekday: 'short' });
  const year = d.getFullYear();
  const yearShort = d.toLocaleDateString(locale, { year: '2-digit' });
  const month = d.toLocaleDateString(locale, { month: 'long' });
  const monthShort = d.toLocaleDateString(locale, { month: 'short' });
  const monthNumber = d.getMonth() + 1;
  const monthIndex = d.getMonth();
  const timestamp = d.getTime();
  const week = getWeekNumber(d);

  return {
    date: d,
    dayNumber,
    day,
    dayNumberInWeek,
    dayShort,
    year,
    yearShort,
    month,
    monthShort,
    monthNumber,
    monthIndex,
    timestamp,
    week
  };
};

// Пример использования:
// const dateInfo = createDate({ date: new Date(2024, 6, 11) });
// console.log(dateInfo);
// Пример вывода:
// {
//   date: Date object,
//   dayNumber: 11,
//   day: 'Thursday',
//   dayNumberInWeek: 5,
//   dayShort: 'Thu',
//   year: 2024,
//   yearShort: '24',
//   month: 'July',
//   monthShort: 'Jul',
//   monthNumber: 7,
//   monthIndex: 6,
//   timestamp: 1720646400000,
//   week: 28
// }