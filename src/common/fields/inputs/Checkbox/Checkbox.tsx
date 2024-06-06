import styles from './Checkbox.module.css';

export const Checkbox = () => {
  return (
    <label htmlFor="checkbox" className={styles.checkbox_container}>
      <input id='checkbox' type="checkbox" className={styles.real_checkbox}/>
      <span className={styles.custom_checkbox}/>
      This is not my device
    </label>
  );
};
