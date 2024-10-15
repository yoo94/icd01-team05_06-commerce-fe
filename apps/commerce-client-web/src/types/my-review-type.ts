export interface MyReview {
  reviewId: number;
  content: string;
  score: number;
  productId: number;
  productTitle: string;
  productAuthor: string;
  productPublisher: string;
  productCoverImage: string;
  createdAt: string;
  lastModifiedByUserAt: string;
}

export interface MyReviewResponse {
  reviews: MyReview[];
}
