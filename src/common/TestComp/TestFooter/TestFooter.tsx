import React from 'react';

import styles from './TestFooter.module.css'
import { useUser } from '@utils/contexts';

export const TestFooter: React.FC = () => {
  const { isAuth } = useUser();
  const { toggleStep } = useUser();


  return (
    <footer className={styles.header}>
      <div className={styles.container}>

        {
          isAuth &&
          (
            <div className={styles.languageButtons}>
              <button onClick={() => toggleStep('user')}>user step</button>
              <button onClick={() => toggleStep('pets')}>pets step</button>
              <button onClick={() => toggleStep('profile')}>profile step</button>
            </div>
          )
        }
      </div>
    </footer>
  );
};
