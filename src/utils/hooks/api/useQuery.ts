import React, { useState, useEffect } from 'react';

interface Options<T, K> {
  request: () => Promise<K>;
  initialValue: T;
  dependencies?: React.DependencyList;
}

export const useQuery = <T, K>({ request, initialValue, dependencies = [] }: Options<T, K>) => {
  const [data, setData] = useState<T | K>(initialValue);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await request();
        if (isMounted) {
          setData(response);
        }
      } catch (error) {
        if (isMounted) {
          setIsError((error as Error).message);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, dependencies);

  return { data, isLoading, isError };
};
