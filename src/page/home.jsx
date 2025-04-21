import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProduct } from "../Features/productsSlice";
import ProductCard from "../components/productCard";
import { loadState } from "../store/session";
import { toast } from "react-toastify";
import Loading from "./error/loading";
import Nouserfound from "./error/no-userfound";

const Home = ({ isHome }) => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(fetchProduct(isHome));
  }, [dispatch]);
  const categoryMap = new Map();
  if (products?.length > 0) {
    products.forEach((product) => {
      const category = product.category;
      if (!categoryMap.has(category)) {
        categoryMap.set(category, []);
      }
      categoryMap.get(category).push(product);
    });
  }
  const Clothing = categoryMap.get("Clothing");
  const Electronics = categoryMap.get("Electronics");
  const Mobiles = categoryMap.get("Mobiles");
  const Footwear = categoryMap.get("Footwear");

  return (
    <>
      {error && <Nouserfound />}
      {loading && <Loading />}
      <div className="p-6 ">
        {/* Product Grid */}
        <br />
        {/* Clothing */}
        <h2 className="text-xl font-semibold mb-4">Clothing</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Clothing?.length > 0 ? (
            Clothing?.map((products) => (
              <ProductCard key={products.id} products={products} />
            ))
          ) : (
            <p>No products available in Footwear</p>
          )}
        </div>
        <br />
        {/* Footwear */}
        <h2 className="text-xl font-semibold mb-4">Footwear</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Footwear?.length > 0 ? (
            Footwear?.map((products) => (
              <ProductCard key={products.id} products={products} />
            ))
          ) : (
            <p>No products available in Footwear</p>
          )}
        </div>
        <br />
        {/* Electronics */}
        <h2 className="text-xl font-semibold mb-4">Electronics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Electronics?.length > 0 ? (
            Electronics?.map((products) => (
              <ProductCard key={products.id} products={products} />
            ))
          ) : (
            <p>No products available in Electronics</p>
          )}
        </div>
        <br />
        {/* Mobiles */}
        <h2 className="text-xl font-semibold mb-4">Mobiles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Mobiles?.length > 0 ? (
            Mobiles?.map((product) => (
              <ProductCard key={product.id} products={product} />
            ))
          ) : (
            <p>No products available in Mobiles</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
