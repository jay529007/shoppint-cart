import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getProduct,
  addProduct as apiAddProduct,
  updateProduct as apiUpdateProduct,
  deleteProduct as apiDeleteProduct,
} from "./productsAPI";
//display
export const fetchProduct = createAsyncThunk(
  "products/fetchProduct",
  async () => {
    const data = await getProduct();
    return data;
  }
);

//add
export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (productData) => {
    const data = await apiAddProduct(productData);
    return data;
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, updatedData }) => {
    const data = await apiUpdateProduct(id, updatedData);
    return data;
  }
);

export const deleteProduct = createAsyncThunk(
  "Products/deleteProduct",
  async (id) => {
    await apiDeleteProduct(id);
    return id;
  }
);

const initialState = {
  products: [],
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(
          (p) => p.id === action.payload.id
        );
        if (index !== -1) state.products[index] = action.payload;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((p) => p.id !== action.payload);
      });
  },
});

export default productsSlice.reducer;
