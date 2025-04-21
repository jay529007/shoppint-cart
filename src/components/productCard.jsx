import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const ProductCard = ({ products }) => {
  
  return (
    <Link
      to={`${products.id}`}
      className="border border-gray-200 rounded-lg p-4 shadow w-full hover:shadow-md transition"
    >
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
    </Link>
  );
};

export default ProductCard;
