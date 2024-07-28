import React from 'react';
import styles from './FormInfo.module.css';
import { PenSvg } from '@utils/svg';
import { useIntl } from '@features/intl';
import { IUser } from '@utils/models';
import { useCalendar, useDate, useUser } from '@utils/contexts';
import { formatDate } from '@helpers/*';

export const FormInfo = ({ name, city, birthdate, dogs }: IUser) => {
  const { translateMessage } = useIntl();
  const { getFullYears } = useCalendar();
  const { toggleStep } = useUser()

  return (
    <>
      <div className={styles.container}>
        <div className={styles.form_header}>
          <h2>
            {translateMessage('page.registration.step.checkDataStep.card.profile')}
          </h2>
          <PenSvg className={styles.penSvg} onClick={() => toggleStep('user')} />
        </div>

        <div className={styles.form_content}>
          <div className={styles.form_content_field}>
            <span>{translateMessage('field.input.userName.label')}</span>
            <p>{name}</p>
          </div>

          <div className={styles.form_content_field}>
            <span>{translateMessage('field.input.userLocation.label')}</span>
            <p>{city}</p>
          </div>

          <div className={styles.form_content_field}>
            <span>{translateMessage('field.input.userBirthday.label')}</span>
            <p>{formatDate(new Date(birthdate), 'DD-MM-YYYY')}</p>
          </div>
        </div>
      </div>

      {dogs && dogs.length ? (
        <div className={styles.container}>
          <div className={styles.form_header}>
            <h2>
              {translateMessage('page.registration.step.checkDataStep.card.pets')}
            </h2>
            <PenSvg className={styles.penSvg} onClick={() => toggleStep('pets')} />
          </div>

          <div className={styles.scrollContainer}>
            {dogs.map(dog => (
              <div className={styles.form_content} key={dog.id}>
                <div className={styles.form_content_field}>
                  <span>{dog.name}</span>
                  <p>{`${dog.name} - ${dog.breed}, ${getFullYears(dog?.birthdate)} y.o., ${dog.weight} kg`}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
};
