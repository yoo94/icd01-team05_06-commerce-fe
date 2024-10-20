import { useLoading } from '@/components/common/loading-context';

export const useWithLoading = () => {
  const { setLoading } = useLoading();
  return async <T>(asyncFn: () => Promise<T>): Promise<T> => {
    setLoading(true);
    try {
      return await asyncFn();
    } finally {
      setLoading(false);
    }
  };
};

export const useWithLoadingAsync = <T>(asyncFn: () => Promise<T>) => {
  const { setLoading } = useLoading();

  return async () => {
    setLoading(true);
    try {
      return await asyncFn();
    } finally {
      setLoading(false);
    }
  };
};
