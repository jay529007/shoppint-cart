import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProduct = async () => {
  const res = await fetch("/api/products");
  return res.json();
};

export const addProduct = async (productData) => {
  const res = await fetch("/api/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(productData),
  });
  return res.json();
};

export const updateProduct = async (id, updatedData) => {
  const res = await fetch(`/api/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });
  return res.json();
};

export const updateProductratting = createAsyncThunk(
  "products/updateProduct",
  async ({ id, updatedData }) => {
    const response = await axios.put(`/api/products/${id}`, updatedData);
    return response.data;
  }
);

export const deleteProduct = async (id) => {
  await fetch(`/api/products/${id}`, {
    method: "DELETE",
  });
};
