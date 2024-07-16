
// Получает названия месяцев
import { createDate } from '@features/calendar';

export const getMonthesNames = (locale: string = 'default') => {
  const monthesNames: {
    month: ReturnType<typeof createDate>['month'];
    monthShort: ReturnType<typeof createDate>['monthShort'];
    monthIndex: ReturnType<typeof createDate>['monthIndex'];
    date: ReturnType<typeof createDate>['date'];
  }[] = Array.from({ length: 12 });

  const d = new Date();

  monthesNames.forEach((_, i) => {
    const { month, monthIndex, monthShort, date } = createDate({
      locale,
      date: new Date(d.getFullYear(), d.getMonth() + i, 1)
    });

    monthesNames[monthIndex] = { month, monthIndex, monthShort, date };
  });

  return monthesNames;
};

// Пример использования:
// const monthes = getMonthesNames('en-US');
// console.log(monthes);
// Пример вывода:
// [
//   { month: 'January', monthShort: 'Jan', monthIndex: 0, date: Date object },
//   { month: 'February', monthShort: 'Feb', monthIndex: 1, date: Date object },
//   ...
//   { month: 'December', monthShort: 'Dec', monthIndex: 11, date: Date object }
// ]