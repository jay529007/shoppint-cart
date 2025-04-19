import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateProductratting } from "../Features/productsAPI";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";

const ProductCard = ({ products }) => {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(products.rating); // Start with existing rating from product data
  const [hoveredRating, setHoveredRating] = useState(0); // Track hovered stars

  const handleStarClick = (value) => {
    setRating(value); // Update the rating
    dispatch(
      updateProductratting({
        id: products.id,
        updatedData: {
          ...products,
          rating: value,
        },
      })
    );
  };

  const handleMouseEnter = (value) => {
    setHoveredRating(value);
  };

  const handleMouseLeave = () => {
    setHoveredRating(0);
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i + 1}
        className={`cursor-pointer text-2xl transition-colors duration-150  ${
          (hoveredRating > 0 ? i + 1 <= hoveredRating : i + 1 <= rating)
            ? "text-yellow-500"
            : "text-gray-300"
        }`}
        onClick={() => handleStarClick(i + 1)}
        onMouseEnter={() => handleMouseEnter(i + 1)}
        onMouseLeave={handleMouseLeave}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 shadow w-full hover:shadow-md transition">
      {/* Product Image */}
      <div className="mb-4 flex ">
        <div className="flex-1">
          <img
            src={products.images}
            alt={products.title}
            className="w-full h-40 max-w-full object-contain  rounded-md"
          />
        </div>
        <div className="h-fit">
          <CiHeart className="line-md--heart-filled  text-transparent" />
        </div>
      </div>

      {/* Product Title */}
      <h3 className="text-lg font-medium mb-2">{products.title}</h3>

      {/* Product Description */}
      <p className="text-sm text-gray-600 mb-3">{products.description}</p>

      {/* Product Price */}
      <p className="text-xl font-semibold text-green-500">₹{products.price}</p>

      {/* Product Category */}
      <p className="text-sm text-gray-500 mb-2">
        Category: {products.category}
      </p>

      {/* Product Rating */}
      <div className="mb-4">
        <div className="flex items-center space-x-2">{renderStars()}</div>
        <span className="text-gray-500">({rating})</span>
      </div>

      {/* Product Stock */}
      <p className="text-sm text-gray-500 mb-4">
        {products.stock > 0 ? `${products.stock} in stock` : "Out of stock"}
      </p>

      {/* Add to Cart Button */}
      <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
