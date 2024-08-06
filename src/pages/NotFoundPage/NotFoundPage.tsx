import React from 'react';
import styles from './NotFoundPage.module.css';

export const NotFoundPage: React.FC = () => {

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.message}>Sorry, the page you are looking for does not exist.</p>
      <a href="/" className={styles.homeLink}>Go to Homepage</a>
    </div>
  );
};