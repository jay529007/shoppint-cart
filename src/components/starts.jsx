import { useState } from "react";

const Rating = () => {
  const [rating, setRating] = useState(0); // Initialize state to store rating
  const handleStarClick = (value) => {
    setRating(value); // Update the rating state when a star is clicked
  };

  // Function to render the stars
  const renderStars = () => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`cursor-pointer text-2xl ${
            i <= rating ? "text-yellow-500" : "text-gray-300"
          }`}
          onClick={() => handleStarClick(i)} // Set rating to the clicked star's value
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="flex items-center space-x-2">
      {/* Render 5 stars */}
      {renderStars()}

      {/* Display the current rating */}
      <span className="ml-2 text-lg">{rating}</span>
    </div>
  );
};

export default Rating;
