import { createDate, createMonth } from '@features/calendar';

interface CreateYearParams {
  year?: number;
  locale?: string;
  monthNumber?: number;
}

// Создает объект с информацией о годе и его месяцах
export const createYear = (params?: CreateYearParams) => {
  const locale = params?.locale ?? 'default';
  const monthCount = 12;
  const today = createDate();
  const year = params?.year ?? today.year;
  const monthNumber = params?.monthNumber ?? today.monthNumber;
  const month = createMonth({ date: new Date(year, monthNumber - 1), locale });

  const getMonthDays = (monthIndex: number) =>
    createMonth({ date: new Date(year, monthIndex), locale }).createMonthDays();

  const createYearMonthes = () => {
    const monthes = [];
    for (let i = 0; i <= monthCount - 1; i += 1) {
      monthes[i] = getMonthDays(i);
    }
    return monthes;
  };

  return {
    createYearMonthes,
    month,
    year
  };
};

// Пример использования:
// const yearInfo = createYear({ year: 2024 });
// console.log(yearInfo.createYearMonthes());

// Пример вывода:
// [
//   [ ...Array of days for January ],
//   [ ...Array of days for February ],
//   ...
//   [ ...Array of days for December ]
// ]