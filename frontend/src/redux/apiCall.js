import { loginFailure, loginStart, loginSuccess, updateUserInfoFailure, updateUserInfoStart, updateUserInfoSuccess } from './userRedux';
import { registerStart, registerSuccess, registerFailure } from './newUserRedux';
import { publicRequest, userRequest } from '../requestMethod';
import {
    getCartFailure,
    getCartStart,
    getCartSuccess,
    createProductStart,
    createProductSuccess,
    createProductFailure,
    addProductStart,
    addProductSuccess,
    addProductFailure,
    removeProductStart,
    removeProductSuccess,
    removeProductFailure,
    handleProductQuantity
} from './cartRedux';

import { 
    addWishListFailure,
    addWishListStart,
    addWishListSuccess,
    createWishListFailure,
    createWishListStart,
    createWishListSuccess,
    getWishListFailure, 
    getWishListStart, 
    getWishListSuccess, 
    removeWishListFailure, 
    removeWishListStart,
    removeWishListSuccess
} 
from './wishListRedux';
import { getOrderFailure, getOrderStart, getOrderSuccess } from './orderRedux';

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post('/auth/login', user);
        dispatch(loginSuccess(res.data));
        console.log('login success');
    } catch (err) {
        dispatch(loginFailure());
        console.log('login fail');
    }
}

export const register = async (dispatch, newUser) => {
    dispatch(registerStart());
    try {
        const res = await publicRequest.post('/auth/register', newUser);
        dispatch(registerSuccess(res.data));
        console.log('register success');
    } catch (err) {
        dispatch(registerFailure());
        console.log('register fail');
    }
}

export const getUserCartProduct = async (dispatch, userId) => {
    dispatch(getCartStart());
    try {
        const res = await userRequest.get(`/cart/find/${userId}`);
        console.log(res.data);
        dispatch(getCartSuccess(res.data));
    } catch (err) {
        console.log(err);
        dispatch(getCartFailure());
    }
};

export const createUserCartProduct = async (cart, dispatch) => {
    dispatch(createProductStart());
    try {
        const res = await userRequest.post(`/cart/create`, cart);
        console.log(res.data);
        dispatch(createProductSuccess(res.data));
    } catch (err) {
        console.log(err);
        dispatch(createProductFailure());
    }
};

export const addUserCartProduct = async (cartId, item, cartInfo, dispatch) => {
    dispatch(addProductStart());
    try {
        const isItemExist = cartInfo.findIndex(product => product.productId._id === item.products.productId._id)
        if (isItemExist !== -1 && cartInfo[isItemExist].color === item.products.color && cartInfo[isItemExist].size === item.products.size) {
            console.log(1);
            item.products.quantity += cartInfo[isItemExist].quantity;
            const res = await userRequest.patch(`/cart/update/${cartId}`, {
                products: cartInfo.map(product => product.productId._id === item.products.productId._id ? item.products : product)
            });
            console.log(res.data);
            dispatch(addProductSuccess(res.data));
        } else {
            console.log(2);
            const res = await userRequest.patch(`/cart/update/${cartId}`, {
                products: [...cartInfo, item.products]
            });
            console.log(res.data);
            dispatch(addProductSuccess(res.data));
        }
    } catch (err) {
        console.log(err);
        dispatch(addProductFailure());
    }
}

export const removeUserCartProduct = async (product, cartId, price, cart, dispatch) => {
    //const itemWantRemove = cart.products.findIndex(item => item.productId._id === product.productId._id)
    dispatch(removeProductStart())
    try {
        const res = await userRequest.patch(`/cart/update/${cartId}`, {
            products: cart.products.filter(item => item._id !== product._id)
        });
        // console.log({
        //     ...res.data, 
        //     price,
        //     productId: product.productId._id
        // });
        dispatch(removeProductSuccess({
            ...res.data, 
            price,
            productId: product._id
        }))
    } catch (err) {
        console.log(err);
        dispatch(removeProductFailure());
    }
}

export const handleQuantityProduct = async (param, product, quantity, price, cartId, cart, dispatch) => {
    const productWithNewQuantity = {
        ...product,
        quantity
    }
    try {
        const res = await userRequest.patch(`/cart/update/${cartId}`, {
            products: cart.products.map(item => item._id === product._id ? productWithNewQuantity : item)
        })
        console.log(res.data);
        // console.log({
        //     ...res.data,
        //     price,
        //     param,
        //     productId: product.productId._id,
        //     quantity
        // });
        dispatch(handleProductQuantity({
            ...res.data,
            price,
            param,
            id: product._id,
            quantity
        }))
    }catch(err) {
        console.log(err);
    }
}

export const getUserWishList = async (dispatch, userId) => {
    dispatch(getWishListStart());
    try {
        const res = await userRequest.get(`/wishlist/find/${userId}`);
        console.log(res.data);
        dispatch(getWishListSuccess(res.data));
    } catch (err) {
        console.log(err);
        dispatch(getWishListFailure());
    }
};

export const createUserWishList = async (wishlist, dispatch) => {
    dispatch(createWishListStart());
    try {
        const res = await userRequest.post(`/wishlist/create`, wishlist);
        console.log({
            ...res.data,
            product: wishlist.products
    });
        dispatch(createWishListSuccess({
                ...res.data,
                product: wishlist.products
        }));
    } catch (err) {
        console.log(err);
        dispatch(createWishListFailure());
    }
};

export const addUserWishList = async (wishListId, item, wishListInfo, dispatch) => {
    dispatch(addWishListStart());
    try {
        const isItemExist = wishListInfo.findIndex(product => product.productId._id === item.products.productId._id)
        if (isItemExist !== -1) {
            alert('Mặt hàng này đã có trong danh sách ưa thích');
        } else {
            const res = await userRequest.patch(`/wishlist/update/${wishListId}`, {
                products: [...wishListInfo, item.products]
            });
            console.log({
                ...res.data,
                product: item.products
            });
            dispatch(addWishListSuccess({
                ...res.data,
                product: item.products
            }));
        }
    } catch (err) {
        console.log(err);
        dispatch(addWishListFailure());
    }
}

export const removeUserWishList = async (product, wishlistId, wishlist, dispatch) => {
    dispatch(removeWishListStart());
    try {
        const res = await userRequest.patch(`/wishlist/update/${wishlistId}`, {
            products: wishlist.products.filter(item => item.productId._id !== product._id)
        });
        console.log(res.data);
        dispatch(removeWishListSuccess({
            ...res.data, 
            productId: product._id
        }))
    } catch (err) {
        console.log(err);
        dispatch(removeWishListFailure());
    }
}

export const updateUserInfo = async (userId, userInfo, dispatch) => {
    dispatch(updateUserInfoStart());
    try {
        const res = await userRequest.patch(`user/update/${userId}`, userInfo);
        dispatch(updateUserInfoSuccess(res.data));
    }catch(err) {
        console.log(err);
        dispatch(updateUserInfoFailure());
    }
}

export const getUserOrder = async (dispatch, userId) => {
    dispatch(getOrderStart());
    try {
        const res = await userRequest.get(`/order/findUserOrder/${userId}`);
        console.log(res.data);
        dispatch(getOrderSuccess(res.data));
    } catch (err) {
        console.log(err);
        dispatch(getOrderFailure());
    }
};

export const updateUserOrderShipping = async (orderId, shippingStatus, dispatch) => {
    //dispatch(updateUserInfoStart());
    try {
        const res = await userRequest.patch(`order/update/${orderId}`, {
            shipping: shippingStatus
        });
        console.log(res.data);
        //dispatch(updateUserInfoSuccess(res.data));
    }catch(err) {
        console.log(err);
        //dispatch(updateUserInfoFailure());
    }
}

export const updateProductAfterOrder = async (cart) => {
    //dispatch(updateUserInfoStart());
    try {
        const res = await publicRequest.patch('/product/updateProduct', cart);
        console.log(res.data);
        //dispatch(updateUserInfoSuccess(res.data));
    }catch(err) {
        console.log(err);
        //dispatch(updateUserInfoFailure());
    }
}

export const updateUserCartProductAfterOrder = async (cartId, dispatch) => {
    try {
        const res = await userRequest.patch(`/cart/update/${cartId}`, {
            products: [],
        });
        console.log(res.data);
        dispatch(getCartSuccess(res.data));
    } catch (err) {
        console.log(err);
        //dispatch(removeProductFailure());
    }
}
