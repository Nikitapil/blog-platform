import { useState } from 'react';
import { AxiosResponse } from 'axios';

export const useRequest = <T, K>(
  callback: (params: T) => Promise<AxiosResponse<K>>
): [(params: T) => Promise<AxiosResponse<K>>, boolean, string] => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fn = async (params: T) => {
    try {
      setIsLoading(true);
      return await callback(params);
    } catch (e: any) {
      setError(e?.response?.data?.message);
      return e;
    } finally {
      setIsLoading(false);
    }
  };
  return [fn, isLoading, error];
};
