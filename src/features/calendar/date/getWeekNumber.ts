export const getWeekNumber = (date: Date) => {
  const firstDayOfTheYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date.getTime() - firstDayOfTheYear.getTime()) / 86400000;

  return Math.ceil((pastDaysOfYear + firstDayOfTheYear.getDay() + 1) / 7);
};

// Пример использования:
// const weekNumber = getWeekNumber(new Date(2024, 6, 11));
// console.log(weekNumber); // 28
// Пример вывода: 28