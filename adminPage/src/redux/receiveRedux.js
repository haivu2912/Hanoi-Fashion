import {createSlice} from '@reduxjs/toolkit';

export const receiveSlice = createSlice({
    name: 'receive',
    initialState: {
        receives: [],
        isFetching: false,
        error: false,
    },
    reducers: {
        getReceiveStart: state => {
            state.isFetching = true;
            state.error = false;
        },
        getReceiveSuccess: (state, action) => {
            state.isFetching = false;
            state.receives = action.payload;
        },
        getReceiveFailure: state => {
            state.isFetching = false;
            state.error = true;
        },
        updateReceiveStart: state => {
            state.isFetching = true;
            state.error = false;
        },
        updateReceiveSuccess: (state, action) => {
            state.isFetching = false;
            state.receives[state.receives.findIndex(item => item._id === action.payload._id)] = action.payload.products;
        },
        updateReceiveFailure: state => {
            state.isFetching = false;
            state.error = true;
        },
        deleteReceiveStart: state => {
            state.isFetching = true;
            state.error = false;
        },
        deleteReceiveSuccess: (state, action) => {
            state.isFetching = false;
            state.receives.splice(
                state.receives.findIndex(item => item._id === action.payload),
                1
            );
        },
        deleteReceiveFailure: state => {
            state.isFetching = false;
            state.error = true;
        },

        deleteProductInReceiveStart: state => {
            state.isFetching = true;
            state.error = false;
        },
        deleteProductInReceiveSuccess: (state, action) => {
            state.isFetching = false;
            state.receives[state.receives.findIndex(item => item._id === action.payload._id)] = action.payload;
        },
        deleteProductInReceiveFailure: state => {
            state.isFetching = false;
            state.error = true;
        },
    }
});

export const {
    getReceiveStart,
    getReceiveSuccess,
    getReceiveFailure,
    updateReceiveStart,
    updateReceiveSuccess,
    updateReceiveFailure,
    deleteReceiveStart,
    deleteReceiveSuccess,
    deleteReceiveFailure,
    deleteProductInReceiveStart,
    deleteProductInReceiveSuccess,
    deleteProductInReceiveFailure
} = receiveSlice.actions;

export default receiveSlice.reducer;