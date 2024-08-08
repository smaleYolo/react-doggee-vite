import React, { useState } from 'react';

interface Options<T> {
  request: () => Promise<T>;
  dependencies?: React.DependencyList;
}

export const useQueryLazy = <T>({ request, dependencies = [] }: Options<T>) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<string | null>(null);

  const query = async () => {
    try {
      setIsLoading(true);
      setIsError('');
      const response = await request();
      return response;
    } catch (error) {
      setIsError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  }

  return { query, isLoading, isError };
};
