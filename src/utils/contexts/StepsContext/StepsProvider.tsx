import React, {  ReactNode, useEffect, useState } from 'react';
import { PetInfoValues, StepsContext, UserInfoValues, useAuth, useDogs, Steps, IStep } from '@utils/contexts';

export interface IStepsContext {
  currentStepTitle: string;
  toggleStep: (step: Steps) => void;
  profileSteps: IStep[];
  setProfileSteps: (steps: IStep[]) => void;
  completeStep: (step: Steps) => void;
  unCompleteStep: (step: Steps) => void;
  updateStepData: (newStepData: UserInfoValues | PetInfoValues, step: Steps) => void;
}

export const StepsProvider = ({ children }: { children: ReactNode }) => {
  const { userId } = useAuth();
  const { setSelectedDog, dogs } = useDogs();

  const initialStateSteps: IStep[] = [
    {
      step: 'user',
      title: 'step.title.user',
      completed: false,
      current: true,
      step_data: {
        name: '',
        city: '',
        birthdate: ''
      }
    },
    {
      step: 'pets',
      title: 'step.title.pets',
      completed: false,
      current: false,
      step_data: {
        name: '',
        breed: '',
        birthdate: '',
        weight: ''
      }
    },
    { step: 'profile', title: 'step.title.profile', completed: false, current: false }
  ];

  const [profileSteps, setProfileSteps] = useState<IStep[]>(initialStateSteps);
  const [currentStepTitle, setCurrentStepTitle] = useState<Steps>('user');

  const initiateProfileSteps = () => {
    const localSteps = localStorage.getItem(`profileSteps_${userId}`);

    return localSteps ? JSON.parse(localSteps) : initialStateSteps;
  }

  const completeStep = (step: Steps) => {
    setProfileSteps((prevState) => {
      const updatedSteps = prevState.map((s) =>
        s.step === step ? { ...s, completed: true } : s
      );
      if (userId) localStorage.setItem(`profileSteps_${userId}`, JSON.stringify(updatedSteps));
      return updatedSteps;
    });
  };

  const unCompleteStep = (step: Steps) => {
    setProfileSteps((prevState) => {
      const updatedSteps = prevState.map((s) =>
        s.step === step ? { ...s, completed: false } : s
      );
      if (userId) localStorage.setItem(`profileSteps_${userId}`, JSON.stringify(updatedSteps));
      return updatedSteps;
    });
  };

  const toggleStep = (step: Steps) => {
    setProfileSteps((prevState) => {
      const updatedSteps = prevState.map((s) =>
        s.step === step ? { ...s, current: true } : { ...s, current: false }
      );
      if (userId) localStorage.setItem(`profileSteps_${userId}`, JSON.stringify(updatedSteps));
      return updatedSteps;
    });
  };

  const updateStepData = (newStepData: UserInfoValues | PetInfoValues, step: Steps) => {
    const updatedProfileSteps = profileSteps.map((s) => (s.step === step ? { ...s, step_data: newStepData } : s));
    setProfileSteps(updatedProfileSteps);

    if (userId) localStorage.setItem(`profileSteps_${userId}`, JSON.stringify(updatedProfileSteps));
  };

  //При смене userId делаем инициализацию новых данных о шагах
  useEffect( () => {
    if (userId) {
      const newProfileSteps = initiateProfileSteps();
      setProfileSteps(newProfileSteps);
    }
  }, [userId]);

  //Обновление currentStep
  useEffect(() => {
    const currentStep = profileSteps.find((step) => step.current)?.step ?? 'user';

    if (currentStep !== currentStepTitle) {
      setCurrentStepTitle(currentStep);
      setSelectedDog(undefined)
    }
  }, [profileSteps, currentStepTitle]);

  const value: IStepsContext = {
    currentStepTitle,
    toggleStep,
    profileSteps,
    setProfileSteps,
    completeStep,
    unCompleteStep,
    updateStepData,
  };


  return (
    <StepsContext.Provider
      value={value}
    >
      {children}
    </StepsContext.Provider>
  );
};