import {createSlice} from '@reduxjs/toolkit';

export const orderSlice = createSlice({
    name: 'statistical',
    initialState: {
        statistical: [],
        isFetching: false,
        error: false,
    },
    reducers: {
        getStatStart: state => {
            state.isFetching = true;
            state.error = false;
        },
        getStatSuccess: (state, action) => {
            state.isFetching = false;
            state.statistical = action.payload;
        },
        getStatFailure: state => {
            state.isFetching = false;
            state.error = true;
        },
    }
});

export const {
    getStatStart,
    getStatSuccess,
    getStatFailure,
} = orderSlice.actions;

export default orderSlice.reducer;