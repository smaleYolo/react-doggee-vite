
// Проверяет, является ли дата сегодняшним днем
import { checkDateIsEqual } from '@features/calendar';

export const checkIsToday = (date: Date) => {
  const today = new Date();
  return checkDateIsEqual(today, date);
};


// Пример использования:
// const date = new Date(); // Сегодняшняя дата
// console.log(checkIsToday(date)); // true