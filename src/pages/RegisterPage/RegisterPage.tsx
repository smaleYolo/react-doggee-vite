import React from 'react';
import { FillLoginDataStep } from '@pages/RegisterPage/wizard/steps/FillLoginDataStep/FillLoginDataStep.tsx';
import { FillProfileDataStep } from '@pages/RegisterPage/wizard/steps';
import { useProfileSteps } from '@contexts/ProfileSteps';

export const RegisterPage = () => {
  const {currentStep} = useProfileSteps()

  return (
    <>
      {currentStep === 'register' && (<FillLoginDataStep />)}
      {currentStep === 'user' && (<FillProfileDataStep />)}
    </>
  );
};
