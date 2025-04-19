import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Features/userSlice";
import productReducer from "../Features/productsSlice";

export const store = configureStore({
  reducer: {
    users: userReducer,
    products: productReducer,
  },
});
