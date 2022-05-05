import {createSlice} from '@reduxjs/toolkit';

export const reportSlice = createSlice({
    name: 'report',
    initialState: {
        reports: [],
        isFetching: false,
        error: false,
    },
    reducers: {
        getReportStart: state => {
            state.isFetching = true;
            state.error = false;
        },
        getReportSuccess: (state, action) => {
            state.isFetching = false;
            state.reports = action.payload;
        },
        getReportFailure: state => {
            state.isFetching = false;
            state.error = true;
        },
        deleteReportStart: state => {
            state.isFetching = true;
            state.error = false;
        },
        deleteReportSuccess: (state, action) => {
            state.isFetching = false;
            state.reports.splice(
                state.reports.findIndex(item => item._id === action.payload),
                1
            );
        },
        deleteReportFailure: state => {
            state.isFetching = false;
            state.error = true;
        },
    }
});

export const {
    getReportStart,
    getReportSuccess,
    getReportFailure,
    deleteReportStart,
    deleteReportSuccess,
    deleteReportFailure
} = reportSlice.actions;

export default reportSlice.reducer;