import { useState, useCallback } from 'react';

interface Options<T, K> {
  request: (body: K) => Promise<T>;
}

export const useMutation = <T, K>({ request }: Options<T, K>) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<string | null>(null);

  const mutation = useCallback(async (body: K) => {
    try {
      setIsLoading(true);
      setIsError(null);
      const response = await request(body);
      return response;
    } catch (error) {
      setIsError((error as Error).message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [request]);

  return { mutation, isLoading, isError };
};
