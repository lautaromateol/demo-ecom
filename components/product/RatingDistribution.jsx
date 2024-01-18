import { FaStar, FaRegStar } from "react-icons/fa";
import { calculateAverageRating } from "@/utils/helpers";
import Stars from "./Stars";

const RatingDistribution = ({ reviews }) => {
  const distribution = {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  };

  let totalReviews = 0;

  reviews?.forEach(({ rating }) => {
    distribution[rating]++;
    totalReviews++;
  });

  const ratingIcons = Object.keys(distribution).map((rating) => {
    const count = distribution[rating];
    let percentage = ((count / totalReviews) * 100).toFixed(2);
    percentage =
      parseFloat(percentage) === parseInt(percentage)
        ? parseInt(percentage)
        : percentage;

    const starIcons = Array.from(
      { length: parseInt(rating) },
      (_, index) => (
        <FaStar key={index} className="text-yellow-300 text-2xl mx-1" />
      )
    );

    const emptyStarIcons = Array.from(
      { length: 5 - parseInt(rating) },
      (_, index) => (
        <FaRegStar key={index} className="text-yellow-300 text-2xl mx-1" />
      )
    );

    return (
      <div key={rating} className="flex items-center mb-2">
        <div className="w-3/5">
          <div className="h-4 bg-gray-300">
            <div
              className="h-4 bg-yellow-400"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>
        <div className="ml-2 w-2/5">
          <div className="flex items-center">
            {starIcons}
            {emptyStarIcons}
          </div>
          <p className="text-sm text-gray-500">{percentage}%</p>
        </div>
      </div>
    );
  });

  return (
    <div className="flex">
      <div className="w-1/4 flex items-center">
        <div className="flex flex-col items-center justify-center">
          <p className="text-5xl font-bold mb-0">
            <strong>{calculateAverageRating(reviews)?.toFixed(1)}</strong>
          </p>
          <Stars rating={calculateAverageRating(reviews)} />
          <p className="text-sm text-gray-500">Product Rating</p>
        </div>
      </div>
      <div className="w-3/4">{ratingIcons.reverse()}</div>
    </div>
  );
};

export default RatingDistribution;
