import React from 'react';

import styles from './TestFooter.module.css';
import Cookies from 'js-cookie';

export const TestFooter: React.FC = () => {

  const clearAllCookiesAndLocalStorage = () => {
    const allCookies = Cookies.get();
    for (const cookie in allCookies) {
      Cookies.remove(cookie);
    }

    localStorage.clear();
  };

  const handleClearDataClick = () => {
    clearAllCookiesAndLocalStorage();
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
