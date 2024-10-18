export interface ProductsSearchParams {
  word?: string;
  price?: string;
  publisher?: string;
  category?: string;
  page?: string;
  size?: string;
  tag?: string;
  type?: string;
}

export const extractSearchParams = (params: ProductsSearchParams) => {
  // 기본값 설정
  const searchParams: Record<string, string> = {
    page: params.page ?? '1',
    size: params.size ?? '5',
  };

  // 값이 존재하는 파라미터만 추가
  if (params.word) {
    searchParams.searchWord = params.word;
  }

  if (params.price) {
    searchParams.price = params.price;
  }

  if (params.publisher) {
    searchParams.publisher = params.publisher;
  }

  if (params.category) {
    searchParams.productCategoryId = params.category;
  }

  if (params.tag) {
    searchParams.tag = params.tag;
  }

  if (params.type) {
    searchParams.homeProductType = params.type;
  }

  return new URLSearchParams(searchParams).toString();
};
