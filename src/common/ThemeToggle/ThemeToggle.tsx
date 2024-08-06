import React from 'react';
import { useTheme } from '@features/theming';
import DarkSvg from 'src/static/images/icons/dark.svg';
import DarkSvg2 from 'src/static/images/icons/dark_2.svg';
import LightSvg from 'src/static/images/icons/light.svg';
import LightSvg2 from 'src/static/images/icons/light_2.svg';

import styles from './ToggleTheme.module.css';

export const ThemeToggle = () => {
  const { toggleTheme, theme } = useTheme();

  return (
    <div
      className={styles.container}
      onClick={toggleTheme}>
      <img
        alt="dark"
        className={`${styles.img} ${theme === 'dark' ? styles.show : styles.hide}`}
        src={LightSvg}
      />
      <img
        alt="light"
        className={`${styles.img} ${theme === 'light' ? styles.show : styles.hide}`}
        src={DarkSvg}
      />
    </div>
  );
};
