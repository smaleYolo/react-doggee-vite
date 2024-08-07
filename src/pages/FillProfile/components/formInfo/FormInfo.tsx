import React from 'react';
import styles from './FormInfo.module.css';
import { PenSvg } from '@utils/svg';
import { useIntl } from '@features/intl';
import { IUser } from '@utils/models';
import { useCalendar, useSteps } from '@utils/contexts';
import { formatDate } from '@helpers/*';

export const FormInfo = ({ name, city, birthdate, dogs }: IUser) => {
  const { translateMessage } = useIntl();
  const { getFullYears } = useCalendar();
  const { toggleStep } = useSteps();

  return (
    <>
      {name && city && birthdate ? (
        <div className={styles.container}>
          <div className={styles.form_header}>
            <h2>{translateMessage('page.registration.step.checkDataStep.card.profile')}</h2>
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
      ) : (
        <div className={styles.placeholderContainer}>
          <p
            className={styles.placeholderText}
            onClick={() => toggleStep('user')}
          >
            {translateMessage('no.user.data')}
          </p>
        </div>
      )}

      {dogs && dogs.length ? (
        <div className={styles.container}>
          <div className={styles.form_header}>
            <h2>{translateMessage('page.registration.step.checkDataStep.card.pets')}</h2>
            <PenSvg className={styles.penSvg} onClick={() => toggleStep('pets')} />
          </div>

          <div className={styles.scrollContainer}>
            {dogs.map(dog => (
              <div className={styles.form_content} key={dog.id}>
                <div className={styles.form_content_field}>
                  <span>{dog.name}</span>
                  <p>{`${dog.name} - ${translateMessage(dog.breed)}, ${getFullYears(dog?.birthdate)} ${translateMessage("y.o")}, ${dog.weight} ${translateMessage("kg")}`}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className={styles.placeholderContainer}>
          <p
            className={styles.placeholderText}
            onClick={() => toggleStep('pets')}
          >
            {translateMessage('no.dogs.data')}
          </p>
        </div>
      )}
    </>
  );
};