import { instance } from "./instance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = [
  
];

/* export const postProductAsync = createAsyncThunk(
  "post/postProduct",
  async (data, thunkAPI) => {
    try {
      const res = await instance.post("/product", data);
      return res.data;
    } catch (err) {
      console.error(err);
    }
  }
);
 */

export const __getProducts = createAsyncThunk(
  "getProducts",
  async (payload, thunkAPI) => {
      try {
          const data = await axios.get(`http://13.209.26.228:8080/api/products`);
          console.log(data)
          return thunkAPI.fulfillWithValue(data.data);
      } catch (error) {
          return thunkAPI.rejectWithValue(error.code);
      }
  }
);

export const getPieceProductAsync = createAsyncThunk(
  "get/PeiceProduct",
  async () => {
    try {
      const res = await axios.get(`http://13.209.26.228:8080/api/product`);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      /* .addCase(postProductAsync.fulfilled, (state, action) => ({
        ...state,
        data: action.payload,
      })) */
      .addCase(__getProducts.fulfilled, (state, action) => {
        return (state = action.payload);
      })
      .addCase(getPieceProductAsync.fulfilled, (state, action) => ({
        ...state,
        data: action?.payload.data.concat(state.data),
        isLoading: false,
      }))
      .addCase(getPieceProductAsync.pending, (state, action) => ({
        ...state,
        isLoading: true,
      }));
  },
});

export default productSlice;
