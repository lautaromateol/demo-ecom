import { FaStar, FaRegStar } from "react-icons/fa";
import { calculateAverageRating } from "@/utils/helpers";
import Stars from "./Stars";

const RatingDistribution = ({ reviews }) => {

  if (!reviews) {

    const distribution = {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0,
    };

    const ratingIcons = Object.keys(distribution).map((rating) => {
      let percentage = 0

      const starIcons = Array.from(
        { length: parseInt(rating) },
        (_, index) => (
          <FaStar key={index} className="text-main w-6 h-6 mx-1" />
        )
      );

      const emptyStarIcons = Array.from(
        { length: 5 - parseInt(rating) },
        (_, index) => (
          <FaRegStar key={index} className="text-main w-6 h-6 mx-1" />
        )
      );

      return (
        <div key={rating} className="flex items-center mb-2">
          <div className="ml-4 w-3/5">
            <div className="h-4 bg-shade">
              <div
                className="h-4 bg-tint"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>
          <div className="ml-2 w-2/5">
            <div className="flex items-center">
              {starIcons}
              {emptyStarIcons}
            </div>
            <p className="text-sm text-primary">{percentage}%</p>
          </div>
        </div>
      );
    });


    return (
      <div className="flex flex-col md:flex-row lg:flex-row">
        <div className="w-full md:w-1/4 lg:w-1/4 flex items-center">
          <div className="mx-auto flex flex-col items-center justify-center">
            <p className="text-5xl font-bold mb-0">
              <strong>0</strong>
            </p>
            <Stars rating={0} />
          </div>
        </div>
        <div className="w-full md:w-3/4 lg:w-3/4">
          {ratingIcons.reverse()}
        </div>
      </div>
    )
  }

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
        <FaStar key={index} className="text-main w-6 h-6 mx-1" />
      )
    );

    const emptyStarIcons = Array.from(
      { length: 5 - parseInt(rating) },
      (_, index) => (
        <FaRegStar key={index} className="text-main w-6 h-6 mx-1" />
      )
    );

    return (
      <div key={rating} className="flex items-center mb-2">
        <div className="ml-4 w-3/5">
          <div className="h-4 bg-shade">
            <div
              className="h-4 bg-tint"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>
        <div className="ml-2 w-2/5">
          <div className="flex items-center">
            {starIcons}
            {emptyStarIcons}
          </div>
          <p className="text-sm text-primary">{percentage}%</p>
        </div>
      </div>
    );
  });

  return (
    <div className="flex flex-col md:flex-row lg:flex-row">
      <div className="w-full md:w-1/4 lg:w-1/4 flex items-center">
        <div className="mx-auto flex flex-col items-center justify-center">
          <p className="text-5xl font-bold text-tint mb-0">
            <strong>{calculateAverageRating(reviews)?.toFixed(1)}</strong>
          </p>
          <Stars rating={calculateAverageRating(reviews)} />
        </div>
      </div>
      <div className="w-full md:w-3/4 lg:w-3/4">
        {ratingIcons.reverse()}
      </div>
    </div>
  );
};

export default RatingDistribution;
