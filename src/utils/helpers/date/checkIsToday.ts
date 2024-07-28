
// Проверяет, является ли дата сегодняшним днем

import { checkDateIsEqual } from '@utils/helpers';

export const checkIsToday = (date: Date) => {
  const today = new Date();
  return checkDateIsEqual(today, date);
};


// Пример использования:
// const date = new Date(); // Сегодняшняя дата
// console.log(checkIsToday(date)); // true