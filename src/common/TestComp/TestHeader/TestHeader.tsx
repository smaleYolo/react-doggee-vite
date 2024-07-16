import { useIntl } from '@features/intl';
import { useTheme } from '@features/theming';
import { useAuth } from '@utils/contexts';
import React from 'react';

import styles from './TestHeader.module.css';
import { useProfileSteps } from '@contexts/ProfileSteps';

export const TestHeader: React.FC = () => {
  const { isAuth, logout } = useAuth();
  const { setLanguage, translateMessage } = useIntl();
  const { theme, toggleTheme } = useTheme();

  const {currentStep, toggleStep} = useProfileSteps();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.languageButtons}>
          <button onClick={() => setLanguage('ru')}>Русский</button>
          <button onClick={() => setLanguage('en')}>English</button>
        </div>
        <div className={styles.languageButtons}>
          <button onClick={() => toggleStep(currentStep)}>Step toggle</button>
        </div>
        {
          isAuth &&
          (
            <div className={styles.logoutButton}>
              <button onClick={logout}>
                {translateMessage('button.signOut')}
              </button>
            </div>
          )
        }
        <button
          aria-label="Toggle theme"
          onClick={toggleTheme}>
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </button>
      </div>
    </header>
  );
};
