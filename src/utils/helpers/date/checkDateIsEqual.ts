// Проверяет, равны ли две даты
export const checkDateIsEqual = (date1: Date, date2: Date) =>
  date1.getDate() === date2.getDate() &&
  date1.getMonth() === date2.getMonth() &&
  date1.getFullYear() === date2.getFullYear();

// Пример использования:
// const date1 = new Date(2024, 6, 11); // 11 июля 2024
// const date2 = new Date(2024, 6, 11); // 11 июля 2024
// console.log(checkDateIsEqual(date1, date2)); // true