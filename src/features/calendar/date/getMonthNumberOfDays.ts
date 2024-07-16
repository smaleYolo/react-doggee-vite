export const getMonthNumberOfDays = (
  monthIndex: number,
  yearNumber: number = new Date().getFullYear()
) => new Date(yearNumber, monthIndex + 1, 0).getDate();

// Пример использования:
// const daysInMonth = getMonthNumberOfDays(6, 2024);
// console.log(daysInMonth); // 31
// Пример вывода: 31