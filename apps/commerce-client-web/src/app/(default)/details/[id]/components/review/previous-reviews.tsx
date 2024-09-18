import { Star } from 'lucide-react'; // Lucide 아이콘 가져오기

// Review 타입 정의
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

type PreviousReviewsProps = {
  reviews: Review[];
};

const PreviousReviews = ({ reviews }: PreviousReviewsProps) => {
  return (
    <div className="mb-8">
      <h2 className="mb-4 text-xl font-semibold">리뷰/한줄평({reviews.length})</h2>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.id} className="mb-4 border-b border-gray-300 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className={`size-4 ${
                      index < review.rating ? 'text-yellow-500' : 'text-gray-300'
                    }`}
                  />
                ))}
                <h3 className="ml-2 font-bold">{review.user.username}</h3>
              </div>
              <span className="text-sm text-gray-400">
                {new Date(review.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="mt-2 text-gray-600">{review.comment}</p>
            <div className="mt-2 flex justify-end space-x-4 text-sm">
              <button className="text-blue-500 hover:underline">좋아요 0</button>
              <button className="text-blue-500 hover:underline">공감 0</button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">리뷰가 없습니다.</p>
      )}
    </div>
  );
};

export default PreviousReviews;
