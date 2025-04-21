import { Outlet } from "react-router-dom";
import Navbar from "./navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loadState } from "../store/session";
import { useSelector } from "react-redux";
import Login from "./login";
import Loading from "./error/loading";

const Mainlayout = () => {
  const id = loadState();
  const { users, loading, error } = useSelector((state) => state.users);
  const isLogin = users?.some((user) => user.id === id);
  // if (loading) {
  //   <Loading />;
  // }

  // if (error) {
  //   console.log("error");
  //   // optionally return an error UI here
  // }

  return (
    <>
      {error && console.log("error")}
      {loading && <Loading />}
      {isLogin ? (
        <>
          <Navbar />
          <ToastContainer />
          <Outlet />
        </>
      ) : (
        <>
          <Login />
        </>
      )}
    </>
  );
};

export default Mainlayout;
