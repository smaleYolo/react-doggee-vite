import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useQuery, useQueryLazy } from '@utils/hooks';
import { api } from '@utils/api';
import { IDog } from '@utils/models';
import { useIntl } from '@features/intl/hooks';
import { IntlText } from '@features/intl/components/IntlText';

export const TestPage = () => {
  const userId = Cookies.get("userId");

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
    <div>
      <h1><IntlText path='page.test.dogsListTitle' /></h1>
      {isLoading && <div><IntlText path='loading' /></div>}
      {isError && <div style={{ color: 'red' }}><IntlText path='error' values={{ error: isError.toString() }} /></div>}
      {dogs && (
        <ul>
          {dogs.map((dog) => (
            <li key={dog.id}>{dog.name} | {dog.breed}</li>
          ))}
        </ul>
      )}

      <h2><IntlText path='page.test.fetchDogsOnDemand' /></h2>
      <button onClick={handleFetchDogs} disabled={isLazyLoading}>
        {isLazyLoading ? translateMessage('fetching') : translateMessage('fetchDogs')}
      </button>
      {isLazyLoading && <div><IntlText path='loading' /></div>}
      {isLazyError && <div style={{ color: 'red' }}><IntlText path='error' values={{ error: isLazyError.toString() }} /></div>}
      {lazyDogs && (
        <ul>
          {lazyDogs.map((dog) => (
            <li key={dog.id}>{dog.name} | {dog.breed}</li>
          ))}
        </ul>
      )}

      <div>
        <h2><IntlText path='intlTest.title' /></h2>
        <p>
          <IntlText path='intlTest.dynamicMessage' values={{ seconds: 5, item: translateMessage('intlTest.ball') }}>
            {(txt) => <span>{txt}</span>}
          </IntlText>
        </p>
      </div>
    </div>
  );
};
