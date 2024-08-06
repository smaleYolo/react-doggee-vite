import React from 'react';
import styles from './Exit.module.css';
import { useAuth } from '@utils/contexts';
import { useIntl } from '@features/intl';

export const Exit = () => {
  const { isAuth, logout } = useAuth();
  const { translateMessage } = useIntl();

  return (
    <div className={styles.container}>
      {
        isAuth &&
        (
          <a href="/" className={styles.btn} onClick={logout}>{translateMessage('button.signOut')}</a>
        )
      }
    </div>
  )
    ;
};
