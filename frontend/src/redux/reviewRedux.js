import { createSlice } from "@reduxjs/toolkit";

const reviewSlice = createSlice({
  name: "review",
  initialState: {
    reviews: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    reviewStart: (state) => {
      state.isFetching = true;
    },
    reviewSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.reviews.push(action.payload);
    },
    reviewFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const { 
  reviewStart,
  reviewSuccess,
  reviewFailure
} = reviewSlice.actions;

export default reviewSlice.reducer;