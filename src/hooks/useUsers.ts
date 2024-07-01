import { useQuery } from '@tanstack/react-query';
import userApi from '../api/userApi.ts';

const useUser = (id: string | number) => {
  return useQuery({
    queryKey: ['users', id],
    queryFn: () => userApi.get(id as string),
    enabled: !!id,
    staleTime: 1000 * 10
  });
};

export default useUser;
