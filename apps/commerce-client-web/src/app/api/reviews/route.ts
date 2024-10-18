import { NextResponse } from 'next/server';
import { api } from '@/lib/api';
import { ApiResponse } from '@/types/api-types';
import { ReviewResponse, SubmitReviewData } from '@/types/review-types';
import { getHeadersWithToken } from '@/app/actions/utils/action-helper';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get('productId');

  if (!productId) {
    return NextResponse.json(
      { success: false, message: 'productId가 누락되었습니다.' },
      { status: 400 },
    );
  }

  try {
    const response = await api
      .get('product/v1/reviews', {
        searchParams: { productId: productId.toString() }, // 쿼리 파라미터로 전달
      })
      .json<ApiResponse<ReviewResponse>>();

    if (!response.success || !response.data) {
      throw new Error(response.error?.message || '상품 리뷰 조회에 실패했습니다.');
    }

    return NextResponse.json({ success: true, data: response.data.reviews });
  } catch (error) {
    console.error('Failed to fetch product reviews:', error);
    return NextResponse.json(
      { success: false, error: { message: '상품 리뷰를 불러오는 중 오류가 발생했습니다.' } },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  const headers = await getHeadersWithToken();

  if (!headers) {
    return NextResponse.json({ success: false, message: 'No token found' }, { status: 401 });
  }

  try {
    // 리뷰 데이터 파싱
    const reviewData: SubmitReviewData = await request.json();

    // 리뷰 제출 API 호출
    const response = await api
      .post('product/v1/reviews', {
        json: reviewData,
        headers,
      })
      .json<ApiResponse<null>>();

    if (!response.success) {
      throw new Error(response.error?.message || '리뷰 제출에 실패했습니다.');
    }

    return NextResponse.json({ success: true, message: '리뷰가 성공적으로 제출되었습니다.' });
  } catch (error) {
    console.error('Failed to submit review:', error);
    return NextResponse.json(
      { success: false, message: '리뷰 제출 중 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}
