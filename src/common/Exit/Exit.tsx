import React from 'react';
import styles from './Exit.module.css';

import { useAuth } from '@utils/contexts';
import { useIntl } from '@features/intl';
import { Link } from 'react-router-dom';

export const Exit = () => {
  const { isAuth, logout } = useAuth();
  const { translateMessage } = useIntl();


  return (
    <div className={styles.container}>
      {
        isAuth &&
        (
          <Link to={'/'} className={styles.btn} onClick={logout}>{translateMessage('button.signOut')}</Link>
        )
      }
    </div>
  )
    ;
};
