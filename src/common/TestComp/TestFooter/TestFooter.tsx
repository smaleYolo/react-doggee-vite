import React from 'react';

import styles from './TestFooter.module.css';
import { useUser } from '@utils/contexts';
import Cookies from 'js-cookie';

export const TestFooter: React.FC = () => {
  const { isAuth } = useUser();
  const { toggleStep } = useUser();


  const clearAllCookiesAndLocalStorage = () => {
    const allCookies = Cookies.get();
    for (const cookie in allCookies) {
      Cookies.remove(cookie);
    }

    localStorage.clear();
  };

  const handleClearDataClick = () => {
    clearAllCookiesAndLocalStorage();
    console.log('Все куки и локальный сторидж очищены');
  };


  return (
    <footer className={styles.header}>
      <div className={styles.container}>

        <div className={styles.languageButtons}>
          <button onClick={handleClearDataClick}>Clean up</button>
        </div>

      </div>
    </footer>
  );
};
