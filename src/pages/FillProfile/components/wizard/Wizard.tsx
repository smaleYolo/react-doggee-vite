import React from 'react';
import styles from './Wizard.module.css';
import { useSteps, useAuth } from '@utils/contexts';
import { useIntl } from '@features/intl';

export const Wizard = () => {
  const { translateMessage } = useIntl()
  const { toggleStep, currentStepTitle, profileSteps } = useSteps();


  return (
    <div className={styles.container}>

      <div className={styles.steps}>
        {
          profileSteps.map((step) => (
            <div className={`
          ${styles.step}
          ${step.completed && styles.step_completed}
          ${step.step === currentStepTitle && styles.step_current}
          `}
                 key={step.step}
                 onClick={() => {toggleStep(step.step)}}
            >

              <div className={`
            ${styles.step_circle} 
            ${step.step === 'profile' && styles.step_circle_profile}
            ${step.completed && styles.step_circle_completed}
            ${step.step === currentStepTitle && styles.step_circle_current}
            `}
              >
                {step.step === 'user' && 1}
                {step.step === 'pets' && 2}
              </div>
              {translateMessage(step.title)}
            </div>
          ))
        }
      </div>

    </div>
  );
};
