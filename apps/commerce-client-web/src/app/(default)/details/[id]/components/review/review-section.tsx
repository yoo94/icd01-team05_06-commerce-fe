import { useState, useEffect } from 'react';
import PreviousReviews from './previous-reviews';
import NewReviewForm from './new-review-form';
import allReviews from '@/data/reviews.json';

type Review = {
  id: number;
  book: {
    id: number;
  };
  user: {
    id: number;
    username: string;
  };
  rating: number;
  comment: string;
  createdAt: string;
};

const ReviewSection = ({ id }: { id: number }) => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const filteredReviews = allReviews.filter((review) => review.book.id === id);
    setReviews(filteredReviews);
  }, [id]);

  const handleNewReviewSubmit = (
    username: string,
    comment: string,
    rating: number,
    date: string,
  ) => {
    const newReview: Review = {
      id: reviews.length + 1,
      book: { id },
      user: { id: reviews.length + 1, username },
      rating,
      comment,
      createdAt: date,
    };
    setReviews([...reviews, newReview]);
  };

  return (
    <div className="w-full">
      <PreviousReviews reviews={reviews} />
      <NewReviewForm onSubmit={handleNewReviewSubmit} />
    </div>
  );
};

export default ReviewSection;
