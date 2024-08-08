import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react';
import { DateContext, useSteps, useAuth, ISelectedDate, ISelectedMonth } from '@utils/contexts';
import { createDate } from '@helpers/*';

export interface IUseCalendar {
  selectedDate: {
    user_birthdate: ReturnType<typeof createDate> | null;
    dog_birthdate: ReturnType<typeof createDate> | null;
  };
  initiateSelectedDate: () => { user_birthdate: ReturnType<typeof createDate> | null, dog_birthdate: ReturnType<typeof createDate> | null };
  setSelectedDate: Dispatch<SetStateAction<ISelectedDate>>;
  toggleSelectedDate: (
    date: ReturnType<typeof createDate> | null,
    field: keyof ISelectedDate
  ) => void;
  parseDateString: (dateString: string) => ReturnType<typeof createDate> | null;
  selectedMonth: { monthShort: string; monthIndex: number; year: number } | null;
  setSelectedMonth: (month: { monthShort: string; monthIndex: number; year: number } | null) => void;
}


export const DateProvider = ({ children }: { children: ReactNode; }) => {
  const { userId, logout } = useAuth();
  const { profileSteps } = useSteps()

  const parseDateString = (dateString: string) => {
    if (!dateString) {
      return null;
    }
    const [day, month, year] = dateString.split('.').map(Number);
    return createDate({ date: new Date(year, month - 1, day) });
  };

  const initiateSelectedDate = () => {
    const userStepBD = profileSteps.find(step => step.step === 'user')?.step_data?.birthdate || '';
    const petStepBD = profileSteps.find(step => step.step === 'pets')?.step_data?.birthdate || '';

    return { user_birthdate: parseDateString(userStepBD), dog_birthdate: parseDateString(petStepBD) };
  };

  const [selectedDate, setSelectedDate] = useState<ISelectedDate>(() => initiateSelectedDate());
  const [selectedMonth, setSelectedMonth] = useState<ISelectedMonth>(null);

  const toggleSelectedDate = (date: ReturnType<typeof createDate> | null, field: keyof ISelectedDate) => {
    setSelectedDate((prevSelectedDate) => (
      { ...prevSelectedDate, [field]: date }
    ));
  };

  useEffect(() => {
    if (userId) {
      setSelectedDate(() => initiateSelectedDate());
    }
  }, [userId, profileSteps]);


  useEffect(() => {
    setSelectedDate({ user_birthdate: null, dog_birthdate: null });
    setSelectedMonth(null);
  }, [logout]);

  const value: IUseCalendar = {
    selectedDate,
    initiateSelectedDate,
    toggleSelectedDate,
    setSelectedDate,
    selectedMonth,
    setSelectedMonth,
    parseDateString,
  };

  return (
    <DateContext.Provider value={value}>
      {children}
    </DateContext.Provider>
  );
};
