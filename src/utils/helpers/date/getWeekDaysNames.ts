import { createDate } from '@utils/helpers';

export const getWeekDaysNames = (firstWeekDay: number = 1, locale: string = 'default') => {
  const weekDaysNames: {
    day: ReturnType<typeof createDate>['day'];
    dayShort: ReturnType<typeof createDate>['dayShort'];
  }[] = Array.from({ length: 7 });

  const date = new Date();

  for (let i = 0; i < 7; i++) {
    const { day, dayShort } = createDate({
      locale,
      date: new Date(date.setDate(date.getDate() - date.getDay() + i + firstWeekDay - 1))
    });

    weekDaysNames[i] = { day, dayShort };
  }

  return weekDaysNames;
};
