import React from 'react';
import styles from '@pages/RegisterPage/RegisterPage.module.css';

import { useIntl } from '@features/intl';
import { useSteps } from '@utils/contexts';
import { PetsList, Wizard } from '@pages/FillProfile/components';
import { PetsInfo, Profile, UserInfo } from '@pages/FillProfile/steps';


export const FillProfile = () => {
  const { translateMessage } = useIntl();
  const { toggleStep, currentStepTitle } = useSteps()
  return (
    <div className={styles.page}>
      <div className={styles.container}>

        <section className={styles.section_left}>
          <div className={styles.section_header}>
            <h1 className={styles.section_header_title}>
              {translateMessage('page.registration.step.fillProfileData.title')}
            </h1>
            <Wizard />
          </div>
          {currentStepTitle === 'user' && (
            <UserInfo />
          )}

          {currentStepTitle === 'pets' && (
            <PetsInfo/>
          )}

          {currentStepTitle === 'profile' && (
            <Profile />
          )}
        </section>

        <section className={styles.section_right}>
          <div className={styles.section_right_header}>
            DOGGEE
          </div>

          {currentStepTitle === 'user' && (
            <div className={styles.section_right_content}>
              <b>{translateMessage('page.registration.step.fillProfileData.hint.registrationAddressHint')}</b>
            </div>
          )}

          {currentStepTitle === 'pets' && (
            <PetsList />
          )}

          {currentStepTitle === 'profile' && (
            <p className={styles.dont_worry}>
              {translateMessage("page.registration.step.checkDataStep.hint.dontWorry")}
            </p>
          )}

          <div className={styles.section_right_bottom}>

            {currentStepTitle === 'user' && (
              <span
                className={styles.section_right_sign_in}
                onClick={() => toggleStep('pets')}
              >
            {translateMessage('page.registration.skipAndFillInLater')}
          </span>
            )}

            {currentStepTitle === 'pets' && (
              <span
                className={styles.section_right_sign_in}
                onClick={() => toggleStep('profile')}
              >
            {translateMessage('page.registration.skipAndFillInLater')}
          </span>
            )}

          </div>
        </section>

      </div>
    </div>
  );
};
