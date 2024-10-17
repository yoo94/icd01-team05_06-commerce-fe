'use client';

import { useState, useEffect } from 'react';
import PreviousReviews from './previous-reviews';
import NewReviewForm from './new-review-form';
import { Review } from '@/types/review-types';
import useAuthStore from '@/stores/use-auth-store'; // Import your auth store
import { fetchProductReviews } from '@/services/review-api';

interface ReviewSectionProps {
  id: number;
}

const ReviewSection = ({ id }: ReviewSectionProps) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const { isLoggedIn } = useAuthStore(); // Get the logged-in state from auth store

  const loadReviews = async () => {
    try {
      const fetchedReviews = await fetchProductReviews({ productId: id });
      setReviews(fetchedReviews);
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    }
  };

  useEffect(() => {
    loadReviews();
  }, [id]);

  const handleReviewSubmitted = async () => {
    await loadReviews();
  };

  return (
    <div className="w-full">
      <PreviousReviews reviews={reviews} />
      {isLoggedIn ? ( // Only show the form if the user is logged in
        <NewReviewForm productId={id} onReviewSubmitted={handleReviewSubmitted} />
      ) : (
        <p className="mb-10 rounded-md bg-slate-50 p-4 text-slate-500">
          로그인 후 리뷰를 작성할 수 있습니다.
        </p>
      )}
    </div>
  );
};

export default ReviewSection;
