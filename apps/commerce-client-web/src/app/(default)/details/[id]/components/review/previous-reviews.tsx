import { useState } from 'react';
import { Review } from '@/types/review-types';
import { Star } from 'lucide-react'; // Lucide 아이콘 가져오기
import { Button } from '@/components/ui/button';

type PreviousReviewsProps = {
  reviews: Review[];
};

const PreviousReviews = ({ reviews }: PreviousReviewsProps) => {
  const [visibleReviewsCount, setVisibleReviewsCount] = useState(5); // 처음에 5개의 리뷰만 보여줌

  const showMoreReviews = () => {
    setVisibleReviewsCount((prevCount) => prevCount + 5); // 5개씩 더 보여주기
  };

  return (
    <div className="mb-8">
      <h2 className="mb-4 text-lg font-semibold">리뷰/한줄평({reviews.length ?? 0})</h2>
      {reviews.length > 0 ? (
        <>
          {reviews.slice(0, visibleReviewsCount).map((review, index) => (
            <div
              key={review.reviewId}
              className={`mb-4 pb-4 ${
                index === visibleReviewsCount - 1 || index === reviews.length - 1
                  ? ''
                  : 'border-b border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {/* 별점 표시 */}
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      className={`size-3.5 ${
                        index < review.score ? 'fill-yellow-500 text-yellow-500' : 'text-slate-300'
                      }`}
                    />
                  ))}
                  <h3 className="ml-2 text-sm font-bold">{review.email}</h3>
                </div>
                <span className="text-xs text-gray-400">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>
              {/* 리뷰 내용 */}
              <p className="mt-2 text-sm font-light text-slate-600">{review.content}</p>
              <div className="mt-2 flex justify-end space-x-4 text-xs">
                <button className="text-blue-500 hover:underline">좋아요 0</button>
                <button className="text-blue-500 hover:underline">공감 0</button>
              </div>
            </div>
          ))}

          {visibleReviewsCount < reviews.length && (
            <div className="flex justify-end">
              <Button onClick={showMoreReviews} variant="outline">
                리뷰 더 보기
              </Button>
            </div>
          )}
        </>
      ) : (
        <p className="text-slate-500">리뷰가 없습니다.</p>
      )}
    </div>
  );
};

export default PreviousReviews;
