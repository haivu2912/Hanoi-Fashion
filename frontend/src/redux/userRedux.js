import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    updateUserInfoStart: (state) => {
      state.isFetching = true;
    },
    updateUserInfoSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.currentUser = action.payload
    },
    updateUserInfoFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    }, 

    logout: (state) => {
      state.currentUser = null;
    }
  },
});

export const { 
  loginStart, 
  loginSuccess, 
  loginFailure,
  updateUserInfoStart,
  updateUserInfoSuccess,
  updateUserInfoFailure,
  logout
} = userSlice.actions;

export default userSlice.reducer;