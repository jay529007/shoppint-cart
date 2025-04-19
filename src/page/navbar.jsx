import { useNavigate, Link } from "react-router-dom";
import { clearState, loadState } from "../store/session";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchUsers } from "../Features/userSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const id = loadState();
  const { users, loading, error } = useSelector((state) => state.users);
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  // console.log(users[1]?.username);

  const currentUser = users.find((user) => user.id === id);
  // console.log(currentUser?.username);

  if (loading) {
    console.log("Loading...");
  }
  if (error) {
    console.log("error");
  }
  const onClickLogout = () => {
    clearState();
    navigate("/login");
  };
  return (
    <div className="bg-white shadow-md py-4 px-6">
      <div className="md:flex hidden justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-blue-600">🛒 MyShop</div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-8">
          <Link
            to="/"
            className="text-gray-600 hover:text-blue-600 transition duration-200"
          >
            Home
          </Link>
          <Link
            to="/products"
            className="text-gray-600 hover:text-blue-600 transition duration-200"
          >
            Products
          </Link>
          <Link
            to="/about"
            className="text-gray-600 hover:text-blue-600 transition duration-200"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-gray-600 hover:text-blue-600 transition duration-200"
          >
            Contact
          </Link>
        </div>

        {/* Right Section - Cart & Login */}
        <div className="flex items-center space-x-6">
          {/* Cart */}
          <p className=" flex items-center gap-2 mr-3 py-2 px-2 bg-indigo-300 rounded-2xl">
            {" "}
            <span>{/* <FaRegCircle className={loginClass} /> */}</span>{" "}
            {`Hello ${currentUser?.username || "User"} `}
          </p>
          <div className="relative">
            <button className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition duration-200">
              <i className="fas fa-shopping-cart text-xl text-gray-600"></i>
            </button>
            <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              3
            </span>{" "}
            {/* Cart Count */}
          </div>

          {/* Login Button */}
          <button
            onClick={onClickLogout}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
          >
            Login
          </button>
        </div>
      </div>

      {/* Mobile Navbar (Hamburger Menu) */}
      <div className="md:hidden flex justify-between items-center mt-4">
        <div className="text-2xl font-bold text-blue-600">🛒 MyShop</div>
        <button className="text-gray-600 hover:text-blue-600">
          <i className="fas fa-bars text-xl"></i>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
