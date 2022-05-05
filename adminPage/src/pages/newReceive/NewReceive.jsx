import { useState } from "react";
import "./newReceive.css";

import { createReceive } from '../../redux/apiCall';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from "react-router-dom";

export default function NewReceive() {
    const location = useLocation();
    const [inputs, setInputs] = useState({});
    const amount = 0;
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setInputs(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleCreate = (e) => {
        e.preventDefault();
        //console.log({...inputs, amount});
        createReceive({...inputs, amount}, dispatch);
    }

    return (
        <div className="newProduct">
            <h1 className="addProductTitle">Thêm mới đơn hàng</h1>
            <form className="addProductForm">
                <div className="addProductItem">
                    <label>Nhà cung cấp</label>
                    <input name="provider" type="text" placeholder="Apple Airpods" onChange={handleChange} />
                </div>
                <div className="addProductItem">
                    <label>Trạng thái</label>
                    <input name="status" type="text" placeholder="Apple Airpods" onChange={handleChange} />
                </div>
                <button className="addProductButton" onClick={handleCreate}>Xác nhận</button>
            </form>
        </div>
    );
}
