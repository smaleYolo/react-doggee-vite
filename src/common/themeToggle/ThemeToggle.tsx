import React from 'react';
import { useTheme } from '@features/theming';

import DarkSvg from 'src/static/images/icons/dark.svg';
import LightSvg from 'src/static/images/icons/light.svg';

import styles from './ToggleTheme.module.css'

export const ThemeToggle = () => {
  const { toggleTheme, theme } = useTheme();

  return (
    <div className={styles.container} onClick={toggleTheme}>
      <img
        className={`${styles.img} ${theme === 'dark' ? styles.show : styles.hide}`}
        src={DarkSvg}
        alt="dark"
      />
      <img
        className={`${styles.img} ${theme === 'light' ? styles.show : styles.hide}`}
        src={LightSvg}
        alt="light"
      />
    </div>
  );
};
