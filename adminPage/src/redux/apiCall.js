import { 
    deleteUserFailure,
    deleteUserStart,
    deleteUserSuccess,
    getUserStart, 
    getUserSuccess, 
    loginFailure, 
    loginStart, 
    loginSuccess, 
    updateUserFailure, 
    updateUserStart, 
    updateUserSuccess
} from "./userRedux";
import { publicRequest, userRequest } from "../requestMethod";
import { 
    getProductFailure,
    getProductStart, 
    getProductSuccess,
    deleteProductStart,
    deleteProductSuccess,
    deleteProductFailure,
    updateProductStart,
    updateProductSuccess,
    updateProductFailure,
    addProductStart,
    addProductSuccess,
    addProductFailure
} from "./productRedux";
import { addStaffFailure, addStaffStart, addStaffSuccess, deleteStaffFailure, deleteStaffStart, deleteStaffSuccess, getStaffFailure, getStaffStart, getStaffSuccess, updateStaffFailure, updateStaffStart, updateStaffSuccess } from "./staffRedux";
import { deleteProductInReceiveSuccess, deleteReceiveFailure, deleteReceiveStart, deleteReceiveSuccess, getReceiveFailure, getReceiveStart, getReceiveSuccess, updateReceiveFailure, updateReceiveStart, updateReceiveSuccess } from "./receiveRedux";
import { deleteOrderFailure, deleteOrderStart, deleteOrderSuccess, getOrderFailure, getOrderStart, getOrderSuccess } from "./orderRedux";
import { deleteReportFailure, deleteReportStart, deleteReportSuccess, getReportFailure, getReportStart, getReportSuccess } from "./reportRedux";
import { getStatFailure, getStatStart, getStatSuccess } from "./statisticalRedux";


export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post("/auth/login", user);
        dispatch(loginSuccess(res.data));
    } catch (err) {
        dispatch(loginFailure());
    }
};

export const getProducts = async (dispatch) => {
    dispatch(getProductStart());
    try {
        const res = await publicRequest.get("/product");
        dispatch(getProductSuccess(res.data));
    } catch (err) {
        dispatch(getProductFailure());
    }
};

export const deleteProduct = async (id, dispatch) => {
    dispatch(deleteProductStart());
    try {
        const res = await userRequest.delete(`/product/delete/${id}`);
        console.log(res.data);
        dispatch(deleteProductSuccess(id));
    } catch (err) {
        dispatch(deleteProductFailure());
    }
};

export const updateProduct = async (id, product, dispatch) => {
    console.log(id, product);
    dispatch(updateProductStart());
    try {
        const res = await userRequest.patch(`/product/update/${id}`, product);
        console.log(res.data);
        dispatch(updateProductSuccess(res.data));
    } catch (err) {
        dispatch(updateProductFailure());
    }
};

export const addProduct = async (product, dispatch) => {
    dispatch(addProductStart());
    try {
        const res = await userRequest.post(`/product/create`, product);
        dispatch(addProductSuccess(res.data));
    } catch (err) {
        dispatch(addProductFailure());
    }
};

export const getUsers = async (dispatch) => {
    dispatch(getUserStart());
    try {
        const res = await userRequest.get("/user/find");
        dispatch(getUserSuccess(res.data));
    } catch (err) {
        dispatch(getProductFailure());
    }
};

export const updateUser = async (id, user, dispatch) => {
    dispatch(updateUserStart());
    try {
        const res = await userRequest.patch(`/user/update/${id}`, user);
        console.log(res.data);
        dispatch(updateUserSuccess(res.data));
    } catch (err) {
        dispatch(updateUserFailure());
    }
};

export const deleteUser = async (id, dispatch) => {
    dispatch(deleteUserStart());
    try {
        //const res = await userRequest.delete(`/product/delete/${id}`);
        dispatch(deleteUserSuccess(id));
    } catch (err) {
        dispatch(deleteUserFailure());
    }
};

export const getStaff = async (dispatch) => {
    dispatch(getStaffStart());
    try {
        const res = await publicRequest.get("/staff/find");
        dispatch(getStaffSuccess(res.data));
    } catch (err) {
        dispatch(getStaffFailure());
    }
};

export const updateStaff = async (id, staff, dispatch) => {
    dispatch(updateStaffStart());
    try {
        const res = await userRequest.patch(`/staff/update/${id}`, staff);
        console.log(res.data);
        dispatch(updateStaffSuccess(res.data));
    } catch (err) {
        dispatch(updateStaffFailure());
    }
};

export const addStaff = async (staff, dispatch) => {
    dispatch(addStaffStart());
    try {
        const res = await userRequest.post(`/staff/create`, staff);
        dispatch(addStaffSuccess(res.data));
    } catch (err) {
        dispatch(addStaffFailure());
    }
};

export const deleteStaff = async (id, dispatch) => {
    dispatch(deleteStaffStart());
    try {
        const res = await userRequest.delete(`/staff/delete/${id}`);
        dispatch(deleteStaffSuccess(id));
    } catch (err) {
        dispatch(deleteStaffFailure());
    }
};

export const getReceives = async (dispatch) => {
    dispatch(getReceiveStart());
    try {
        const res = await userRequest.get("/receive/");
        console.log(res.data);
        dispatch(getReceiveSuccess(res.data));
    } catch (err) {
        dispatch(getReceiveFailure());
    }
};

export const updateProductOfReceive = async (receiveId, id, product, receiveProduct, dispatch) => {
    //dispatch(updateStaffStart());
    try {
        const res = await userRequest.patch(`/receive/update/${receiveId}`, {
            provider: product.provider,
            amount: product.amount,
            status: product.status,
            products: receiveProduct.map(item => item._id === id ? product.product : item)
        });
        console.log(res.data);
        //dispatch(updateStaffSuccess(res.data));
    } catch (err) {
        //dispatch(updateStaffFailure());
    }
};

export const updateStateOfProductInReceive = async (receiveId, id, inStore, receiveProduct, dispatch) => {
    //dispatch(updateStaffStart());
    try {
        const res = await userRequest.patch(`/receive/update/${receiveId}`, {
            products: receiveProduct.map(item => item._id === id ? {...item, inStore} : item)
        });
        console.log(res.data);
        //dispatch(updateStaffSuccess(res.data));
    } catch (err) {
        //dispatch(updateStaffFailure());
    }
};
export const deleteReceive = async (id, dispatch) => {
    dispatch(deleteReceiveStart());
    try {
        //const res = await userRequest.delete(`/receive/delete/${id}`);
        dispatch(deleteReceiveSuccess(id));
    } catch (err) {
        dispatch(deleteReceiveFailure());
    }
};

export const addProductOfReceive = async (receiveId, product, receiveProduct, newAmount, dispatch) => {
    //console.log(receiveProduct);
    //dispatch(updateReceiveStart());
    try {
        const res = await userRequest.patch(`/receive/update/${receiveId}`, {
            amount: newAmount,
            products: [...receiveProduct, product]
        });
        console.log(res.data);
        //dispatch(updateReceiveSuccess(res.data));
    } catch (err) {
        //dispatch(updateReceiveFailure());
        console.log(err);
    }
};

export const deleteProductInReceive = async (receiveId, receive, id, newAmount, dispatch) => {
    //console.log(receiveProduct);
    //dispatch(updateReceiveStart());
    try {
        const res = await userRequest.patch(`/receive/update/${receiveId}`, {
            amount: newAmount,
            products: receive.products.filter(item => item._id !== id)
        });
        dispatch(deleteProductInReceiveSuccess(res.data));
    } catch (err) {
        //dispatch(updateReceiveFailure());
        console.log(err);
    }
};

export const createReceive = async (receive, dispatch) => {
    //dispatch(addStaffStart());
    try {
        const res = await userRequest.post(`/receive/create`, receive);
        console.log(res.data);
        //dispatch(addStaffSuccess(res.data));
    } catch (err) {
        console.log(err);
        //dispatch(addStaffFailure());
    }
};

export const getOrders = async (dispatch) => {
    dispatch(getOrderStart());
    try {
        const res = await userRequest.get("/order");
        dispatch(getOrderSuccess(res.data));
    } catch (err) {
        console.log(err);
        dispatch(getOrderFailure());
    }
};

export const deleteOrder = async (id, dispatch) => {
    dispatch(deleteOrderStart());
    try {
        //const res = await userRequest.delete(`/order/delete/${id}`);
        dispatch(deleteOrderSuccess(id));
    } catch (err) {
        dispatch(deleteOrderFailure());
    }
};

export const getReports = async (dispatch) => {
    dispatch(getReportStart());
    try {
        const res = await userRequest.get("/report");
        dispatch(getReportSuccess(res.data));
    } catch (err) {
        dispatch(getReportFailure());
    }
};

export const deleteReport = async (id, dispatch) => {
    dispatch(deleteReportStart());
    try {
        //const res = await userRequest.delete(`/order/delete/${id}`);
        dispatch(deleteReportSuccess(id));
    } catch (err) {
        dispatch(deleteReportFailure());
    }
};

export const getStat = async (input, dispatch) => {
    dispatch(getStatStart());
    try {
        const res = await userRequest.get(`/order/monthStat/?month=${input}`);
        console.log(res.data);
        dispatch(getStatSuccess(res.data));
    } catch (err) {
        dispatch(getStatFailure());
    }
};