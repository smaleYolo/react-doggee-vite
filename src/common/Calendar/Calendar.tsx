import React, { useEffect, useRef } from 'react';
import styles from './Calendar.module.css';
import { checkIsToday, useDate } from '@features/calendar';

export const Calendar: React.FC = () => {
  const {
    isCalendar,
    handleMonth,
    monthName,
    weekDays,
    year,
    days,
    currentDate,
    selectedDay,
    setSelectedDay,
    setIsCalendar,
    calendarType,
    setCalendarType,
    setCurrentDate,
    monthNames,
    selectedMonth,
    setSelectedMonth,
    years,
    handleDecade,
    handleYear
  } = useDate();

  const handleYearClick = (year: string) => {
    setCurrentDate(new Date(parseInt(year, 10), currentDate.getMonth(), currentDate.getDate()));
    setCalendarType('months');
  };

  const calendarRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
      setIsCalendar(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={`${styles.container} ${isCalendar ? styles.visible : ''}`} ref={calendarRef}>
      {calendarType === 'basic' && (
        <>
          <div className={styles.header}>
            <img
              className={styles.arrowBtn}
              src="src/static/images/arrow_additional.svg"
              alt="arrow_minus"
              onClick={() => handleMonth('prev')}
            />
            <span className={styles.header_title}>
              <div onClick={() => setCalendarType('months')}>
                <span>{monthName} </span>
                <span>{year}</span>
              </div>
            </span>
            <img
              className={styles.arrowBtn}
              src="src/static/images/arrow_additional.svg"
              alt="arrow_plus"
              onClick={() => handleMonth('next')}
            />
          </div>
          <div className={styles.body}>
            <div className={styles.daysOfTheWeek}>
              {weekDays.map((weekDay) => (
                <span key={weekDay.day} className={styles.dayOfWeek}>
                  {weekDay.dayShort}
                </span>
              ))}
            </div>
            <div className={styles.days}>
              {days.map((day, i) => (
                <span
                  key={i}
                  className={`
                    ${styles.day}
                    ${day.monthIndex !== currentDate.getMonth() ? styles.otherMonthDay : ''}
                    ${checkIsToday(day.date) ? styles.today : ''}
                    ${day.dayNumber === selectedDay?.dayNumber && day.monthIndex === selectedDay?.monthIndex && day.year === selectedDay?.year ? styles.selected : ''}
                  `}
                  onClick={() => {
                    setSelectedDay(day);
                    setIsCalendar(false);
                  }}
                >
                  {day.dayNumber}
                </span>
              ))}
            </div>
          </div>
        </>
      )}
      {calendarType === 'months' && (
        <>
          <div className={styles.header}>
            <img
              className={styles.arrowBtn}
              src="src/static/images/arrow_additional.svg"
              alt="arrow_minus"
              onClick={() => handleYear('prev')}
            />
            <span className={styles.header_title}>
              <span onClick={() => setCalendarType('years')}>{year}</span>
            </span>
            <img
              className={styles.arrowBtn}
              src="src/static/images/arrow_additional.svg"
              alt="arrow_plus"
              onClick={() => handleYear('next')}
            />
          </div>
          <div className={styles.body}>
            <div className={styles.months}>
              {monthNames!.map((month, i) => (
                <span
                  key={i}
                  className={`
                    ${styles.month}
                    ${(month.monthShort === selectedMonth?.monthShort && selectedMonth?.year === currentDate.getFullYear()) ? styles.selected : ''}
                    ${(month.year === new Date().getFullYear()) && month.monthIndex === new Date().getMonth() ? styles.today : ''}
                  `}
                  onClick={() => {
                    setSelectedMonth({ ...month, year: currentDate.getFullYear() });
                    setCurrentDate(new Date(currentDate.getFullYear(), month.monthIndex, 1));
                    setCalendarType('basic');
                  }}
                >
                  {month.monthShort}
                </span>
              ))}
            </div>
          </div>
        </>
      )}
      {calendarType === 'years' && (
        <>
          <div className={styles.header}>
            <img
              className={styles.arrowBtn}
              src="src/static/images/arrow_additional.svg"
              alt="arrow_minus"
              onClick={() => handleDecade('prev')}
            />
            <span className={styles.header_title}>
              <span>{`${years[0]} - ${years[years.length - 1]}`}</span>
            </span>
            <img
              className={styles.arrowBtn}
              src="src/static/images/arrow_additional.svg"
              alt="arrow_plus"
              onClick={() => handleDecade('next')}
            />
          </div>
          <div className={styles.body}>
            <div className={styles.years}>
              {years.map((year, i) => (
                <span
                  key={i}
                  className={`
                    ${styles.year}
                    ${year === String(currentDate.getFullYear()) ? styles.selected : ''}
                  `}
                  onClick={() => handleYearClick(year)}
                >
                  {year}
                </span>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};