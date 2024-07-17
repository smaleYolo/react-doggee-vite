import React from 'react';
import styles from '@pages/RegisterPage/RegisterPage.module.css';
import { Wizard } from '@pages/FillProfile/wizard/Wizard.tsx';
import { UserInfo } from '@pages/FillProfile/steps/UserInfo.tsx';
import { useIntl } from '@features/intl';
import { useUser } from '@utils/contexts';



export const FillProfile = () => {
  const {translateMessage} = useIntl()
  const {currentStep, toggleStep} = useUser()

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <section className={styles.section_left}>
          <div className={styles.section_header}>
            <h1 className={styles.section_header_title}>
              {translateMessage('page.registration.step.fillProfileData.title')}
            </h1>
            <Wizard/>
          </div>
          {currentStep === 'user' && (
            <>
              <UserInfo />
            </>
          )}

          {currentStep === 'pets' && (
            <h1>Pets step</h1>
          )}

          {currentStep === 'profile' && (
            <h1>Profile step</h1>
          )}
        </section>

        <section className={styles.section_right}>
          <div className={styles.section_right_header}>
            DOGGEE
          </div>

          {currentStep === 'user' && (
            <div className={styles.section_right_content}>
              <b>{translateMessage('page.registration.step.fillProfileData.hint.registrationAddressHint')}</b>
            </div>
          )}

          {currentStep === 'pets' && (
            <h1>Pets step</h1>
          )}

          {currentStep === 'profile' && (
            <h1>Profile step</h1>
          )}

          <div className={styles.section_right_bottom}>

            {currentStep === 'user' && (
              <span
                className={styles.section_right_sign_in}
                onClick={() => toggleStep('pets')}
              >
            {translateMessage('page.registration.skipAndFillInLater')}
          </span>
            )}

            {currentStep === 'pets' && (
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