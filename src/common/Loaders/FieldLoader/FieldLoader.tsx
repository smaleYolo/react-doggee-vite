import React from 'react';
import styles from './FieldLoader.module.css';

export const FieldLoader: React.FC = () => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.spinner}></div>
    </div>
  );
};