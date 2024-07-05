import React from 'react';

import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ children, isLoading,  ...props }) => {
  return <button className={styles.button} disabled={isLoading}>
    {!isLoading && children}
    {isLoading && <div className={styles['dot-flashing']} />}
  </button>;
};
