import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../Features/productsSlice";
import Loading from "./error/loading";
import Nouserfound from "./error/no-userfound";
import { Link, useParams } from "react-router-dom";
import { updateProductratting } from "../Features/productsAPI";
import { IoArrowBackOutline } from "react-icons/io5";

const Products = () => {
  // fetching products
  const { id } = useParams();
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);
  const product = products.find((item) => item.id === id);

  // rating logic
  var [rating, setRating] = useState();
  rating = product?.rating;
  const [hoveredRating, setHoveredRating] = useState(0);

  if (loading) {
    <Loading />;
  }
  if (error) {
    <Nouserfound />;
  }

  const handleStarClick = (value) => {
    setRating(value);

    // for update ratting star
    dispatch(
      updateProductratting({
        id: product.id,
        updatedData: {
          ...product,
          rating: value,
        },
      })
    );
  };
  const renderStars = () =>
    Array.from({ length: 5 }, (_, i) => {
      const filled = hoveredRating ? i < hoveredRating : i < rating;
      return (
        <span
          key={i}
          className={`text-2xl cursor-pointer transition-all ${
            filled ? "text-yellow-400 scale-110" : "text-gray-300"
          }`}
          onMouseEnter={() => setHoveredRating(i + 1)}
          onMouseLeave={() => setHoveredRating(0)}
          onClick={() => handleStarClick(i + 1)}
        >
          ★
        </span>
      );
    });

  return (
    // <></>
    <div className="w-full min-h-screen bg-white text-gray-800">
      {/* Header */}
      <Link
        to="/"
        className="text-white hover:text-gray-100 hover:py-2 hover:px-4 duration-150 bg-blue-500 shadow-2xl w-fit px-3 py-1 m-3 rounded-2xl flex items-center"
      >
        <IoArrowBackOutline className="text-2xl mr-2" /> Back
      </Link>
      <div className="w-full py-6 px-8 shadow-sm">
        <h1 className="text-3xl font-bold">Product Details</h1>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-7xl mx-auto py-12 px-4 md:px-8 flex flex-col lg:flex-row gap-12">
        {/* Left: Product Image */}
        <div className="flex-1 flex justify-center items-start">
          <img
            src={product?.images}
            alt={product?.title}
            className="rounded-2xl w-full max-w-md object-contain shadow-xl"
          />
        </div>

        {/* Right: Product Info */}
        <div className="flex-1 space-y-6">
          <h2 className="text-4xl font-semibold">{product?.title}</h2>
          <p className="text-gray-600 text-lg">{product?.description}</p>

          <div className="text-3xl font-bold text-green-600">
            ₹ {product?.price}
          </div>

          <div className="flex items-center gap-2 text-lg">
            {renderStars()}
            <span className="text-gray-500">{product?.rating}</span>
          </div>

          <div className="text-base space-y-1">
            <p>
              <span className="font-medium text-gray-700">Brand:</span>{" "}
              {product?.brand}
            </p>
            <p>
              <span className="font-medium text-gray-700">Category:</span>{" "}
              {product?.category}
            </p>
            <p
              className={`font-semibold ${
                product?.stock > 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {product?.stock > 0
                ? `In Stock (${product?.stock} items)`
                : "Out of Stock"}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-6">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition">
              Add to Cart
            </button>
            <Link
              to="/"
              className="bg-black hover:bg-gray-900 text-white px-6 py-3 rounded-xl transition"
            >
              Buy Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
