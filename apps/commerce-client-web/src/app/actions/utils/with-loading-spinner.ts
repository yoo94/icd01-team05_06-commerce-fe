import { useLoading } from '@/components/common/loading-context';

export const useWithLoading = () => {
  const { setLoading } = useLoading();

  // 전달받은 비동기 함수를 실행하고 로딩 상태를 관리하는 함수 반환
  const withLoading = async <T>(asyncFn: () => Promise<T>): Promise<T> => {
    setLoading(true);
    try {
      const result = await asyncFn();
      return result;
    } finally {
      setLoading(false);
    }
  };

  return withLoading;
};
