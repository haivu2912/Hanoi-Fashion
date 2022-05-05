import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        products: [],
        isFetching: false,
        error: false,
        quantity: 0,
        total: 0,
        userId: '',
        cartId: ''
    },

    reducers: {
        getCartStart: state => {
            state.isFetching = true;
            state.error = false;
        },
        getCartSuccess: (state, action) => {
            state.isFetching = false;
            state.cartId = action.payload?._id;
            state.quantity = action.payload.products.length;
            state.products = action.payload?.products || [];
            state.userId = action.payload?.userId
            state.total = action.payload?.products.reduce((total, product) => total + (product.quantity * product.productId.price), 0) || 0;
        },
        getCartFailure: state => {
            state.isFetching = false;
            state.error = true;
        },

        createProductStart: state => {
            state.isFetching = true;
            state.error = false;
        },
        createProductSuccess: (state, action) => {
            state.isFetching = false;
            state.error = false;
            state.quantity += 1;
            state.products.push(action.payload.products[0]);
            state.userId = action.payload.userId;
        },
        createProductFailure: state => {
            state.isFetching = false;
            state.error = true;
        },

        addProductStart: state => {
            state.isFetching = true;
            state.error = false;
        },
        addProductSuccess: (state, action) => {
            state.isFetching = false;
            state.error = false;
            state.quantity = action.payload.products.length;
            state.products = action.payload.products;
            
            //const isItemExist = state.products.findIndex(product => product.productId._id === action.payload.products.productId)
            // if(isItemExist !== -1 && state.products[isItemExist].color === action.payload.products.color && state.products[isItemExist].size === action.payload.products.size) {
            //     console.log(isItemExist);
            //     state.products[isItemExist].quantity += action.payload.products.quantity;
            //     // state.products.map(
            //     //     product => product.productId._id === isItemExist.productId._id ? action.payload.products : product
            //     // )
            // } else {
            //     console.log('test 2');
            //     state.quantity += 1;
            //     state.products.push(action.payload.products);
            // }
        },
        addProductFailure: state => {
            state.isFetching = false;
            state.error = true;
        },

        removeProductStart: state => {
            state.isFetching = true;
            state.error = false;
        },
        removeProductSuccess: (state, action) => {
            state.quantity -= 1;
            state.total -= action.payload.price;
            state.products.splice(
                state.products.findIndex(item => item._id === action.payload.productId),
                1
            );
        },
        removeProductFailure: state => {
            state.isFetching = false;
            state.error = true;
        },

        handleProductQuantity: (state, action) => {
            if(action.payload.param === 'dec') {
                if(state.products[state.products.findIndex(item => item._id === action.payload.id)].quantity > 1){
                    state.total -= action.payload.price;
                }
            }else {
                state.total += action.payload.price;
            }
            state.products[state.products.findIndex(item => item._id === action.payload.id)].quantity = action.payload.quantity;
        },

        logoutCart: (state) => {
            state.products = [];
            state.quantity = 0;
            state.total = 0;
            state.userId = '';
            state.cartId = '';
        }
        // increaseQuantity: (state, action) => {
        //     state.products[state.products.findIndex(product => product._id === action.payload._id)] = action.payload;
        //     state.total += action.payload.productId.price;
        // },

        // decreaseQuantity: (state, action) => {
        //     if(state.products[state.products.findIndex(product => product._id === action.payload._id)].quantity > 1) {
        //         state.total -= action.payload.productId.price;
        //     }
        //     state.products[state.products.findIndex(product => product._id === action.payload._id)] = action.payload;
        //     //state.total -= action.payload.productId.price;
        // }
    }
    //     addProduct: (state, action) => {
    //         state.quantity += 1;
    //         state.products.push(action.payload);
    //         state.total += action.payload.price * action.payload.quantity;
    //         state.userId = action.payload.userId
    //     },
    //     removeCart: (state, action) => {
    //         state.quantity -= 1
    //         state.products.splice(
    //             state.products.findIndex(item => item._id === action.payload.id),
    //             1
    //         );
    //         state.total -= action.payload.total
    //     },
    // }
});

export const {
    addProduct,
    removeCart,
    getCartStart,
    getCartSuccess,
    getCartFailure,
    createProductStart,
    createProductSuccess,
    createProductFailure,
    addProductStart,
    addProductSuccess,
    addProductFailure,
    removeProductStart,
    removeProductSuccess,
    removeProductFailure,
    handleProductQuantity,
    logoutCart
} = cartSlice.actions;
export default cartSlice.reducer;