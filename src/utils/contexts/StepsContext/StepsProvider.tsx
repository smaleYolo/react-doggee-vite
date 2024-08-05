import React, {  ReactNode, useEffect, useState } from 'react';
import { PetInfoValues, StepsContext, UserInfoValues, useAuth, useDogs } from '@utils/contexts';


export type Steps = 'user' | 'pets' | 'profile';

export interface IStep {
  step: Steps;
  title: string;
  completed: boolean;
  current: boolean;
  step_data?: UserInfoValues | PetInfoValues;
}

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
  const { userId, logout } = useAuth();
  const { dogs, setSelectedDog } = useDogs();

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
    const steps = localStorage.getItem(`profileSteps_${userId}`);

    return steps ? JSON.parse(steps) : initialStateSteps;
  }


  useEffect(() => {
    if (userId) {
      const newProfileSteps = initiateProfileSteps();
      setProfileSteps(newProfileSteps);
    }
  }, [userId]);

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

  //Обновление currentStep
  useEffect(() => {
    const currentStep = profileSteps.find((step) => step.current)?.step ?? 'user';

    if (currentStep !== currentStepTitle) {
      setCurrentStepTitle(currentStep);
      setSelectedDog(undefined)
    }
  }, [profileSteps, currentStepTitle]);

  useEffect(() => {
    if (dogs && !dogs.length) {
      unCompleteStep('pets')
      unCompleteStep('profile')
    } else {
      completeStep('pets')
      completeStep('profile')
    }
  }, [dogs]);



  // useEffect(() => {
  //   setProfileSteps((prevState) => {
  //     const updatedSteps = prevState.map((s) =>
  //       s.step === 'user' ? { ...s, step_data: { name: '', city: '', birthdate: '' } } : s
  //       s.step === 'pets' ? { ...s, step_data: { name: '', breed: '', birthdate: '', weight: '' } } : s
  //     );
  //     return updatedSteps;
  //   });
  // }, [logout]);


  const value: IStepsContext = {
    currentStepTitle,
    toggleStep,
    profileSteps,
    setProfileSteps,
    completeStep,
    unCompleteStep,
    updateStepData
  };


  return (
    <StepsContext.Provider
      value={value}
    >
      {children}
    </StepsContext.Provider>
  );
};