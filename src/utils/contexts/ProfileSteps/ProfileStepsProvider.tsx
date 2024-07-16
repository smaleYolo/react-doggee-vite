import { ReactNode, useState } from 'react';
import React from 'react';
import { ProfileStepsContext, ProfileStepsProps, Steps } from '@contexts/ProfileSteps/ProfileStepsContext.ts';

export const ProfileStepsProvider = ({ children }: { children: ReactNode }) => {
  const [currentStep, setCurrentStep] = useState<Steps>('register');

  const toggleStep = (currentStep: Steps) => {
    if (currentStep === 'register') {
      setCurrentStep('user');
    }

    if (currentStep === 'user') {
      setCurrentStep('register');
    }
  }


  const value: ProfileStepsProps = {
    toggleStep,
    currentStep
  }


  return (
    <ProfileStepsContext.Provider value={value}>
      {children}
    </ProfileStepsContext.Provider>
  );
};
