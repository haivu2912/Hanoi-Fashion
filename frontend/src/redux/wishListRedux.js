import {createSlice} from '@reduxjs/toolkit';

const wishListSlice = createSlice({
    name: 'wishlist',
    initialState: {
        products: [],
        isFetching: false,
        error: false,
        quantity: 0,
        userId: '',
        wishlistId: ''
    },

    reducers: {
        getWishListStart: state => {
            state.isFetching = true;
            state.error = false;
        },
        getWishListSuccess: (state, action) => {
            state.isFetching = false;
            state.wishlistId = action.payload?._id;
            state.quantity = action.payload.products.length;
            state.products = action.payload?.products || [];
            state.userId = action.payload?.userId
        },
        getWishListFailure: state => {
            state.isFetching = false;
            state.error = true;
        },

        createWishListStart: state => {
            state.isFetching = true;
            state.error = false;
        },
        createWishListSuccess: (state, action) => {
            state.isFetching = false;
            state.error = false;
            state.quantity += 1;
            state.products.push(action.payload.product);
            state.wishlistId = action.payload._id
            state.userId = action.payload.userId;
        },
        createWishListFailure: state => {
            state.isFetching = false;
            state.error = true;
        },

        addWishListStart: state => {
            state.isFetching = true;
            state.error = false;
        },
        addWishListSuccess: (state, action) => {
            state.isFetching = false;
            state.error = false;
            state.quantity = action.payload.products.length;
            state.products.push(action.payload.product);
        },
        addWishListFailure: state => {
            state.isFetching = false;
            state.error = true;
        },
        
        removeWishListStart: state => {
            state.isFetching = true;
            state.error = false;
        },
        removeWishListSuccess: (state, action) => {
            state.quantity -= 1;
            state.products.splice(
                state.products.findIndex(item => item.productId._id === action.payload.productId),
                1
            );
        },
        removeWishListFailure: state => {
            state.isFetching = false;
            state.error = true;
        },

        logoutWishList: (state) => {
            state.products = [];
            state.quantity = 0;
            state.userId = '';
            state.wishlistId = '';
        }
    }
});

export const {
    getWishListStart,
    getWishListSuccess,
    getWishListFailure,
    createWishListStart,
    createWishListSuccess,
    createWishListFailure,
    addWishListStart,
    addWishListSuccess,
    addWishListFailure,
    removeWishListStart,
    removeWishListSuccess,
    removeWishListFailure,
    logoutWishList 
} = wishListSlice.actions;
export default wishListSlice.reducer;