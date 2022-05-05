import { createSlice } from "@reduxjs/toolkit";

const newUserSlice = createSlice({
  name: "newUser",
  initialState: {
    newUser: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    registerStart: (state) => {
      state.isFetching = true;
    },
    registerSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.newUser = action.payload;
    },
    registerFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    registerClear: (state) => {
      state.newUser = null
    }
  }
});

export const { 
  registerStart, 
  registerSuccess, 
  registerFailure,
  registerClear
} = newUserSlice.actions;

export default newUserSlice.reducer;