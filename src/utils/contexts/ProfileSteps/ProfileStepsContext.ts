import { createContext, useContext } from 'react';

export type Steps = 'register' | 'user' | 'pets' | 'profile'

export interface ProfileStepsProps {
  currentStep: Steps;
  setCurrentStep?: (currentStep: Steps) => void;
  toggleStep: (currentStep: Steps) => void;
}

export const ProfileStepsContext = createContext<ProfileStepsProps | undefined>(undefined);

export const useProfileSteps = (): ProfileStepsProps => {
  const context = useContext(ProfileStepsContext);


  if (!context) {
    throw new Error('useProfileSteps must be used within a ProfileStepsProvider');
  }
  return context;
};