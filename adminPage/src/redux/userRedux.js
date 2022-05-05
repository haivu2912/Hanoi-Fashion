import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        users: [],
        isFetching: false,
        error: false,
    },
    reducers: {
        loginStart: (state) => {
            state.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
        },
        loginFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        logout: (state) => {
            state.currentUser = null;
        },

        getUserStart: state => {
            state.isFetching = true;
            state.error = false;
        },
        getUserSuccess: (state, action) => {
            state.isFetching = false;
            state.users = action.payload;
        },
        getUserFailure: state => {
            state.isFetching = false;
            state.error = true;
        },

        updateUserStart: state => {
            state.isFetching = true;
            state.error = false;
        },
        updateUserSuccess: (state, action) => {
            state.isFetching = false;
            state.users[state.users.findIndex(user => user._id === action.payload._id)] = action.payload;
        },
        updateUserFailure: state => {
            state.isFetching = false;
            state.error = true;
        },

        deleteUserStart: state => {
            state.isFetching = true;
            state.error = false;
        },
        deleteUserSuccess: (state, action) => {
            state.isFetching = false;
            state.users.splice(
                state.users.findIndex(item => item._id === action.payload),
                1
            );
        },
        deleteUserFailure: state => {
            state.isFetching = false;
            state.error = true;
        },
    },
});

export const { 
    loginStart, 
    loginSuccess, 
    loginFailure,
    getUserStart,
    getUserSuccess,
    getUserFailure,
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure 
} = userSlice.actions;
export default userSlice.reducer;