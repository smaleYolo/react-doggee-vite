import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useQuery, useQueryLazy } from '@utils/hooks';
import { api } from '@utils/api';
import { IDog } from '@utils/models';

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

  return (
    <div>
      <h1>Dogs List:</h1>
      {isLoading && <div>Loading...</div>}
      {isError && <div style={{ color: 'red' }}>Error: {isError}</div>}
      {dogs && (
        <ul>
          {dogs.map((dog) => (
            <li key={dog.id}>{dog.name} | {dog.breed}</li>
          ))}
        </ul>
      )}

      <h2>Fetch Dogs on Demand</h2>
      <button onClick={handleFetchDogs} disabled={isLazyLoading}>
        {isLazyLoading ? 'Fetching...' : 'Fetch Dogs'}
      </button>
      {isLazyLoading && <div>Loading...</div>}
      {isLazyError && <div style={{ color: 'red' }}>Error: {isLazyError}</div>}
      {lazyDogs && (
        <ul>
          {lazyDogs.map((dog) => (
            <li key={dog.id}>{dog.name} | {dog.breed}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
