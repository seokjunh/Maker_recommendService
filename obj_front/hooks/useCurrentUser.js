import fetcher from '@/utils/fetcher';
import useSWR from 'swr';

const useCurrentUser = () => {
  const {
    data: userData,
    isLoading,
    error,
    isValidating,
    mutate,
  } = useSWR('currentUser', fetcher);

  return {
    userData,
    error,
    isLoading,
    isValidating,
    mutate,
  };
};

export default useCurrentUser;
