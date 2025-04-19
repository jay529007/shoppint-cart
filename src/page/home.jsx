import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProduct } from "../Features/productsSlice";
import ProductCard from "../components/productCard";
import { loadState } from "../store/session";
import { toast } from "react-toastify";

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  if (loading) {
    console.log("loading");
  }
  if (error) {
    console.log("eorr");
  }

  return (
    <div className="p-6 ">
      {/* Product Grid */}
      <h2 className="text-xl font-semibold mb-4">Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products?.map((products) => (
          <ProductCard key={products.id} products={products} />
        ))}
      </div>
    </div>
  );
};

export default Home;
