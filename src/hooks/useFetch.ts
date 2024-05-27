import useSWR from 'swr';
import fetcher from '../utils/fetcher';

const useFetch = <T>(url: string, config?: RequestInit) => {
  const { data, error } = useSWR<{ data: T; response: Response }>(url, () => fetcher(url, config), {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    data,
    error,
    isLoading: !data && !error,
  };
};

export default useFetch;
