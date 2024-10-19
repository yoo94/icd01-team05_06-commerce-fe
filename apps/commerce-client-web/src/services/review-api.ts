import { ApiResponse } from '@/types/api-types';
import { Review, SubmitReviewData } from '@/types/review-types';

export const fetchProductReviews = async ({
  productId,
}: {
  productId: number;
}): Promise<Review[]> => {
  const response = await fetch(`/api/reviews?productId=${productId}`);

  if (!response.ok) {
    throw new Error('Failed to fetch product reviews');
  }

  console.log('response', response);

  const data: ApiResponse<Review[]> = await response.json();

  if (!data.success || !data.data) {
    throw new Error(data.error?.message || 'Error fetching reviews');
  }

  return data.data;
};

export const submitReview = async (reviewData: SubmitReviewData): Promise<ApiResponse<null>> => {
  try {
    const response = await fetch('/api/reviews', {
      method: 'POST',
      body: JSON.stringify(reviewData),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || '리뷰 제출에 실패했습니다.');
    }

    const data: ApiResponse<null> = await response.json();

    return data;
  } catch (error) {
    console.error('Failed to submit review:', error);
    throw new Error('리뷰 제출 중 오류가 발생했습니다.');
  }
};
