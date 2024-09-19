import { Star, Star as EmptyStar } from 'lucide-react';

interface StarRatingProps {
  rating: number; // The rating should be a number between 0 and 10
}

const StarRating = ({ rating }: StarRatingProps) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center">
      {/* Render full stars */}
      {[...Array(fullStars)].map((_, index) => (
        <Star key={index} className="size-5 fill-yellow-400 text-yellow-400" />
      ))}

      {/* Render half star if applicable */}
      {halfStar && <Star className="size-5  text-yellow-400 " />}

      {/* Render empty stars */}
      {[...Array(emptyStars)].map((_, index) => (
        <EmptyStar key={index} className="size-5 text-gray-300" />
      ))}
    </div>
  );
};

export default StarRating;
