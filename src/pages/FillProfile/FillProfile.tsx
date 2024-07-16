import React from 'react';
import styles from '@pages/RegisterPage/RegisterPage.module.css';
import { useUser } from '@contexts/UserContext';
import { UserInfo } from '@pages/FillProfile/steps/UserInfo.tsx';

export interface ProfileFormDataValues {
  name: string;
  city: string;
  birthday: string | number | readonly string[] | undefined;
}

export const FillProfile = () => {
  const { currentStep, toggleStep } = useUser();

  return (
    <div className={styles.page}>

      <div className={styles.container}>

        {currentStep === 'user' && (
          <UserInfo />
        )}

        {currentStep === 'pets' && (
          <h1>Pets step</h1>
        )}

        {currentStep === 'profile' && (
          <h1>Profile step</h1>
        )}

      </div>
    </div>
  );
};
