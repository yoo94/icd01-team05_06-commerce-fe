// lib/extractSearchParams.ts
interface SearchParams {
  searchWord?: string;
  price?: string;
  publisher?: string;
  category?: string;
  page?: string;
  size?: string;
  tag?: string;
}

export const extractSearchParams = (searchParams: SearchParams) => {
  const params: Record<string, string> = { ...searchParams };

  params.page = searchParams.page ?? '1';
  params.size = searchParams.size ?? '5';

  // 파라미터 중 값이 있는 것만 URLSearchParams에 추가
  const queryParams = new URLSearchParams(params).toString();

  return queryParams;
};
