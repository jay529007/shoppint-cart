import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import bcrypt from "bcryptjs";
import { State, City } from "country-state-city";
import Input from "../components/inputFields";
import { addUser } from "../Features/userAPI";

const Register = () => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch states on mount
  useEffect(() => {
    const indiaStates = State.getStatesOfCountry("IN");
    setStates(indiaStates);
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const password = watch("password");
  // const selectedStateCode = watch("state");
  const selectedStateCode = watch("Faddress.state");

  // Fetch cities when a state is selected
  useEffect(() => {
    if (selectedStateCode) {
      const stateCities = City.getCitiesOfState("IN", selectedStateCode);
      setCities(stateCities);
      // setValue("city", ""); // Reset city when state changes
      setValue("Faddress.city", "");

    }
  }, [selectedStateCode, setValue]);

  const onSubmit = (userData) => {
    const { confirmPassword, ...safeData } = userData;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(safeData.password, salt);
    safeData.password = hash;
    dispatch(addUser(safeData))
      .unwrap()
      .then(() => navigate("/login"))
      .catch((error) => console.error("Registration failed", error));
    // navigate("/login");
  };
  const errorClass =
    "text-red-500 text-sm w-fit p-1 font-medium uppercase mt-2 bg-gray-200/50";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-purple-200">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-center text-purple-700 mb-6">
          Create Account
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Full Name/ */}
          <div className=" ">
            <Input
              label="Name: "
              type="text"
              className="focus:ring-purple-400"
              placeholder="Enter the Name"
              {...register("fullname", {
                required: "Name is required",
              })}
            />
            {errors.fullname && (
              <p className={errorClass}>{errors.fullname.message}</p>
            )}
          </div>
          {/* username */}
          <div>
            <Input
              label="UserName: "
              type="text"
              className="focus:ring-purple-400"
              placeholder="Choose a username"
              {...register("username", { required: "UserName is required" })}
            />
            {errors.username && (
              <p className={errorClass}>{errors.username.message}</p>
            )}
          </div>

          {/* password */}
          <div>
            <Input
              label="Password: "
              type="password"
              className="focus:ring-purple-400"
              placeholder="Create a password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className={errorClass}>{errors.password.message}</p>
            )}
          </div>
          {/* password */}
          <div>
            <Input
              label="Confirm Password: "
              type="password"
              className="focus:ring-purple-400"
              placeholder="Repeat password"
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
            />
            {errors.confirmPassword && (
              <p className={errorClass}>{errors.confirmPassword.message}</p>
            )}
          </div>
          {/* email */}
          <div>
            <Input
              label="Email: "
              type="email"
              className="focus:ring-purple-400"
              placeholder="Enter Your Email"
              {...register("email", {
                required: "enter you email",
              })}
            />
            {errors.email && (
              <p className={errorClass}>{errors.email.message}</p>
            )}
          </div>
          {/* phonenumber */}
          <div>
            <Input
              label="Contact Number: "
              type="tel"
              className="focus:ring-purple-400"
              placeholder="Enter Your Number"
              {...register("phone", {
                required: "Enter your number",
                pattern: {
                  value: /^[6-9]/, // starts with 6-9 and total 10 digits
                  message: "Number must start with 6-9 ",
                },
                validate: {
                  isTenDigits: (value) =>
                    value.length === 10 || "Phone number must be 10 digits",
                },
              })}
            />
            {errors.phone && (
              <p className={errorClass}>{errors.phone.message}</p>
            )}
          </div>

          {/* Address Details */}
          <br />
          <p className="text-center text-2xl font-bold">Address Details</p>
          <br />

          {/* Address */}
          <div className="w-full ">
            <label className="inline-block mb-1 text-black pl-1">
              Address:
            </label>
            <textarea
              placeholder="Enter your address"
              className="focus:ring-purple-400 w-full bg-slate-50 px-4 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-2 resize-none"
              rows="2"
              {...register("Faddress.address", {
                minLength: {
                  value: 10,
                  message: "Too short! Add more detail.",
                },
              })}
            />
            {errors.Faddress?.address && (
              <p className={errorClass}>{errors.Faddress.address.message}</p>
            )}
          </div>

          {/* Pincode */}
          <div>
            <Input
              label="Pincode: "
              type="number"
              className="focus:ring-purple-400"
              placeholder="Enter Your Pincode"
              {...register("Faddress.pincode", {
                required: "Enter valid pincode",
                validate: {
                  isPinDigits: (value) =>
                    value.length === 6 || "Pincode must be 6 digits",
                },
              })}
            />
            {errors.Faddress?.pincode && (
              <p className={errorClass}>{errors.Faddress.pincode.message}</p>
            )}
          </div>

          {/* State Dropdown */}
          <div>
            <label>State:</label>
            <select
              className="border bg-slate-50  border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full "
              {...register("Faddress.state", { required: "State is required" })}
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state.isoCode} value={state.isoCode}>
                  {state.name}
                </option>
              ))}
            </select>
            {errors.Faddress?.state && (
              <p className="text-red-500">{errors.Faddress?.state.message}</p>
            )}
          </div>

          {/* City Dropdown */}
          <div>
            <label className="">City:</label>
            <select
              className="border bg-slate-50  border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full "
              {...register("Faddress.city", { required: "City is required" })}
              disabled={!selectedStateCode}
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city.name} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
            {errors.Faddress?.city && (
              <p className="text-red-500">{errors.Faddress?.city.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-lg text-lg font-semibold hover:bg-purple-700 transition"
          >
            Register
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-500">
          Already have an account?{" "}
          <span className="text-purple-600 font-medium cursor-pointer">
            <Link to="/login">Login</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
