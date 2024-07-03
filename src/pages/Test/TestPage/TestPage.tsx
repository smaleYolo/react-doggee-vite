import { useIntl } from '@features/intl';
import { IntlText } from '@features/intl/components';
import { api } from '@utils/api';
import { useQuery, useQueryLazy } from '@utils/hooks';
import type { IDog } from '@utils/models';
import Cookies from 'js-cookie';
import React, { useState } from 'react';

import styles from './TestPage.module.css';

export const TestPage: React.FC = () => {
  const userId = Cookies.get('userId');

  const { data: dogs, isLoading, isError } = useQuery<IDog[], IDog[]>({
    request: () => api.get<IDog[]>(`/users/${userId}/dogs`),
    initialValue: [],
    dependencies: [userId]
  });

  const { query: fetchDogs, isLoading: isLazyLoading, isError: isLazyError } = useQueryLazy<IDog[]>({
    request: () => api.get<IDog[]>(`/users/${userId}/dogs`),
    dependencies: [userId]
  });

  const [lazyDogs, setLazyDogs] = useState<IDog[] | null>(null);

  const handleFetchDogs = async () => {
    const data = await fetchDogs();
    if (data) {
      setLazyDogs(data);
    }
  };

  const { translateMessage } = useIntl();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}><IntlText path="page.test.dogsListTitle" /></h1>
      {isLoading && <div className={styles.loading}><IntlText path="loading" /></div>}
      {isError && <div className={styles.error}><IntlText
        path="error"
        values={{ error: isError.toString() }} /></div>}
      {dogs && (
        <ul className={styles.dogList}>
          {dogs.map((dog) => (
            <li
              key={dog.id}
              className={styles.dogItem}>
              <div className={styles.dogDetails}>
                <h3>{dog.name}</h3>
                <p>{dog.breed}</p>
              </div>
            </li>
          ))}
        </ul>
      )}

      <h2 className={styles.subtitle}><IntlText path="page.test.fetchDogsOnDemand" /></h2>
      <button
        className={styles.button}
        disabled={isLazyLoading}
        onClick={handleFetchDogs}>
        {isLazyLoading ? translateMessage('fetching') : translateMessage('fetchDogs')}
      </button>
      {isLazyLoading && <div className={styles.loading}><IntlText path="loading" /></div>}
      {isLazyError && <div className={styles.error}><IntlText
        path="error"
        values={{ error: isLazyError.toString() }} /></div>}
      {lazyDogs && (
        <ul className={styles.lazyDogList}>
          {lazyDogs.map((dog) => (
            <li
              key={dog.id}
              className={styles.dogItem}
            >
              <div className={styles.dogDetails}>
                <h3>{dog.name}</h3>
                <p>{dog.breed}</p>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div>
        <h2 className={styles.subtitle}><IntlText path="intlTest.title" /></h2>
        <p className={styles.intlTest}>
          <IntlText
            path="intlTest.dynamicMessage"
            values={{ seconds: 5, item: translateMessage('intlTest.ball') }}>
            {(txt) => <span>{txt}</span>}
          </IntlText>
        </p>
      </div>
    </div>
  );
};
