import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';

export const useQuery = (queryKey: string) => {
  const [params] = useSearchParams();

  const query = useMemo(() => {
    return params.get(queryKey) || undefined;
  }, [queryKey, params]);

  return { query };
};
