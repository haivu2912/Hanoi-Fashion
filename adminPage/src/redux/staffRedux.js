import { createSlice } from "@reduxjs/toolkit";

const staffSlice = createSlice({
    name: "staff",
    initialState: {
        staffs: [],
        isFetching: false,
        error: false,
    },
    reducers: {
        getStaffStart: state => {
            state.isFetching = true;
            state.error = false;
        },
        getStaffSuccess: (state, action) => {
            state.isFetching = false;
            state.staffs = action.payload;
        },
        getStaffFailure: state => {
            state.isFetching = false;
            state.error = true;
        },

        updateStaffStart: state => {
            state.isFetching = true;
            state.error = false;
        },
        updateStaffSuccess: (state, action) => {
            state.isFetching = false;
            state.staffs[state.staffs.findIndex(staff => staff._id === action.payload._id)] = action.payload;
        },
        updateStaffFailure: state => {
            state.isFetching = false;
            state.error = true;
        },

        addStaffStart: state => {
            state.isFetching = true;
            state.error = false;
        },
        addStaffSuccess: (state, action) => {
            state.isFetching = false;
            state.staffs.push(action.payload);
        },
        addStaffFailure: state => {
            state.isFetching = false;
            state.error = true;
        },
        deleteStaffStart: state => {
            state.isFetching = true;
            state.error = false;
        },
        deleteStaffSuccess: (state, action) => {
            state.isFetching = false;
            state.staffs.splice(
                state.staffs.findIndex(item => item._id === action.payload),
                1
            );
        },
        deleteStaffFailure: state => {
            state.isFetching = false;
            state.error = true;
        },
    },
});

export const { 
    getStaffStart,
    getStaffSuccess,
    getStaffFailure,
    updateStaffStart,
    updateStaffSuccess,
    updateStaffFailure,
    addStaffStart,
    addStaffSuccess,
    addStaffFailure,
    deleteStaffStart,
    deleteStaffSuccess,
    deleteStaffFailure 
} = staffSlice.actions;
export default staffSlice.reducer;