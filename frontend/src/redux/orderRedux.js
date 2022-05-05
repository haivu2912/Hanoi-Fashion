import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        orders: [],
        isFetching: false,
        error: false,
    },

    reducers: {
        getOrderStart: state => {
            state.isFetching = true;
            state.error = false;
        },
        getOrderSuccess: (state, action) => {
            state.isFetching = false;
            state.orders = action.payload
        },
        getOrderFailure: state => {
            state.isFetching = false;
            state.error = true;
        },
        logoutOrder: (state) => {
            state.orders = []
        }
    }
});

export const {
    getOrderStart,
    getOrderSuccess,
    getOrderFailure,
    logoutOrder
} = orderSlice.actions;
export default orderSlice.reducer;