import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/inputFields";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../Features/userSlice";
import { toast, ToastContainer } from "react-toastify";

import bcrypt from "bcryptjs";
import { saveState } from "../store/session";

const Login = () => {
  const navigate = useNavigate();
  // fetching store
  const { users, loading, error } = useSelector((state) => state.users);
  //  db call
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (formdata) => {
    let matchedUser = await users.find((user) => {
      const matched =
        user.username === formdata.username &&
        bcrypt.compareSync(formdata.password, user.password);
      return matched;
    });
    if (matchedUser) {
      const id = matchedUser.id;
      saveState(id);
      console.log("success");
      navigate("/");
    } else {
      toast.error("Invalid username or password");
      console.log("unsuccess");
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200">
        <ToastContainer />

        {(loading && console.log("Loading..."), error && console.log("error"))}
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
          <h2 className="text-3xl font-extrabold text-center text-indigo-700 mb-6">
            Welcome Back
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <Input
                label="Username"
                type="text"
                placeholder="Enter your username"
                {...register("username", {
                  required: "username is required",
                })}
              />
              {errors.username && <p>{errors.username.message}</p>}
            </div>

            <div>
              <Input
                label="Password"
                type="password"
                placeholder="Enter your Password"
                {...register("password", {
                  required: "password is required",
                })}
              />
              {errors.password && <p>{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition"
            >
              Login
            </button>
          </form>

          <p className="mt-6 text-sm text-center text-gray-500">
            Don't have an account?{" "}
            <span className="text-indigo-600 font-medium cursor-pointer">
              <Link to="/register">Sign up</Link>
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
