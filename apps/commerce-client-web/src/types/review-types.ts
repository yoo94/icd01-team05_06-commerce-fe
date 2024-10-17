export interface Review {
  reviewId: number;
  productId: number;
  content: string;
  score: number;
  createdAt: string;
  lastModifiedByUserAt: string;
  email: string;
  orderProductId: number | null;
}

export interface ReviewResponse {
  reviews: Review[];
}

export interface ReviewFormData {
  content: string;
  score: number;
}

export interface SubmitReviewData extends ReviewFormData {
  productId: number;
}
