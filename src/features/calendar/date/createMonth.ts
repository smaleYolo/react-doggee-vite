import { createDate, getMonthNumberOfDays } from '@features/calendar';

interface CreateMonthParams {
  date?: Date;
  locale?: string;
}

// Создает объект с информацией о месяце и его днях
export const createMonth = (params?: CreateMonthParams) => {
  const date = params?.date ?? new Date();
  const locale = params?.locale ?? 'default';
  const d = createDate({ date, locale });
  const { month: monthName, year, monthNumber, monthIndex } = d;

  const getDay = (dayNumber: number) =>
    createDate({ date: new Date(year, monthIndex, dayNumber), locale });

  const createMonthDays = () => {
    const days = [];
    for (let i = 0; i <= getMonthNumberOfDays(monthIndex, year) - 1; i += 1) {
      days[i] = getDay(i + 1);
    }
    return days;
  };

  return {
    getDay,
    monthName,
    monthIndex,
    monthNumber,
    year,
    createMonthDays
  };
};

// Пример использования:
// const monthInfo = createMonth({ date: new Date(2024, 6, 1) });
// console.log(monthInfo.createMonthDays());
// Пример вывода:
// [
//   { date: Date object, dayNumber: 1, day: 'Monday', ... },
//   { date: Date object, dayNumber: 2, day: 'Tuesday', ... },
//   ...
//   { date: Date object, dayNumber: 31, day: 'Wednesday', ... }
// ]