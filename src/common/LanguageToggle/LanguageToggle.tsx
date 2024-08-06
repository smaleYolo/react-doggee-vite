import React, { useEffect } from 'react';

import RuSvg from 'src/static/images/icons/ru.svg';
import EnSvg from 'src/static/images/icons/en.svg';

import styles from './LanguageToggle.module.css';
import { useIntl } from '@features/intl';

export const LanguageToggle = () => {
  const { setLanguage, locale } = useIntl();

  // Принудительное обновление компонента для изменения локали
  useEffect(() => {

  }, [locale]);

  return (
    <div
      className={styles.container}
    >
      <img
        alt="dark"
        className={`${styles.img} ${locale === 'ru' ? styles.show : styles.hide}`}
        src={RuSvg}
        onClick={() => setLanguage('en')}
      />
      <img
        alt="light"
        className={`${styles.img} ${locale === 'en' ? styles.show : styles.hide}`}
        src={EnSvg}
        onClick={() => setLanguage('ru')}
      />
    </div>
  );
};
