import { Star, StarHalf, Star as EmptyStar } from 'lucide-react';

interface StarRatingProps {
  rating: number; // The rating should be a number between 0 and 10
}

const StarRating = ({ rating }: StarRatingProps) => {
  // Convert 10-point scale to 5-point scale
  const convertedRating = rating / 2;

  // Calculate the number of filled and unfilled stars
  const fullStars = Math.floor(convertedRating);
  const halfStar = convertedRating - fullStars >= 0.5; // If there's a half star
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center">
      {/* Render full stars */}
      {[...Array(fullStars)].map((_, index) => (
        <Star key={index} className="size-5 fill-yellow-400 text-yellow-400" />
      ))}

      {/* Render half star if applicable */}
      {halfStar && <StarHalf className="size-5 fill-yellow-400 text-yellow-400" />}

      {/* Render empty stars */}
      {[...Array(emptyStars)].map((_, index) => (
        <EmptyStar key={index} className="size-5 text-gray-300" />
      ))}
    </div>
  );
};

export default StarRating;
