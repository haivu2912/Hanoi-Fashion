import { useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import "./receive.css"
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";
import app from '../../firebase';
import { addProduct, deleteProductInReceive } from '../../redux/apiCall';
import { useDispatch, useSelector } from 'react-redux';
import { Publish } from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";

export default function Receive() {
    const location = useLocation();
    const receiveId = location.pathname.split('/')[2];
    const receiveProduct = useSelector(state => state.receive.receives.find(receive => receive._id === receiveId));
    const dispatch = useDispatch();
    let stt = 0;
    const handleDelete = (id) => {
        const product = receiveProduct.products.find(product => product._id === id);
        const newAmount = receiveProduct.amount - (product.price * product.quantity);
        deleteProductInReceive(receiveId, receiveProduct, id, newAmount ,dispatch)
    };

    const columns = [
        {
            field: "stt",
            headerName: "STT",
            width: 100,
            renderCell: () => stt += 1
        },
        // { field: "_id", headerName: "Mã", width: 200 },
        {
            field: "name",
            headerName: "Tên",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="userListUser">
                        <img className="userListImg" src={params.row.img ? params.row.img : 'https://www.creativefabrica.com/wp-content/uploads/2018/11/Clean-clothes-icon-by-rudezstudio-580x386.jpg'} alt="" />
                        {params.row.name}
                    </div>
                );
            },
        },
        {
            field: "color",
            headerName: "Màu sắc",
            width: 200,
        },
        {
            field: "size",
            headerName: "Kích thước",
            width: 150,
        },
        {
            field: "price",
            headerName: "Giá",
            width: 150,
        },
        {
            field: "quantity",
            headerName: "Số lượng",
            width: 150,
        },
        {
            field: "inStore",
            headerName: "Nhập kho",
            width: 150,
        },
        {
            field: "action",
            headerName: "Hành động",
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={"/receiveProduct/" + receiveId  + "/" + params.row._id}>
                            <button className="userListEdit">Chi tiết</button>
                        </Link>
                        <DeleteOutline
                            className="userListDelete"
                            onClick={() => handleDelete(params.row._id)}
                        />
                    </>
                );
            },
        },
    ];

    const rows = receiveProduct.products.map(product => (
        {
            _id: product._id,
            name: product.name,
            img: product.img,
            color: product.color,
            size: product.size,
            price: product.price,
            quantity: product.quantity,
            inStore: product.inStore === true ? 'Đã nhập' : 'Chưa nhập'
        }
    ))
    return (
        <div className="userList">
            <Link to={"/" + receiveId +  "/newReceiveProduct"}>
                <button className="userAddButton">Thêm mới</button>
            </Link>
            <DataGrid
                rows={rows}
                disableSelectionOnClick
                columns={columns}
                getRowId={row => row._id}
                pageSize={8}
                checkboxSelection
            />
        </div>
    );
}
